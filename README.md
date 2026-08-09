# 🚀 Jenkins CI/CD + React Web App on Azure via Terraform

This repository provisions an **Azure Virtual Machine** pre-installed with **Jenkins CI/CD Automation Server** (Port 8080) and a **React + Express** application (Port 80) using **Terraform Infrastructure as Code**.

---

## 🏗️ What gets provisioned?

- **Azure Resource Group**: `rg-jenkins-server-xxxx`
- **Virtual Network & Subnet**: `10.0.0.0/16` & `10.0.1.0/24`
- **Network Security Group**: Opens Port **8080** (Jenkins), Port **80** (React Web App), Port **22** (SSH).
- **Virtual Machine**: `Standard_B2ats_v2` in **East Asia Zone 2** (Azure Student Pack compatible).
- **Automated Cloud-Init Services**:
  - Java 17 OpenJDK
  - Jenkins Automation Server on `http://<PUBLIC_IP>:8080`
  - Node.js 20.x & Git
  - React + Express Web Application on `http://<PUBLIC_IP>`
- **Jenkins Pipeline**: Includes a starter `Jenkinsfile` for building & deploying React apps.

---

## ⚡ Quickstart Guide

### 1. Initialize & Deploy Infrastructure

```powershell
az login
terraform init
terraform plan
terraform apply
```
Type **`yes`** when prompted.

---

### 2. Retrieve Jenkins Initial Admin Password

Once `terraform apply` finishes, fetch your Jenkins initial admin password via SSH:

```bash
ssh azureuser@<YOUR_PUBLIC_IP> "sudo cat /var/lib/jenkins/secrets/initialAdminPassword"
```
*(Default SSH password: `StudentPassword123!`)*

---

### 3. Access Services

- **Jenkins Automation Server**: `http://<YOUR_PUBLIC_IP>:8080`
- **React Web Application**: `http://<YOUR_PUBLIC_IP>`

---

### 4. Push to a New Remote Repository

To push this Jenkins setup to your new repository:

```bash
git remote set-url origin <YOUR_NEW_REPO_URL>
git add .
git commit -m "Configure Jenkins CI/CD server infrastructure with Terraform"
git push -u origin main --force
```

---

## 🧹 Teardown Infrastructure (Save Student Credits)

When finished practicing, destroy all created Azure resources:

```powershell
terraform destroy
```
Type **`yes`** when prompted.
