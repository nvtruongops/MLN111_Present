# ============================================================
# update.ps1 - Cap nhat phien ban moi (khong can copy lai Caddyfile)
# Nhanh hon deploy.ps1, chi build + push image moi len server
# ============================================================

param(
    [string]$SshHost   = "100.87.5.20",
    [string]$SshUser   = "main",
    [string]$ImageTag  = "latest",
    [string]$ImageName = "mln111-present"
)

$ErrorActionPreference = "Stop"

Write-Host "`n=== [1/3] Build image moi ===" -ForegroundColor Cyan
$fullImage = "${ImageName}:${ImageTag}"
docker build -t $fullImage .
if ($LASTEXITCODE -ne 0) { Write-Error "Build that bai"; exit 1 }

Write-Host "`n=== [2/3] Copy image len server ===" -ForegroundColor Cyan
$tarFile = "$env:TEMP\mln111-image.tar"
docker save -o $tarFile $fullImage

$sshTarget = "${SshUser}@${SshHost}"
$remoteDir = "C:\mln111"
scp $tarFile "${sshTarget}:${remoteDir}\mln111-image.tar"

Write-Host "`n=== [3/3] Reload container ===" -ForegroundColor Cyan
ssh $sshTarget @"
cd /d $remoteDir
docker load -i mln111-image.tar
docker compose --env-file .env.prod -f docker-compose.prod.yml up -d --remove-orphans
docker compose --env-file .env.prod -f docker-compose.prod.yml ps
"@

Write-Host "`n=== Update hoan thanh! ===" -ForegroundColor Green
Remove-Item $tarFile -ErrorAction SilentlyContinue
