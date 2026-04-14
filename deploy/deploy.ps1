# ============================================================
# deploy.ps1 - Deploy MLN111 len server qua SSH
# Chay tu may local (Windows PowerShell)
# ============================================================
# Cach dung:
#   .\deploy\deploy.ps1
#   .\deploy\deploy.ps1 -Domain "example.com" -ImageTag "v1.2"
# ============================================================

param(
    [string]$SshHost   = "100.87.5.20",
    [string]$SshUser   = "main",
    [string]$SshPass   = "wasd",
    [string]$Domain    = "",          # Bat buoc neu chua co .env.prod tren server
    [string]$ImageTag  = "latest",
    [string]$ImageName = "mln111-present"
)

$ErrorActionPreference = "Stop"

# --- Kiem tra cong cu ---
foreach ($tool in @("docker", "ssh", "scp")) {
    if (-not (Get-Command $tool -ErrorAction SilentlyContinue)) {
        Write-Error "Thieu cong cu: $tool. Vui long cai dat truoc."
        exit 1
    }
}

Write-Host "`n=== [1/5] Build Docker image ===" -ForegroundColor Cyan
$fullImage = "${ImageName}:${ImageTag}"
docker build -t $fullImage .
if ($LASTEXITCODE -ne 0) { Write-Error "Build that bai"; exit 1 }

Write-Host "`n=== [2/5] Save image thanh tar ===" -ForegroundColor Cyan
$tarFile = "$env:TEMP\mln111-image.tar"
docker save -o $tarFile $fullImage
Write-Host "Da luu image vao: $tarFile"

Write-Host "`n=== [3/5] Copy files len server ===" -ForegroundColor Cyan

# Tao .env.prod neu chua co
if (-not (Test-Path ".env.prod")) {
    if ($Domain -eq "") {
        $Domain = Read-Host "Nhap domain (vi du: example.com)"
    }
    @"
DOMAIN=$Domain
APP_IMAGE=$fullImage
"@ | Set-Content ".env.prod"
    Write-Host "Da tao .env.prod voi DOMAIN=$Domain"
}

# Dung sshpass neu co, neu khong thi nhac nhap pass thu cong
$sshTarget = "${SshUser}@${SshHost}"
$remoteDir = "C:\mln111"

# Tao thu muc tren server
ssh $sshTarget "if not exist $remoteDir mkdir $remoteDir && if not exist $remoteDir\deploy mkdir $remoteDir\deploy"

# Copy cac file can thiet
scp docker-compose.prod.yml "${sshTarget}:${remoteDir}\"
scp .env.prod               "${sshTarget}:${remoteDir}\"
scp deploy\Caddyfile        "${sshTarget}:${remoteDir}\deploy\"
scp $tarFile                "${sshTarget}:${remoteDir}\mln111-image.tar"

Write-Host "`n=== [4/5] Load image va khoi dong stack tren server ===" -ForegroundColor Cyan

$remoteScript = @"
cd /d $remoteDir
docker load -i mln111-image.tar
docker compose --env-file .env.prod -f docker-compose.prod.yml up -d --remove-orphans
"@

ssh $sshTarget $remoteScript

Write-Host "`n=== [5/5] Kiem tra trang thai ===" -ForegroundColor Cyan
ssh $sshTarget "cd /d $remoteDir && docker compose --env-file .env.prod -f docker-compose.prod.yml ps"

Write-Host "`n=== Deploy hoan thanh! ===" -ForegroundColor Green
Write-Host "Truy cap: https://$Domain" -ForegroundColor Yellow

# Don dep file tam
Remove-Item $tarFile -ErrorAction SilentlyContinue
