# ============================================================
# deploy-tunnel.ps1
# Deploy MLN111 len server Windows qua SSH
# Dung Cloudflare Quick Tunnel - mien phi, khong can domain
# URL se la: https://xxxx-xxxx.trycloudflare.com
# ============================================================
# Cach dung:
#   .\deploy\deploy-tunnel.ps1
# ============================================================

param(
    [string]$SshHost   = "100.87.5.20",
    [string]$SshUser   = "main",
    [string]$ImageTag  = "latest",
    [string]$ImageName = "mln111-present"
)

$ErrorActionPreference = "Stop"
$sshTarget = "${SshUser}@${SshHost}"
$remoteDir = "C:/mln111"
$fullImage  = "${ImageName}:${ImageTag}"
$tarFile    = "$env:TEMP\mln111-image.tar"

# --- Kiem tra cong cu ---
foreach ($tool in @("docker", "ssh", "scp")) {
    if (-not (Get-Command $tool -ErrorAction SilentlyContinue)) {
        Write-Error "Thieu cong cu: $tool"
        exit 1
    }
}

# -------------------------------------------------------
Write-Host "`n=== [1/4] Build Docker image ===" -ForegroundColor Cyan
docker build -t $fullImage .
if ($LASTEXITCODE -ne 0) { Write-Error "Build that bai"; exit 1 }

# -------------------------------------------------------
Write-Host "`n=== [2/4] Save image -> tar ===" -ForegroundColor Cyan
docker save -o $tarFile $fullImage
Write-Host "Saved: $tarFile"

# -------------------------------------------------------
Write-Host "`n=== [3/4] Copy files len server ===" -ForegroundColor Cyan

# Tao thu muc tren server
ssh $sshTarget "cmd /c if not exist C:\mln111 mkdir C:\mln111"

# Tao .env cho tunnel (chi can APP_IMAGE)
$envContent = "APP_IMAGE=$fullImage"
$envContent | Out-File -FilePath ".env.tunnel" -Encoding ascii

scp docker-compose.tunnel.yml  "${sshTarget}:C:/mln111/docker-compose.tunnel.yml"
scp .env.tunnel                "${sshTarget}:C:/mln111/.env.tunnel"
scp $tarFile                   "${sshTarget}:C:/mln111/mln111-image.tar"

Remove-Item ".env.tunnel" -ErrorAction SilentlyContinue

# -------------------------------------------------------
Write-Host "`n=== [4/4] Khoi dong tren server ===" -ForegroundColor Cyan

ssh $sshTarget @"
cd /d C:\mln111
docker load -i mln111-image.tar
docker compose --env-file .env.tunnel -f docker-compose.tunnel.yml up -d --remove-orphans
"@

# -------------------------------------------------------
Write-Host "`n=== Deploy xong! Lay URL tunnel ===" -ForegroundColor Green
Write-Host "Doi vai giay de tunnel khoi dong..." -ForegroundColor Yellow
Start-Sleep -Seconds 5

Write-Host "`nLog cua cloudflared tunnel (tim dong 'trycloudflare.com'):" -ForegroundColor Cyan
ssh $sshTarget "docker logs mln111-tunnel 2>&1 | findstr trycloudflare"

Write-Host "`nNeu chua thay URL, chay lenh nay tren server:" -ForegroundColor Yellow
Write-Host "  docker logs mln111-tunnel 2>&1 | findstr trycloudflare" -ForegroundColor White

# Don dep
Remove-Item $tarFile -ErrorAction SilentlyContinue
