# AWS Cognito Authentication with Spring Boot (Login, Forgot Password, Reset, Logout, Revoke)

> **Intern Project – Fully Working Cognito Authentication Flow**
> Built using **Spring Boot + AWS Cognito** with secret-hash based authentication.
> read README documents **each and every step** we implemented, why we did it, what happens in the background, and here we see how the complete login lifecycle works.

---

## Project Objective

The goal of this project is to implement **Login flow authentication** using **AWS Cognito** with Spring Boot, covering the **entire real-world auth lifecycle**:

* User Login (with Client Secret / Secret Hash)
* Force Change Password flow
* Forgot Password (OTP via Email)
* Reset Password using OTP
* Logout (Global Sign-out)
* Revoke Refresh Token (Session hard-kill)

This project is built and tested using **Postman**, and all flows are verified against **AWS Cognito behavior**.

---

## Tech Stack

* Java 21
* Spring Boot 4.x
* AWS SDK v2 (Cognito Identity Provider)
* AWS Cognito (User Pool)
* Postman (API testing)

---

## Project Structure

```
Grouping/
 ├── controller/
 │    └── AuthController.java
 │
 ├── service/
 │    ├── AuthService.java
 │    └── AuthServiceImpl.java
 │
 ├── dto/
 │    ├── LoginRequest.java
 │    ├── ForgotPasswordRequest.java
 │    ├── ResetPasswordRequest.java
 │    ├── RevokeRequest.java
 │    └── AuthResponse.java
 │
 ├── config/
 │    └── CognitoConfig.java
 │
 ├── util/
 │    └── SecretHashUtil.java
 │
 ├── GroupingApplication.java
 └── application.properties
```

---

## application.properties

```properties
server.port=8080

aws.cognito.region=ap-south-1
aws.cognito.userPoolId=ap-south-1_XXXXXXX
aws.cognito.clientId=XXXXXXXXXXXX
aws.cognito.clientSecret=XXXXXXXXXXXX
```

>  Client Secret is mandatory because this project uses **SECRET_HASH based authentication**.

---

## Authentication Flow – End to End

Below is the **exact real-world flow** implemented in this project.

---

## 1 LOGIN FLOW

### API

```
POST /auth/login
```

### Request

```json
{
  "username": "tester@gmail.com",
  "password": "Temp@123"
}
```

### What happens in backend

1. Spring Boot receives username & password
2. `SECRET_HASH` is generated using:

   * username
   * clientId
   * clientSecret
3. Backend calls Cognito `InitiateAuth`
4. Cognito validates credentials

---

### Case 1: User is forced to change password

**Response**:

```json
{
  "message": "NEW_PASSWORD_REQUIRED",
  "session": "<session_token>"
}
```

-> Cognito blocks login until password is reset.

---

## 2️ FORCE CHANGE PASSWORD FLOW

### API

```
POST /auth/confirm-password
```

### Request

```json
{
  "username": "tester@@gmail.com",
  "newPassword": "NewStrong@123",
  "session": "<session_token>"
}
```

### Background Process

* Cognito validates session token
* New password is stored
* User status changes to CONFIRMED
* Tokens are issued

---

## 3️ LOGIN SUCCESS RESPONSE

```json
{
  "accessToken": "...",
  "idToken": "...",
  "refreshToken": "...",
  "message": "LOGIN_SUCCESS"
}
```

### Token Purpose

| Token         | Purpose                    |
| ------------- | -------------------------- |
| Access Token  | API authorization          |
| ID Token      | User identity info         |
| Refresh Token | Generate new access tokens |

---

## 4️ FORGOT PASSWORD FLOW

### API

```
POST /auth/forgot-password
```

### Request

```json
{
  "username": "tester@gmail.com"
}
```

### Background Process

1. Cognito validates user
2. OTP is generated
3. OTP is sent to registered email

> No password change happens here. This step **only sends OTP**.

---

## 5️ RESET PASSWORD USING OTP

### API

```
POST /auth/reset-password
```

### Request

```json
{
  "username": "tester@gmail.com",
  "code": "123456",
  "newPassword": "Reset@123"
}
```

### Background Process

* OTP is validated
* Password is updated
* User can login again

---

## 6️ LOGOUT FLOW (GLOBAL SIGN OUT)

### API

```
POST /auth/logout
```

### Header

```
Authorization: Bearer <access_token>
```

### Background Process

* Cognito invalidates current session
* Access token becomes unusable

> Logout affects **current session only**.

---

## 7️ REVOKE TOKEN FLOW 

### Why revoke is needed

Refresh tokens are long-lived. If compromised, attacker can keep generating access tokens.

**Revoke permanently kills the refresh token.**

---

### API

```
POST /auth/revoke
```

### Request

```json
{
  "refreshToken": "<refresh_token>"
}
```

### Background Process

* Cognito validates client credentials
* Refresh token is marked as REVOKED
* Token can never be reused

---

## 8️ REVOKE VERIFICATION 

Since no refresh endpoint exists in backend, verification is done using AWS CLI.

```bash
aws cognito-idp initiate-auth \
 --auth-flow REFRESH_TOKEN_AUTH \
 --client-id <CLIENT_ID> \
 --auth-parameters REFRESH_TOKEN=<REVOKED_REFRESH_TOKEN>
```

### Expected Response

```
NotAuthorizedException: Token has been revoked
```

This confirms revoke worked successfully.

---

## LOGOUT vs REVOKE (Clear Difference)

| Logout                   | Revoke                                |
| ------------------------ | ------------------------------------- |
| Ends current session     | Permanently kills refresh token       |
| Access token invalidated | Access token still valid until expiry |
| User may auto-login      | User must login again                 |

