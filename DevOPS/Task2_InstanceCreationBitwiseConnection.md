# Task 2 – Ubuntu EC2 Instance Creation & Bitvise SSH Connection

> This document explains **Task 2** in detail so that it is easy to understand even after **6+ months**.
> It covers **why Ubuntu was chosen, how the instance was created, security group logic, key pair usage, and Bitvise SSH authentication**, including common confusions faced and how they were resolved.

---

## Objective

To launch an **Ubuntu Server EC2 instance** on AWS and establish a **secure SSH connection using Bitvise SSH Client**.

---

## 1. Choosing the Correct EC2 Operating System

* AMI selected:

  ```
  Ubuntu Server 22.04 LTS (Free Tier Eligible)
  ```

### Reason

* Ubuntu Server is widely used in industry.
* Best suited for Java, Spring Boot, Jenkins, Docker, and DevOps workflows.
* Bitvise works via SSH, which is standard on Ubuntu.

---

## 2. EC2 Instance Creation

### Configuration Used

* Instance name: `grouping-ubuntu-server`
* Instance type: `t2.micro` (Free Tier)
* Auto-assign Public IP: **Enabled**

### Reason

* Public IP is required to connect from a local system using Bitvise.

---

## 3. Key Pair Creation (VERY IMPORTANT)

* Created a new key pair during EC2 launch.
* Key type: **RSA**
* File format: **.pem**
* Key downloaded and stored securely.

### Reason

* Ubuntu EC2 instances **do not allow password login** by default.
* SSH key-based authentication is mandatory.
* Without the `.pem` file, SSH access is impossible.

---

## 4. Security Group Configuration

### Inbound Rules Added

| Type       | Port | Source   | Purpose                       |
| ---------- | ---- | -------- | ----------------------------- |
| SSH        | 22   | My IP    | Secure SSH access via Bitvise |
| Custom TCP | 8080 | Anywhere | Backend access (future use)   |

### Important Notes

* Port **8081** was NOT opened because Jenkins runs locally, not on EC2.
* AWS warning about `0.0.0.0/0` is acceptable for testing/demo purposes.

---

## 5. Instance Launch Confirmation

* Instance state changed to **Running**.
* Public IPv4 address and DNS name were generated.
* This confirmed successful EC2 launch.

---

## 6. Bitvise SSH Client Setup (Local Machine)

* Installed **Bitvise SSH Client** on Windows.
* Opened Bitvise and configured connection details.

### Connection Details Used

* Host: EC2 Public IPv4 address
* Port: `22`
* Username: `ubuntu`

### Reason

* `ubuntu` is the default SSH user for Ubuntu AMIs.
* Using `root` or `ec2-user` would fail.

---

## 7. SSH Key Import in Bitvise

* Imported the downloaded `.pem` file into Bitvise using **Client Key Manager**.
* Bitvise converted the key to `.bpk` format.

### Authentication Selection

* When prompted with:

  ```
  Client key: Auto / Global 1
  ```
* Selected: **Global 1**

### Reason

* `Global 1` explicitly uses the imported EC2 key.
* `Auto` may fail if multiple keys exist.

---

## 8. SSH Connection Verification

* First-time host key verification prompt was shown.
* Selected **Accept and Save**.

### Successful Login Confirmation

Terminal prompt:

```bash
ubuntu@ip-xxx-xxx-xxx-xxx:~$
```

This confirmed:

* EC2 instance is reachable
* Security group rules are correct
* SSH authentication is successful

---

## 9. Environment Verification (Optional Check)

* Verified Java version:

```bash
java -version
```

* Java 21 was available and matched the Jenkins build environment.

### Note

No deployment was performed as the assigned task only required instance creation and connection.

---

## Task 2 Status

✅ Ubuntu EC2 instance launched successfully
✅ Connected securely using Bitvise SSH
✅ Task completed exactly as assigned
