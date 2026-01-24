# AWS Cognito Integration with Spring Boot – Complete Beginner Guide

This repository is a **step-by-step learning project** that explains how a **Spring Boot microservice** communicates with **AWS Cognito** using the **AWS SDK v2**.

This README is intentionally **very detailed** so that:

* You/I can re-read it after months and still understand everything
* You/I can explain the full flow confidently to your TL or interviewer
* You/I learn *why* each layer, dependency, and file exists

> All sensitive information (AWS Account ID, Access Keys, Secret Keys, User Pool IDs) is **intentionally hidden**.

---

## What This Project Is About (In Simple Words)

Think of this project like this:

* You have a **backend application (Spring Boot)**
* You want this backend to **talk to AWS services securely**
* Specifically, you want to **create and manage AWS Cognito User Pools**
* You do **not** want to hardcode passwords or secrets
* You want clean, readable, professional backend code

This project solves exactly that.

---

##  What Is a Microservice? (Beginner Explanation)

A **microservice** is a small backend application that:

* Does **one main job**
* Exposes APIs (endpoints)
* Can run independently

In our case:

* This microservice’s job = **Manage AWS Cognito from backend APIs**

Why microservices?

* Easy to maintain
* Easy to test
* Easy to scale
* Each responsibility is clearly separated

---

##  High-Level Flow (Big Picture)

```
Postman (Client)
   ↓
Spring Boot Controller
   ↓
Service Interface
   ↓
Service Implementation
   ↓
AWS SDK (Cognito Client)
   ↓
AWS Cognito (Cloud Service)
```

Each arrow represents a **clear responsibility boundary**.

---

## Tech Stack (Why Each One Is Used)

### Java 21

* Modern Java features
* Long-term support (LTS)

### Spring Boot

* Removes boilerplate
* Auto-configures web server
* Industry standard for backend

### Spring Web

* Allows us to create REST APIs
* Provides `@RestController`, `@PostMapping`, etc.

### Spring Security

* Required foundation for secured APIs
* Future-ready for JWT / Cognito auth

### AWS SDK v2

* Official AWS library
* Secure communication with AWS services
* Uses IAM credentials automatically

### AWS Cognito

* Managed authentication service
* Handles users, login, tokens

### Maven

* Dependency management
* Build automation

### Postman

* API testing tool
* Used to trigger backend endpoints

---

## Project Structure 

```
src/main/java/com/resanth/aws/aws_springboot_project
│
├── config
│   ├── CognitoConfig.java
│   │   → Creates AWS Cognito client (SDK object)
│   │
│   └── SecurityConfig.java
│       → Basic Spring Security configuration
│
├── controller
│   └── CognitoController.java
│       → Entry point for HTTP requests
│
├── service
│   ├── CognitoService.java
│   │   → Business contract (what service can do)
│   │
│   └── impl
│       └── CognitoServiceImpl.java
│           → Actual business logic
│
└── AwsSpringbootProjectApplication.java
    → Application entry point
```

Each folder exists for a **reason**, not randomly.

---

## Controller Layer (What & Why)

### What is a Controller?

* It handles **HTTP requests**
* It should NOT contain business logic
* It should NOT contain AWS logic

### What it does here:

* Accepts request from Postman
* Extracts input (`poolName`)
* Passes it to the service layer
* Returns the response

This keeps controllers **thin and clean**.

---

## Service Interface 

### Why an interface?

* Defines **what the service does**, not how
* Allows future changes without breaking controller
* Industry best practice

Example idea:

> “Any class implementing this interface must know how to create a user pool.”

---

## Service Implementation 

This is where:

* Business logic lives
* AWS SDK is used
* Real work happens

Flow inside service:

1. Receive input from controller
2. Build AWS request object
3. Call AWS SDK
4. Process AWS response
5. Return meaningful output

---

## AWS SDK & Cognito 

### What is AWS SDK?

* A Java library provided by AWS
* Converts Java code → AWS API calls

### What is CognitoIdentityProviderClient?

* Java client for Cognito service
* Handles authentication, retries, signing requests

You **never manually call AWS REST APIs** — SDK handles everything.

---

## AWS Authentication 

This project uses **IAM-based authentication**.

What this means:

* No access keys in code
* No secrets in GitHub
* AWS SDK reads credentials from:

```
~/.aws/credentials
~/.aws/config
```

Configured using:

```bash
aws configure
```

This is the **correct and secure way**.

---

## API Endpoint Explanation:

### Endpoint Purpose

Create a **new AWS Cognito User Pool** from backend

### HTTP Details

* Method: `POST`
* URL:

```
http://localhost:8080/cognito/user-pool
```

### Input

* Query Parameter:

  * `poolName`

### Output

* Returns the created User Pool ID

---

## Postman Testing 

Step-by-step:

1. Open Postman
2. Create new request
3. Choose `POST`
4. Enter URL
5. Go to `Params`
6. Add key-value
7. Click Send

What happens internally:

* Postman → Controller → Service → AWS SDK → Cognito

---

## WHAT I BUILT CLEARLY STEP BY STEP:

### Step 1:
Opening Spring Official Website

First, I opened the browser and went to ```https://spring.io```
The reason I started here is because Spring.io is the official source for Spring Boot. My TL clearly told me not to depend on random blogs or YouTube videos. So whatever I build should be based on Spring’s own documentation.
At this stage, I was not writing any code. I was only trying to understand how Spring expects a backend project to be structured.

### Step 2:
Reading Spring “Building a RESTful Web Service” Guide

From Spring.io, I navigated to Learn → Guides and opened the guide called “Building a RESTful Web Service”.
From this guide, I understood a few important things:
- Spring Boot applications usually start with a REST controller
- APIs are created using annotations like ```@RestController, @GetMapping, @PostMapping```
- Spring Boot already handles server setup internally
This step helped me understand what to write first after creating the project.

