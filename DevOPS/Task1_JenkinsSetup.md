# Task 1 – Jenkins Setup, GitHub Integration & Maven Build

> This document explains **Task 1** in full detail so that even after **6+ months**, the entire flow can be recalled without confusion.
> It includes **URLs, navigation paths, reasons, errors faced, and fixes**.

---

## Objective

To install Jenkins on a Windows system, configure it properly, integrate it with GitHub using secure credentials, and successfully build a Maven-based Spring Boot backend project.

---

## 1. Jenkins Installation (Windows)

### Steps

1. Downloaded **Jenkins LTS (Windows Installer)** from the official site.
2. Installed Jenkins as a **Windows Service**.
3. During installation, Jenkins asked for a port number.

   * Default port: `8080`
   * Changed to: **`8081`**

### Reason

The Spring Boot backend application uses port `8080`. Two applications cannot run on the same port, so Jenkins was configured to run on `8081`.

---

## 2. Accessing Jenkins for the First Time

* Jenkins URL used:

  ```
  http://localhost:8081
  ```

* Jenkins showed **Unlock Jenkins** screen.

* Initial admin password was retrieved from:

  ```
  C:\ProgramData\Jenkins\.jenkins\secrets\initialAdminPassword
  ```

* Installed **Suggested Plugins**.

* Created a permanent **Admin User**.

### Reason

Using an admin user is safer and closer to real-world Jenkins usage than continuing with the temporary setup user.

---

## 3. GitHub Repository Preparation

* Backend Spring Boot project was pushed to GitHub.
* GitHub password authentication is deprecated.
* Generated a **GitHub Personal Access Token (PAT)**.

### PAT Configuration

* Scope enabled: `repo`
* Token used instead of GitHub password.

---

## 4. Adding GitHub Credentials in Jenkins

### Navigation Path

```
Manage Jenkins → Credentials → System → Global credentials → Add Credentials
```

### Credential Details

* Kind: Username with password
* Username: GitHub username
* Password: GitHub Personal Access Token
* ID: `github-creds`

### Reason

Jenkins requires credentials to clone private GitHub repositories securely during builds.

---

## 5. Maven Configuration in Jenkins

### Navigation Path

```
Manage Jenkins → Tools → Maven Installations
```

* Added a Maven installation.
* Enabled **Install automatically**.

### Reason

Jenkins runs as a system service and cannot use Maven installed inside IntelliJ or the local user environment.

---

## 6. Jenkins Job Creation

### Job Type

* **Freestyle Project**

### Git Configuration

* SCM: Git
* Repository URL: GitHub repository URL
* Credentials: `github-creds`

---

## 7. Maven Build Configuration

### Problem Faced

* Jenkins failed with:

  ```
  pom.xml not found
  ```

### Reason

The `pom.xml` file was located inside a subdirectory:

```
Grouping/pom.xml
```

### Fix

* Explicitly specified POM path in Jenkins build step.

### Maven Goals Used

```bash
clean package -Dmaven.test.skip=true
```

### Explanation

* `-DskipTests` only skips test execution
* `-Dmaven.test.skip=true` skips both test compilation and execution

---

## 8. Task 1 Outcome

* Jenkins successfully cloned the GitHub repository.
* Maven build completed without errors.
* Spring Boot JAR file generated successfully.
* CI pipeline verified.

---

## Task 1 Status

✅ Completed Successfully