---

## Notes

* All flows tested via Postman
* Secret hash is mandatory for security
* AWS Cognito behavior is followed strictly
* This implementation matches real enterprise auth systems

---

## Project Status

✔ Login
✔ Force password change
✔ Forgot password
✔ Reset password
✔ Logout
✔ Revoke token
✔ Verified via AWS CLI

---

## STEP BY STEP How I Done this

### Step 1:
Understanding the Requirement Before Writing Code

Before starting anything, I clearly understood what was expected from this project.
The requirement was not just to “make login work”, but to implement a complete authentication lifecycle similar to what real production systems use.

The scope included:
- Secure login using AWS Cognito
- Handling force password change
- Forgot password via OTP
- Resetting password
- Logout

Revoke refresh tokens for security
At this stage, I did not write any code. I focused only on understanding how AWS Cognito works internally and what flows are officially supported.

### Step 2:
Choosing AWS Cognito as the Authentication Provider
I chose AWS Cognito because:
- It is a managed authentication service used in real enterprise systems
- It handles password security, OTP, token lifecycle internally
- It integrates well with Spring Boot using AWS SDK

I created a User Pool in Cognito and configured:
- Email as the username
- Email-based OTP for forgot password
- App Client with Client Secret enabled
- The client secret was required because the project uses SECRET_HASH based authentication, which adds an extra layer of security.
Sensitive details like Client ID, Client Secret, and Pool ID are always stored only in application.properties and never exposed in code or documentation.

### Step 3:
Creating the Spring Boot Project
I created a Spring Boot project using Spring Initializr with:
- Maven
- Java
- Spring Web
- Spring Security
- OAuth2 Resource Server

At this point, the application was just a basic Spring Boot skeleton.
I verified that the application starts successfully on port 8080 before integrating Cognito

### Step 4:
Setting Up Cognito Configuration in Backend
Next, I added a Cognito configuration class where:
- AWS region is configured
- Cognito Identity Provider client is created
- Credentials are resolved using AWS default provider chain
This setup allows the backend to communicate securely with AWS Cognito APIs without hardcoding credentials.

### Step 5:
Implementing Login with Secret Hash
The first actual feature implemented was Login.
When a user sends username and password:
Backend generates a SECRET_HASH using:

-username
-clientId
-clientSecret

Backend calls Cognito InitiateAuth
Cognito validates credentials
If credentials are valid, Cognito responds in two possible ways.

### Step 6:
Handling NEW_PASSWORD_REQUIRED State
If the user was created by admin or has not set a permanent password, Cognito returns:
```NEW_PASSWORD_REQUIRED```

A session token
At this stage:
-Login is not completed
-Tokens are not issued
-User must set a new password

This state is handled explicitly in backend logic.

### Step 7:
Confirming New Password

-Using the session token received earlier:
-Backend calls RespondToAuthChallenge
-New password is submitted
-Cognito validates and updates the password
-User status becomes ```CONFIRMED```
-Cognito issues access, id, and refresh tokens
This completes the first successful login for that user.

### Step 8:
Successful Login and Token Handling
After successful authentication, the backend returns:
- Access Token (used for API authorization)
- ID Token (contains user identity info)
- Refresh Token (used to generate new access tokens)
At this stage, the user is fully authenticated.

### Step 9:
Implementing Forgot Password Flow
When a user forgets the password:
- User submits username (email)
- Backend calls Cognito ForgotPassword
- Cognito generates an OTP
- OTP is sent to the registered email

note:
- Password is not changed yet
This step only initiates the reset process

### Step 10:
Resetting Password Using OTP
After receiving OTP via email:

- User submits username, OTP, and new password
- Backend calls ConfirmForgotPassword
- Cognito validates OTP
- Password is updated successfully

After this, the user can login again normally.

### Step 11:
Implementing Logout (Global Sign Out)

Logout was implemented using access token.
When logout API is called:
- Backend calls Cognito GlobalSignOut
- Cognito invalidates the current session
- Access token becomes unusable
- Logout affects only the current session.

### Step 12:
Understanding the Need for Revoke

Logout alone is not enough in some security scenarios.
Refresh tokens are long-lived.
If a refresh token is compromised, an attacker can keep generating new access tokens.
To prevent this, Revoke Token functionality was added.

### Step 13:
Implementing Revoke Refresh Token
When revoke API is called:

- Backend sends refresh token to Cognito
- Cognito validates client credentials
- Refresh token is permanently marked as revoked

Once revoked:
- Refresh token can never be reused
- User must login again after access token expiry

### Step 14:
Verifying Revoke (Background Proof)

Since there is no refresh endpoint in backend, revoke verification is done using AWS CLI.
When trying to refresh using a revoked token:
- Cognito throws ```NotAuthorizedException: Token has been revoked```
This confirms revoke is working correctly.

### Step 15:
Logout vs Revoke (For Understandin purpose)

Logout:
- Ends current session
- Access token invalidated
- Refresh token may still exist

Revoke:
- Permanently disables refresh token
- Prevents future access token generation
- Forces full re-login

Both serve different security purposes.

***I've achieved both log-out and revoke completely and verified in this project***
***I've also attached the ```pom.xml``` for this specific project as **AUTH_pom.xml**.***

### Project Screenshot (Intellij):
<img width="1913" height="1013" alt="image" src="https://github.com/user-attachments/assets/1409c979-500c-4183-a744-7290144e094b" />

**Built with clarity, real-world understanding, and proper security practices.** 
