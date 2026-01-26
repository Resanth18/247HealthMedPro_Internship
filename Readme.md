# Grouping Application (Login Flow) – End-to-End Full Stack & DevOps Project (Beginner to Production)

> **Developed by:** Resanth SR
> **Role:** Software Developer Intern, 247 HealthMedPro
> **Tech Focus:** Frontend, Backend, Cloud, DevOps, Authentication, CI/CD

---

## Project Overview (Recruiter-Friendly Summary)

This project demonstrates the **complete software development lifecycle** of a real-world, production-style application. I designed, developed, tested, deployed, and automated a **Grouping Application** using modern frontend and backend technologies, secure cloud-based authentication, containerization, and CI/CD automation.

The project showcases my **hands-on experience** in:

* Building scalable frontend applications
* Developing secure backend REST APIs
* Integrating AWS Cognito for authentication
* Managing AWS IAM and EC2 infrastructure
* Containerizing applications using Docker
* Automating builds and deployments using Jenkins
* Debugging real production issues (401, 403, CORS, AWS credentials)

This documentation is intentionally **very detailed**, so that any developer, reviewer, or recruiter can understand **what was built, why each technology was chosen, and how the system works end-to-end**.

---

## Why This Project Matters

Most student projects stop at "it works on my laptop". This project goes beyond that:

*  Runs in **production-like AWS EC2 environment**
*  Uses **industry-grade authentication (AWS Cognito)**
*  Follows **clean architecture (Controller → Service → Cloud SDK)**
*  Uses **Docker + Jenkins CI/CD**
*  Handles **real-world deployment issues**

This mirrors how **actual enterprise applications** are built and deployed.

---

## Complete Tech Stack & Why Each Was Used

###  Frontend

* **React.js** – Component-based UI development
* **Vite** – Fast development server and optimized build tool
* **HTML5 / CSS3** – Layout, styling, and responsiveness
* **Axios** – HTTP client to communicate with backend APIs

**Why React + Vite?**
Chosen for fast development, modular components, and modern frontend standards used in companies.

---

### Backend

* **Java 21** – Latest LTS Java with modern language features
* **Spring Boot** – Rapid backend development with minimal boilerplate
* **Spring Web** – REST API development
* **Spring Security** – Authentication & authorization foundation
* **Maven** – Dependency management and build automation

**Why Spring Boot?**
Spring Boot is the most widely used backend framework in enterprise Java environments.

---

### Authentication & Security

* **AWS Cognito** – Managed user authentication service
* **JWT Tokens** – Secure stateless authentication
* **AWS IAM** – Secure access control for backend → AWS communication

**Why Cognito?**
It offloads authentication complexity (passwords, OTPs, sessions) to AWS and is widely used in production systems.

---

### Cloud & Infrastructure

* **AWS EC2 (Ubuntu)** – Application hosting
* **AWS IAM Users & Policies** – Secure permission handling
* **AWS CLI** – Credential configuration and validation

---

### DevOps & Automation

* **Docker** – Containerization of frontend & backend
* **Dockerfile** – Reproducible application builds
* **Jenkins** – CI/CD automation
* **Jenkins Pipeline (Groovy)** – Automated build, test, deploy flow

---

### Testing & Debugging

* **Postman** – API testing and validation
* **Browser DevTools** – CORS & frontend debugging
* **Docker logs / ps** – Runtime container inspection

---

## Project Directory Structure

### Frontend (React + Vite)

```
grouping-frontend/
├── public/
├── src/
│   ├── api/
│   │   └── authApi.js        # All authentication API calls
│   ├── assets/               # Images & static files
│   ├── components/           # Reusable UI components
│   ├── pages/                # Login, Forgot Password, Dashboard
│   ├── routes/               # Application routing
│   ├── utils/                # Helper functions
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── Dockerfile
├── package.json
└── package-lock.json
```

---

### Backend (Spring Boot)

```
grouping-backend/
├── Grouping/
│   ├── src/main/java/
│   │   └── com/groups/aws/Grouping/
│   │       ├── config/        # Security & CORS config
│   │       ├── controller/    # REST controllers
│   │       ├── service/       # Service interfaces
│   │       ├── service/impl/  # Business logic
│   │       ├── dto/           # Request & response DTOs
│   │       └── util/          # Helper utilities
│   ├── src/main/resources/
│   │   └── application.yml
│   ├── Dockerfile
│   └── mvnw
```

---

## End-to-End Authentication Flow

1. User enters email & password on **React UI**
2. React sends request using **Axios**
3. Spring Boot controller receives `/auth/login`
4. Service layer calls **AWS Cognito via AWS SDK**
5. Cognito validates credentials
6. Backend returns JWT tokens
7. Frontend stores token and manages session

---

## Dockerization (What & Why)

### Backend Dockerfile (Example)

```dockerfile
FROM eclipse-temurin:21-jre
WORKDIR /app
COPY target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
```

**Why Docker?**

* Same behavior across all machines
* Easy deployment
* Scalable & portable

---

## Jenkins CI/CD Pipeline Explanation

### What the Pipeline Does

1. Pulls code from GitHub
2. Builds backend using Maven
3. Builds Docker image
4. Stops old container
5. Deploys new container automatically

### Key Jenkins Concepts Used

* Declarative Pipeline
* Environment variables
* Docker commands inside pipeline
* Failure handling & logs

---

## Real Issues Faced & How I Solved Them

### 401 Unauthorized (Login Failing)

* Cause: AWS credentials not available in runtime
* Fix: Proper IAM user + AWS credentials configuration

### 403 Forbidden (CORS Errors)

* Cause: Frontend origin not allowed
* Fix: Correct Spring CORS configuration

### Jenkins Build Failing

* Cause: `mvnw` permission denied
* Fix: Added `chmod +x mvnw` in pipeline

These issues reflect **real-world production debugging**, not tutorial-level problems.

---

## Skills Demonstrated

* Full stack development understanding
* Cloud authentication & IAM
* Docker & containerization
* CI/CD pipeline automation
* Debugging live systems
* Writing clean, maintainable code
* Documentation & communication

---

## Summary

This project represents **practical, hands-on work**, not just academic learning. Every tool, configuration, and fix documented here was implemented and tested in a real deployment environment.

It demonstrates my ability to **learn quickly, debug systematically, and build production-ready systems**, even as a Software Developer Intern.

---

**– Resanth SR**
*Software Developer Intern | 247HealthMedPro*
