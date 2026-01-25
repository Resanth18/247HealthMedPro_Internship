# Grouping Project – Complete Beginner-Friendly Documentation

Each section is written **step-by-step**,and explains **what i did, why we did it, problems faced, and fixes**.

---

# FRONTEND (grouping-frontend)

## What is this?

This is the **frontend UI** of the Grouping project. Users interact with this UI to login, reset password, and access application pages.

The frontend is built using **React (Vite)** and served in production using **Nginx inside Docker**.

---

## Technologies Used

* React + Vite
* Node.js & npm
* Axios (API calls)
* Docker
* Nginx
* Jenkins (CI/CD)

---

## Ports Used

| Service  | Port |
| -------- | ---- |
| Frontend | 5173 |
| Backend  | 8081 |

---

## Folder Structure

```
frontend/
├── src/
│   ├── api/        # API calls (authApi.js)
│   ├── pages/
│   ├── components/
│   └── main.jsx
├── public/
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
├── Dockerfile
├── .env.example
└── README.md
```

---

##  Environment Variables

### `.env.example`

```env
VITE_API_URL=http://<BACKEND_IP>:8081
VITE_APP_NAME=GroupingFrontend
VITE_ENV=production
```

 **Important**:

* `.env.example` is committed to GitHub
* `.env` is created **only during Jenkins build**
* Never commit real secrets

---

## Frontend → Backend Connection

All API calls use:

```js
import.meta.env.VITE_API_URL
```

Example:

```js
axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, payload)
```

If backend IP changes → only `.env` needs update.

---

## Dockerfile (Frontend)

```dockerfile
FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*
COPY dist/ /usr/share/nginx/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Why Nginx?

* Fast
* Lightweight
* Best for static frontend apps

---

## Jenkins Frontend Flow

1. Pull code from GitHub
2. Create `.env`
3. `npm ci`
4. `npm run build`
5. Build Docker image
6. Run container on port 5173

---

## Issues Faced (Frontend)

### Jenkins disconnect / timeout

Cause: **t2.micro low memory**

Fix:

* Added swap memory
* Used `npm ci --no-audit --no-fund`

---

### npm ENOTEMPTY / permission issues

Fix:

```bash
sudo chown -R jenkins:jenkins /var/lib/jenkins
```

---

## Final Check

```bash
docker ps
```

Frontend must show:

```
grouping-frontend → 5173
```

---

# BACKEND(grouping-backend)

## What is this?

This is the **Spring Boot backend** that handles:

* Authentication (AWS Cognito)
* APIs
* Security & CORS

---

## Technologies Used

* Java 21
* Spring Boot
* Spring Security
* AWS Cognito
* Docker
* Jenkins

---

## Backend Structure

```
Grouping/
├── src/main/java/com/groups/aws/Grouping/
│   ├── controller/
│   ├── service/
│   ├── config/
│   └── util/
├── Dockerfile
├── pom.xml
├── mvnw
└── README.md
```

---

## Authentication (AWS Cognito)

Supported flows:

* Login
* New password required
* Forgot password
* Reset password
* Logout
* Token revoke

---

## SecurityConfig Explained

Key points:

* CSRF disabled (API use)
* CORS enabled
* `/auth/**` allowed
* OPTIONS allowed

```java
.requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
.requestMatchers("/auth/**").permitAll()
.anyRequest().authenticated();
```

---

## CORS Configuration

```java
config.setAllowedOriginPatterns(List.of("*"));
config.setAllowedHeaders(List.of("*"));
```

Why?

* Frontend IP changes often (EC2 restart)
* Safe for APIs (no cookies used)

---

## Backend Dockerfile

```dockerfile
FROM eclipse-temurin:21-jre
COPY target/*.jar app.jar
ENTRYPOINT ["java","-jar","/app.jar"]
```

---

## Backend Jenkins Flow

1. Checkout repo
2. `chmod +x mvnw`
3. Build jar (skip tests)
4. Build Docker image
5. Run container on 8081

---

## Issues Faced (Backend)

### 401 / 403 on login

Cause: AWS credentials missing

Fix:

* Added AWS credentials in Jenkins pipeline

---

### Maven permission denied

Fix:

```bash
chmod +x mvnw
```

---

## Backend Check

```bash
curl http://localhost:8081/actuator/health
```

---

# JENKINS + DOCKER README

## Purpose

Automate frontend & backend deployment using Jenkins + Docker on **AWS EC2 t2.micro**.

---

## Infrastructure

* EC2 t2.micro (Free Tier)
* Ubuntu
* Jenkins
* Docker
* Swap memory

---

## Why Jenkins?

* No manual deployment
* Repeatable builds
* Easy rollback

---

## Jenkins Workspace

```bash
/var/lib/jenkins/workspace/
```

---

## Jenkins Credentials Used

| Credential     | Purpose     |
| -------------- | ----------- |
| GitHub Token   | Repo access |
| AWS Access Key | Cognito     |
| AWS Secret Key | Cognito     |

---

## AWS Credentials in Pipeline

```groovy
environment {
  AWS_ACCESS_KEY_ID = credentials('aws-access-key')
  AWS_SECRET_ACCESS_KEY = credentials('aws-secret-key')
  AWS_REGION = 'ap-south-1'
}
```

---

##  Memory Fix (CRITICAL)

### Swap Setup

```bash
sudo dd if=/dev/zero of=/swapfile bs=1M count=2048
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
```

---

## Docker Commands Used

```bash
docker build -t backend:staging .
docker run -d -p 8081:8080 backend:staging
```

```bash
docker build -t grouping-frontend:staging .
docker run -d -p 5173:80 grouping-frontend:staging
```

---

## Common Jenkins Issues

### Jenkins disconnects

Cause: Out of memory

Fix:

* Swap
* Low-memory flags

---

## Final Verification

```bash
docker ps
```

Expected:

```
backend → 8081
frontend → 5173
```

---

## Final Learnings

* CI/CD is mandatory
* Never deploy manually
* Docker + Jenkins works even on free tier
* Debugging skills matter more than tools

---

This documentation can be reused for **any future full‑stack project**.
