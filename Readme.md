# Grouping Application – Complete End-to-End Project Documentation (Beginner Friendly)

This repository documents the **complete development, integration, deployment, and troubleshooting journey** of the **Grouping Application**, built as part of my **Software Developer Internship**.

This README is written as a **long-term reference guide**:

* For my future self
* For teammates / juniors
* For technical leads & interview explanations
* For reusing the same architecture in future projects

Every decision, issue faced, and solution is explained in **simple words**, step by step.

---

## Project Summary (In Simple Words)

The Grouping Application is a **backend-driven system** with a modern frontend, secure authentication, and cloud deployment.

* Frontend: React + Vite
* Backend: Spring Boot (Java 21, Maven)
* Authentication: AWS Cognito
* Cloud: AWS EC2
* DevOps: Docker + Jenkins CI/CD

The goal of this project was **not just to build features**, but to understand:

* How frontend and backend communicate
* How AWS Cognito authentication works in real projects
* How IAM credentials are handled securely
* How applications are containerized and deployed
* How CI/CD pipelines automate deployment

---

## High-Level Architecture

```
Browser (React + Vite)
        ↓
Frontend APIs (Axios)
        ↓
Spring Boot REST APIs
        ↓
AWS Cognito (Authentication)
        ↓
Docker Containers on AWS EC2
        ↓
CI/CD Automation via Jenkins
```

Each layer has **one clear responsibility**.

---

## Tech Stack Used (With Reasons)

### Frontend

* **React** – Component-based UI
* **Vite** – Fast build & dev server
* **Axios** – API communication
* **CSS** – Custom styling

### Backend

* **Java 21** – Modern LTS Java
* **Spring Boot** – Rapid backend development
* **Spring Security** – Authentication foundation
* **Maven** – Dependency & build management

### Cloud & DevOps

* **AWS Cognito** – Managed authentication
* **AWS IAM** – Secure access control
* **AWS EC2** – Application hosting
* **Docker** – Containerization
* **Jenkins** – CI/CD automation

---

## Frontend Project Structure (React + Vite)

```
grouping-frontend/
│
├── public/
│
├── src/
│   ├── api/
│   │   └── authApi.js        # All authentication API calls
│   │
│   ├── assets/
│   │   └── react.svg
│   │
│   ├── components/
│   │   ├── PasswordMascot.jsx
│   │   ├── mascotStates.js
│   │   └── passwordMascot.css
│   │
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── ForgotPassword.jsx
│   │   ├── ResetPassword.jsx
│   │   ├── SetNewPassword.jsx
│   │   ├── Dashboard.jsx
│   │   └── *.css
│   │
│   ├── routes/
│   │   └── AppRoutes.jsx
│   │
│   ├── utils/
│   │
│   ├── App.jsx
│   ├── main.jsx
│   ├── index.css
│
├── index.html
├── Dockerfile
├── .env.example
├── package.json
├── package-lock.json
└── README.md
```

### Frontend Key Responsibilities

* UI rendering
* Form validation
* Calling backend APIs
* Handling auth flows (login, OTP, reset)

---

## Backend Project Structure (Spring Boot)

```
grouping-backend/
│
├── src/main/java/com/groups/aws/Grouping/
│   │
│   ├── config/
│   │   ├── CorsConfig.java         # CORS configuration
│   │   ├── SecurityConfig.java     # Spring Security rules
│   │   └── CognitoConfig.java      # AWS Cognito client bean
│   │
│   ├── controller/
│   │   └── AuthController.java     # REST API entry point
│   │
│   ├── service/
│   │   ├── AuthService.java        # Service interface
│   │   └── impl/
│   │       └── AuthServiceImpl.java # Business logic + AWS SDK
│   │
│   ├── dto/
│   │   ├── LoginRequest.java
│   │   ├── AuthResponse.java
│   │   ├── ForgotPasswordRequest.java
│   │   ├── ResetPasswordRequest.java
│   │   └── NewPasswordRequest.java
│   │
│   └── GroupingApplication.java
│
├── Dockerfile
├── pom.xml
└── README.md
```

### Backend Responsibilities

* Handle REST APIs
* Communicate with AWS Cognito
* Manage authentication flows
* Secure APIs

---

## AWS Cognito Integration Flow

1. Frontend sends login request
2. Backend receives credentials
3. Backend generates Secret Hash
4. AWS SDK calls Cognito
5. Cognito validates user
6. Tokens returned to backend
7. Backend sends response to frontend

This avoids exposing AWS secrets to the frontend.

---

## Dockerization

### Backend Dockerfile (Example)

```
FROM eclipse-temurin:21-jre
WORKDIR /app
COPY target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
```

### Why Docker?

* Same environment everywhere
* Easy deployment
* Easy rollback

---

## Jenkins CI/CD Pipeline Overview

Pipeline stages:

1. Checkout code
2. Verify Java & Maven
3. Build JAR
4. Build Docker image
5. Stop old container
6. Run new container

This ensures **zero manual deployment errors**.

---

## Common Issues Faced & Fixes

### 1. 401 / 403 Errors

* Cause: Missing AWS credentials
* Fix: Configure IAM credentials correctly

### 2. Cognito Login Fails

* Cause: User in FORCE_PASSWORD_CHANGE state
* Fix: Handle NEW_PASSWORD_REQUIRED flow

### 3. CORS Errors

* Cause: Frontend IP changed after EC2 restart
* Fix: Use allowedOriginPatterns("*") during dev

### 4. Jenkins Memory Issues

* Cause: t2.micro low memory
* Fix: Maven low-memory build flags

---

## Docker Commands Used

```
docker ps
docker images
docker rm -f container-name
docker build -t image-name .
docker run -d -p host:container image-name
```

---

## What I Learned From This Project

* Real-world AWS Cognito integration
* Secure IAM credential handling
* Spring Boot layered architecture
* Docker containerization
* Jenkins CI/CD automation
* Debugging production issues

---

## Project Status

✅ Frontend working
✅ Backend working
✅ Cognito authentication
✅ Dockerized
✅ Jenkins pipeline automated

---

## Author

**Resanth SR**
Software Developer Intern
Backend | Cloud | AWS | Spring Boot

---

> This documentation is intentionally detailed so it can be reused as a **template for future enterprise-grade projects**.
