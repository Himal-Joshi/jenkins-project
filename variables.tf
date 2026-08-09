variable "prefix" {
  type        = string
  default     = "jenkins-server"
  description = "Prefix for all Azure resource names to keep them unique."
}

variable "location" {
  type        = string
  default     = "eastasia"
  description = "Azure region where resources will be created (Azure Student Pack supported region)."
}

variable "vm_size" {
  type        = string
  default     = "Standard_B2ats_v2"
  description = "Virtual Machine SKU size. Standard_B2ats_v2 (2 vCPUs, 1 GiB RAM)."
}

variable "admin_username" {
  type        = string
  default     = "azureuser"
  description = "Administrator username for the Linux Virtual Machine."
}

variable "ssh_public_key" {
  type        = string
  default     = ""
  description = "Optional SSH public key string (e.g. ssh-rsa ...). If left blank, password authentication or standard key will be configured."
}
