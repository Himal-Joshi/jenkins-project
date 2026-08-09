output "resource_group_name" {
  value       = azurerm_resource_group.rg.name
  description = "The name of the created Azure Resource Group."
}

output "public_ip_address" {
  value       = azurerm_public_ip.pip.ip_address
  description = "The public IP address of the Jenkins VM."
}

output "jenkins_url" {
  value       = "http://${azurerm_public_ip.pip.ip_address}:8080"
  description = "URL to access the Jenkins Server Web UI."
}

output "website_url" {
  value       = "http://${azurerm_public_ip.pip.ip_address}"
  description = "URL to access the deployed React website."
}

output "ssh_command" {
  value       = "ssh ${var.admin_username}@${azurerm_public_ip.pip.ip_address}"
  description = "Command to SSH into your Jenkins Azure VM."
}

output "jenkins_initial_password_command" {
  value       = "ssh ${var.admin_username}@${azurerm_public_ip.pip.ip_address} \"sudo cat /var/lib/jenkins/secrets/initialAdminPassword\""
  description = "Command to retrieve the initial Jenkins admin setup password."
}
