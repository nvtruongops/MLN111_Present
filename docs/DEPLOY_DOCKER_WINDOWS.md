# Deploy MLN111 - Windows Server + Cloudflare Tunnel

## Thong tin server
| | |
|---|---|
| IP SSH | `100.87.5.20` |
| User | `main` |
| Pass | `wasd` |
| Thu muc tren server | `C:\mln111` |

---

## Cach 1: Cloudflare Quick Tunnel (KHUYEN NGHI - mien phi, khong can domain)

**Luong hoat dong:**
```
Internet → https://xxxx.trycloudflare.com → cloudflared → app:3000
```
- Khong can domain
- Khong can mo port 80/443
- SSL tu dong
- URL dang: `https://random-words.trycloudflare.com`
- **Luu y:** URL thay doi moi lan restart tunnel

### Deploy lan dau:
```powershell
.\deploy\deploy-tunnel.ps1
```

### Xem URL hien tai:
```powershell
.\deploy\get-url.ps1
# hoac truc tiep tren server:
docker logs mln111-tunnel 2>&1 | findstr trycloudflare
```

### Cap nhat phien ban moi:
```powershell
.\deploy\update.ps1
```

---

## Cach 2: Co domain rieng (Caddy + SSL Let's Encrypt)

Dung khi ban co domain (vi du mua tren Namecheap, Cloudflare, etc.)

### Deploy:
```powershell
.\deploy\deploy.ps1 -Domain "your-domain.com"
```

Yeu cau:
- Mo firewall port 80 va 443 tren server
- Tro DNS A record ve IP public cua server

---

## Quan ly tren server (SSH vao roi chay)

```powershell
# SSH vao server
ssh main@100.87.5.20   # pass: wasd

# Xem trang thai container
cd C:\mln111
docker compose --env-file .env.tunnel -f docker-compose.tunnel.yml ps

# Xem log app
docker logs mln111-app --tail 50

# Xem log tunnel + lay URL
docker logs mln111-tunnel 2>&1 | findstr trycloudflare

# Restart
docker compose --env-file .env.tunnel -f docker-compose.tunnel.yml restart

# Dung
docker compose --env-file .env.tunnel -f docker-compose.tunnel.yml down
```

---

## Giu URL co dinh (nang cap len Named Tunnel)

Neu muon URL khong doi, can:
1. Tao tai khoan Cloudflare mien phi tai https://cloudflare.com
2. Them domain vao Cloudflare (co the dung subdomain mien phi cua Cloudflare Pages)
3. Tao Named Tunnel trong Cloudflare Zero Trust dashboard
4. Lay token va them vao `.env.tunnel`:
   ```
   CLOUDFLARE_TOKEN=eyJhIjoiXXXX...
   ```
5. Dung `docker-compose.named-tunnel.yml` (se tao them neu can)
