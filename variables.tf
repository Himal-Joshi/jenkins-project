variable "prefix" {
  type        = string
  default     = "student-web"
  description = "Prefix for all Azure resource names to keep them unique."
}

variable "location" {
  type        = string
  default     = "eastasia"
  description = "Azure region where resources will be created (Azure Student Pack supported region)."
}

variable "vm_size" {
  type        = string
  default     = "Standard_B1ls"
  description = "Virtual Machine SKU size. Standard_B1ls costs ~$3.80/month (well under the $10/month limit)."
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
