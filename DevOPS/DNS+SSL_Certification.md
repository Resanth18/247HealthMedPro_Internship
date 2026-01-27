# DNS & SSL Configuration (DuckDNS + Let’s Encrypt)

This document explains **only the DNS and SSL setup** used in this project.
It is written to be clear, brief, and technically accurate.

---

## 1. Why DNS and SSL Were Required

In production deployments:

* Accessing applications via **raw IP addresses** is not scalable
* HTTPS is mandatory for browser security
* Modern browsers **block insecure HTTP traffic**

So the goals were:

* Map a **domain name → server public IP**
* Enable **HTTPS (SSL/TLS)** for secure communication

---

## 2. DNS Setup Using DuckDNS

### 2.1 What DuckDNS Is

DuckDNS is a **dynamic DNS provider** that allows mapping a domain name to a public IP address.

Example domain used:

```
247awsspringbootintership.duckdns.org
```

---

### 2.2 DNS Mapping Flow

```
Browser
  ↓
DNS Resolver (ISP)
  ↓
DuckDNS Name Server
  ↓
Returns EC2 Public IP
```

* DuckDNS stores an **A record**
* The A record points the domain to the EC2 public IP
* Any user accessing the domain is routed to the server

---

### 2.3 DNS Verification

DNS resolution can be verified using:

```bash
ping 247awsspringbootintership.duckdns.org
```

or

```bash
nslookup 247awsspringbootintership.duckdns.org
```

Successful resolution confirms DNS is working.

---

## 3. SSL / HTTPS Setup Using Let’s Encrypt

### 3.1 Why SSL Was Needed

Without SSL:

* Browser shows **Not Secure** warning
* HTTPS → HTTP requests are blocked (mixed content)

SSL ensures:

* Encrypted communication
* Browser trust
* Production readiness

---

## 4. Tools Used for SSL

| Component     | Purpose                             |
| ------------- | ----------------------------------- |
| Let’s Encrypt | Free, trusted Certificate Authority |
| Certbot       | CLI tool to request and manage SSL  |
| Nginx         | Web server + reverse proxy          |

---

## 5. Installing Required Tools (Terminal)

### 5.1 Install Nginx

```bash
sudo apt update
sudo apt install nginx -y
```

Start and enable Nginx:

```bash
sudo systemctl start nginx
sudo systemctl enable nginx
```

---

### 5.2 Install Certbot (Snap Method)

```bash
sudo snap install --classic certbot
sudo ln -s /snap/bin/certbot /usr/bin/certbot
```

This ensures the latest stable Certbot version is available system-wide.

---

## 6. Requesting SSL Certificate (Key Step)

The SSL certificate was issued using the following command:

```bash
sudo certbot --nginx \
  -d 247awsspringbootintership.duckdns.org \
  --agree-tos \
  --redirect \
  -m your_email@example.com
```

---

## 7. Explanation of the SSL Command

* `--nginx`
  Certbot automatically configures Nginx

* `-d <domain>`
  Domain name for which SSL is issued

* `--agree-tos`
  Accepts Let’s Encrypt Terms of Service

* `--redirect`
  Forces HTTP → HTTPS redirection

* `-m <email>`
  Email for expiry and security notifications

---

## 8. Domain Ownership Verification (ACME Challenge)

Let’s Encrypt verifies domain ownership using an **HTTP-01 challenge**:

1. Certbot creates a temporary challenge file
2. Let’s Encrypt requests:

   ```
   http://domain/.well-known/acme-challenge/
   ```
3. Nginx serves the challenge
4. Verification succeeds
5. SSL certificate is issued

---

## 9. SSL Certificate Storage Location

After successful issuance, certificates are stored at:

```
/etc/letsencrypt/live/247awsspringbootintership.duckdns.org/
```

Important files:

* `fullchain.pem` → SSL certificate
* `privkey.pem` → Private key

---

## 10. Enabling HTTPS in Nginx

Nginx uses the certificate files to enable HTTPS:

```nginx
ssl_certificate /etc/letsencrypt/live/247awsspringbootintership.duckdns.org/fullchain.pem;
ssl_certificate_key /etc/letsencrypt/live/247awsspringbootintership.duckdns.org/privkey.pem;
```

Nginx listens on:

* Port **80** → Redirects to HTTPS
* Port **443** → Serves secure traffic

---

## 11. Automatic SSL Renewal

Let’s Encrypt certificates are valid for **90 days**.

Certbot automatically installs a renewal timer.

Manual test command:

```bash
sudo certbot renew --dry-run
```

This confirms auto-renewal is working.

---

## 12. End-to-End DNS + SSL Flow (Summary)

```
User Browser
  ↓
DNS resolves domain → Server IP
  ↓
HTTPS request on port 443
  ↓
TLS handshake (SSL verification)
  ↓
Nginx terminates SSL
```

---

## 13. One-Line Interview Summary

> **The domain is mapped to the server IP using DuckDNS, SSL is issued via Let’s Encrypt using Certbot, HTTPS is enabled on Nginx, and all traffic is securely served over TLS.**

---

✅ This setup follows **production-grade DNS and SSL best practices**.
