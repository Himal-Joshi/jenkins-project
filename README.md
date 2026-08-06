# 🎓 Azure Student Pack - Terraform Practice Repository

This repository contains **Terraform Infrastructure as Code (IaC)** files designed to provision and practice deploying a web server on Microsoft Azure using your **Azure Student Pack**.

---

## 🛠️ Prerequisites

1. **Terraform CLI**: Download and install Terraform from [terraform.io](https://www.terraform.io/downloads).
2. **Azure CLI**: Install Azure CLI (`az`) to authenticate with your Azure account.
   ```bash
   az login
   ```
   *(Ensure your Azure Student subscription is set as active)*
   ```bash
   az account show
   ```

---

## 🚀 Quickstart Steps

### 1. Initialize Terraform
Run `init` to download the required AzureRM provider plugin:
```bash
terraform init
```

### 2. Format & Validate Code
Check your code syntax and formatting:
```bash
terraform fmt
terraform validate
```

### 3. Preview Changes (Plan)
See what Azure resources Terraform will create before applying:
```bash
terraform plan
```

### 4. Create Infrastructure (Apply)
Deploy your Azure VM, Network, and Web Server:
```bash
terraform apply
```
Type `yes` when prompted. 

Once complete, Terraform will output your website URL:
```text
Outputs:

public_ip_address = "20.xxx.xxx.xxx"
website_url       = "http://20.xxx.xxx.xxx"
ssh_command       = "ssh azureuser@20.xxx.xxx.xxx"
```

Open `website_url` in your browser to see your website live! 🎉

---

## 🧹 Clean Up (Save Student Credits)

To prevent spending your Azure Student credits when you're done practicing, destroy all created resources with a single command:

```bash
terraform destroy
```
Type `yes` when prompted. Terraform will clean up all Azure resources cleanly!

---

## 📁 Resource Architecture

- **Resource Group**: `rg-student-web-xxxx`
- **Virtual Network**: `10.0.0.0/16`
- **Subnet**: `10.0.1.0/24`
- **Public IP**: Static Public IP (Standard SKU)
- **Network Security Group**: Open Port 80 (HTTP) & Port 22 (SSH)
- **VM Size**: `Standard_B1s` (Standard B1s burstable, eligible for Azure free tier / student credits)
- **OS**: Ubuntu 22.04 LTS with automated Nginx web server setup