### Step 3:
Creating Spring Boot Project using Spring Initializr

Next, I opened ```https://start.spring.io```
This site is used to generate a ready-made Spring Boot project.
Here I filled the details:
- Project: Maven (because it is standard in enterprise projects)
- Language: Java
- Java version: 21
- Group: com.resanth.aws
- Artifact: aws-springboot-project
- Packaging: Jar

Then I added dependencies:
- Spring Web → needed to create REST APIs
- Spring Security → needed for authentication-related features
- OAuth2 Resource Server → needed later for AWS Cognito JWT handling

After this, I clicked Generate, and a ZIP file was downloaded.

### Step 4:
Extracting ZIP and Opening in IntelliJ IDEA

I extracted the downloaded ZIP file to my local system.
Then I opened IntelliJ IDEA, clicked Open, and selected the extracted project folder.

IntelliJ automatically detected it as a Maven project and started downloading dependencies defined in ```pom.xml```.
I waited until indexing and dependency download was completed.

This step is important because without successful Maven dependency download, the project will not compile.

### Step 5:
Running the Default Spring Boot Application

Before adding any code, I ran the default Spring Boot application class that was generated.
What happened internally:
- Spring Boot started an embedded Tomcat server
- Application started on port 8080

Purpose of this step:
To confirm that the project setup is correct and there are no environment or configuration issues.

### Step 6:
Understanding Microservice Structure (Before Writing Code)

Before writing AWS or Cognito code, I paused and understood microservice architecture.
From Spring documentation, I learned:
- Controller layer handles HTTP requests
- Service layer contains business logic
- External systems (AWS, DB) are accessed from service layer
This helped me avoid writing everything in one class.

### Step 7:
Creating Controller Package and Controller Class

Inside ```src/main/java```, I created a controller package.

Why becoz:
- Spring documentation says controllers should be inside the base package so Spring can scan them.
- Inside the controller, I used ```@RestController```.
- This annotation tells Spring that this class will handle REST requests and return data directly.

At this stage, I only created basic structure. No AWS logic was written here.

### Step 8:
Creating Service Interface and Service Implementation

Next, I created a service package.
First, I created a service interface.
The reason for creating an interface is to define what operations the service provides, without worrying about how they are implemented.

Then I created a service implementation class.
This class contains the actual logic and will later talk to AWS.

Spring annotations were added so that Spring can inject this service into the controller

### Step 9:
STEP 9: Creating AWS Account

After the backend structure was ready, I moved to AWS.

I went to ```https://console.aws.amazon.com/console``` and created a new AWS console root account.
I completed:
- Email verification
- Phone verification
- Payment verification

AWS showed a message that some services may take up to 24 hours to activate.

### Step 10:
Waiting for AWS Services to Activate

After account verification, I noticed that IAM and Cognito were not immediately accessible.

This was not a code issue.
AWS needs time to activate services internally.

So I waited until AWS fully enabled IAM and Cognito access.

### Step 11:
Creating IAM User (Not Using Root Account)
Once AWS was active, I created an IAM user.

Why becoz:
AWS best practice says root account should never be used in applications.
I created an IAM user with:
- Programmatic access
- Cognito-related permissions
AWS generated:
- Access Key
- Secret Key

### Step 12:
Installing and Configuring AWS CLI
Next, I installed AWS CLI on my system.
Then I ran:
```aws configure```
I entered:
- Access key
- Secret key
- Region
- Output format (json)

AWS CLI stored these details securely in .aws folder.

### Step 13:
Verifying AWS Credentials
To confirm everything works, I ran:
```aws sts get-caller-identity```

AWS returned IAM user details.
This confirmed that:
- My system can authenticate with AWS
- Credentials are correctly configured

### Step 14:
Adding AWS SDK Dependencies to Spring Boot
Back in the Spring Boot project, I added AWS SDK dependencies for Cognito.
Initially, I faced errors due to missing or mismatched dependencies.
After understanding how Spring Boot parent POM manages versions, 
I fixed this by letting Spring handle versions automatically.

After this fix, the project built successfully.

### Step 15:
Creating AWS Cognito Client Configuration
I created a configuration class and defined a CognitoIdentityProviderClient as a Spring bean.

Why becoz:
External clients like AWS SDK clients should be managed by Spring for dependency injection.
Initially, I faced runtime errors because region was not set.
After explicitly setting the region, the issue was resolved.

### Step 16:
Writing Cognito Logic in Service Layer
Inside the service implementation, I wrote logic to create a Cognito User Pool using AWS SDK.
This logic was kept strictly inside the service layer, not in the controller.

### Step 17:
Running the Application After Full Integration
I ran the Spring Boot application again.

This time:
- Application started successfully
- AWS client was injected properly
- No runtime errors

### Step 18:
Testing API Using Postman
I opened Postman and created a POST request.
I entered:
- API URL
- Required parameters

When I clicked Send:
- Request went to controller
- Controller called service
- Service called AWS SDK
- AWS Cognito processed the request
- Response came back to Postman

### Step 19:
Verifying Result in AWS Console
Finally, I opened AWS Console and navigated to Cognito → User Pools.
I verified that the user pool was created successfully.

---

## Whole Task completed by:

**Resanth SR**
Backend | Cloud | AWS | Spring Boot

---

## Final Note

This README is intentionally verbose so it can act as my personl:

* Learning notes
* Revision material
* Project documentation
* Interview explanation base

## Project ScreenShot (Intellij)

  <img width="1920" height="1015" alt="image" src="https://github.com/user-attachments/assets/28f13617-c0b4-4525-a3f3-278d59adc886" />
