output "resource_group_name" {
  value       = azurerm_resource_group.rg.name
  description = "The name of the created Azure Resource Group."
}

output "public_ip_address" {
  value       = azurerm_public_ip.pip.ip_address
  description = "The public IP address of the virtual machine."
}

output "website_url" {
  value       = "http://${azurerm_public_ip.pip.ip_address}"
  description = "URL to access the deployed website."
}

output "ssh_command" {
  value       = "ssh ${var.admin_username}@${azurerm_public_ip.pip.ip_address}"
  description = "Command to SSH into your Azure VM."
}
