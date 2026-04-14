# ============================================================
# manage-logs.ps1 - Quan ly log challenge game
# Chay tu may chinh (Windows PowerShell)
# ============================================================
# Cach dung:
#   .\deploy\manage-logs.ps1
# ============================================================

param(
    [string]$TunnelUrl = ""
)

# --- Lay URL tunnel neu chua co ---
if ($TunnelUrl -eq "") {
    Write-Host "Nhap URL tunnel (vi du: https://xxxx.trycloudflare.com): " -NoNewline -ForegroundColor Cyan
    $TunnelUrl = Read-Host
}

$TunnelUrl = $TunnelUrl.TrimEnd("/")

# --- Menu ---
Write-Host ""
Write-Host "==============================" -ForegroundColor Cyan
Write-Host "  QUAN LY LOG CHALLENGE GAME  " -ForegroundColor Cyan
Write-Host "==============================" -ForegroundColor Cyan
Write-Host "  [1] Xem log"
Write-Host "  [2] Xoa tat ca log"
Write-Host "  [0] Thoat"
Write-Host ""
Write-Host "Chon: " -NoNewline
$choice = Read-Host

switch ($choice) {

    "1" {
        Write-Host "`nDang lay log tu $TunnelUrl ..." -ForegroundColor Yellow
        try {
            $response = Invoke-RestMethod -Uri "$TunnelUrl/api/challenge/logs" -Method GET
            $logs = $response.logs
            $total = $response.total

            Write-Host "`nTong so log: $total" -ForegroundColor Green
            if ($total -eq 0) {
                Write-Host "Chua co ai hoan thanh challenge." -ForegroundColor Gray
            } else {
                Write-Host ""
                Write-Host "STT  | Ten nguoi choi         | Thoi gian           | Mang con lai" -ForegroundColor White
                Write-Host "-----+----------------------+---------------------+-------------"
                $i = 1
                foreach ($log in $logs) {
                    $time = [datetime]::Parse($log.completedAt).ToString("dd/MM/yyyy HH:mm:ss")
                    Write-Host ("{0,-4} | {1,-20} | {2} | {3}" -f $i, $log.playerName, $time, $log.livesLeft)
                    $i++
                }
                if ($response.hasMore) {
                    Write-Host "`n... va $($total - 7) nguoi khac" -ForegroundColor Gray
                }
            }
        } catch {
            Write-Host "Loi: $_" -ForegroundColor Red
        }
    }

    "2" {
        Write-Host "`nBan co chac muon xoa TOAN BO log khong? (yes/no): " -NoNewline -ForegroundColor Red
        $confirm = Read-Host
        if ($confirm -eq "yes") {
            try {
                $response = Invoke-RestMethod -Uri "$TunnelUrl/api/challenge/logs/clear" -Method POST
                Write-Host "Da xoa toan bo log thanh cong!" -ForegroundColor Green
            } catch {
                Write-Host "Loi: $_" -ForegroundColor Red
            }
        } else {
            Write-Host "Huy bo." -ForegroundColor Gray
        }
    }

    "0" {
        Write-Host "Thoat." -ForegroundColor Gray
        exit
    }

    default {
        Write-Host "Lua chon khong hop le." -ForegroundColor Red
    }
}

Write-Host ""
