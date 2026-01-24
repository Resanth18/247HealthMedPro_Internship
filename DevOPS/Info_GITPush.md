# Git Workflow – Code Push to GitHub Using Terminal & PAT Authentication

> This document explains **how the backend code was pushed to GitHub using the terminal**, including common mistakes faced, why they occurred, and how they were fixed.
> It is written so that even **after 6+ months**, the complete Git flow can be recalled clearly.

---

## Objective

To initialize Git locally, prepare the project for version control, push the backend code to GitHub using the terminal, and authenticate securely using a **GitHub Personal Access Token (PAT)**.

---

## 1. Preparing the Project for Git

### Project Location

The backend project existed locally as a Spring Boot + Maven project created in IntelliJ.

Before pushing to GitHub, Git had to be initialized inside the project root.

---

## 2. Initializing Git Repository

Command used:

```bash
git init
```

### Result

* A `.git` folder was created.
* The project became a Git repository.

---

## 3. Creating `.gitignore` File

### Problem Faced

Commands like below were mistakenly typed in the terminal:

```bash
/target
/.idea
*.iml
.env
```

### Why This Failed

* These are **patterns**, not terminal commands.
* Terminal tried to execute them as commands and failed.

---

### Correct Approach

Created a `.gitignore` file:

```bash
New-Item .gitignore
```

Then added ignore rules inside the file:

```gitignore
/target/
.idea/
*.iml
.env
```

### Reason

* `target/` → Maven build output
* `.idea/` & `*.iml` → IntelliJ files
* `.env` → environment secrets

These files should **never** be pushed to GitHub.

---

## 4. Checking Repository Status

Command used:

```bash
git status
```

### Purpose

* To verify which files are tracked
* To ensure unwanted files are ignored

---

## 5. Adding and Committing Code

Commands used:

```bash
git add .
git commit -m "Initial backend commit"
```

### Result

* All required source files were committed locally.
* Git created the first commit on the `master` branch.

---

## 6. Creating GitHub Repository

* Created a new repository on GitHub.
* Repository was initially empty.
* Visibility chosen based on security needs (Private recommended if secrets exist).

---

## 7. GitHub Authentication Change (Important Concept)

### Problem Faced

GitHub no longer allows authentication using account passwords from the terminal.

Attempting password-based login resulted in failure.

---

## 8. Generating GitHub Personal Access Token (PAT)

### Steps

1. GitHub → Settings → Developer settings
2. Personal access tokens → Tokens (classic)
3. Generated a new token
4. Enabled scope:

   * `repo`

### Reason

PAT acts as a **secure replacement for GitHub password** during Git operations.

---

## 9. Pushing Code to GitHub Using PAT

### Remote Setup

```bash
git remote add origin https://github.com/<username>/<repo-name>.git
```

### Push Command

```bash
git push -u origin master
```

### Authentication

* Username: GitHub username
* Password: **GitHub PAT** (not account password)

---

## 10. Credential Caching Behavior

After successful authentication:

* Git cached credentials automatically.
* Subsequent pushes did not prompt for username/password again.

### Note

Typing `Username:` or `Password:` directly in PowerShell is invalid and results in errors. These prompts are handled internally by Git.

---

## 11. Repository Visibility and Jenkins Access

### Important Clarification

* Jenkins can access **private repositories** using stored credentials.
* Making the repository private does NOT affect Jenkins builds.

### Security Best Practice

* If `application.properties` contains secrets:

  * Keep repo **private**
  * Do not expose credentials in source code

---

## Final Summary

* Git repository initialized successfully.
* `.gitignore` configured correctly.
* Backend code pushed to GitHub via terminal.
* Secure authentication achieved using GitHub PAT.
* Repository ready for Jenkins CI integration.

---

## Status

✅ Git setup completed
✅ Code pushed securely to GitHub
✅ Ready for CI/CD usage
