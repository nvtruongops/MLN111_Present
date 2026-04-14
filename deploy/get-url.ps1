# Lay URL Cloudflare Tunnel hien tai
param(
    [string]$SshHost = "100.87.5.20",
    [string]$SshUser = "main"
)

Write-Host "URL hien tai cua tunnel:" -ForegroundColor Cyan
ssh "${SshUser}@${SshHost}" "docker logs mln111-tunnel 2>&1 | findstr trycloudflare"
