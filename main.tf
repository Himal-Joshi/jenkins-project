# 1. Random String for Unique Resource Naming
resource "random_string" "suffix" {
  length  = 6
  special = false
  upper   = false
}

# 2. Resource Group
resource "azurerm_resource_group" "rg" {
  name     = "rg-${var.prefix}-${random_string.suffix.result}"
  location = var.location

  tags = {
    Environment = "Student"
    ManagedBy   = "Terraform"
    Project     = var.prefix
  }
}

# 3. Virtual Network (VNet)
resource "azurerm_virtual_network" "vnet" {
  name                = "vnet-${var.prefix}"
  address_space       = ["10.0.0.0/16"]
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
}

# 4. Subnet
resource "azurerm_subnet" "subnet" {
  name                 = "snet-web"
  resource_group_name  = azurerm_resource_group.rg.name
  virtual_network_name = azurerm_virtual_network.vnet.name
  address_prefixes     = ["10.0.1.0/24"]
}

# 5. Public IP Address
resource "azurerm_public_ip" "pip" {
  name                = "pip-${var.prefix}"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  allocation_method   = "Static"
  sku                 = "Standard"
}

# 6. Network Security Group (NSG) with Inbound Firewall Rules
resource "azurerm_network_security_group" "nsg" {
  name                = "nsg-${var.prefix}"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name

  # Allow HTTP Traffic (Port 80)
  security_rule {
    name                       = "AllowHTTP"
    priority                   = 100
    direction                  = "Inbound"
    access                     = "Allow"
    protocol                   = "Tcp"
    source_port_range          = "*"
    destination_port_range     = "80"
    source_address_prefix      = "*"
    destination_address_prefix = "*"
  }

  # Allow SSH Traffic (Port 22)
  security_rule {
    name                       = "AllowSSH"
    priority                   = 110
    direction                  = "Inbound"
    access                     = "Allow"
    protocol                   = "Tcp"
    source_port_range          = "*"
    destination_port_range     = "22"
    source_address_prefix      = "*"
    destination_address_prefix = "*"
  }
}

# 7. Network Interface (NIC)
resource "azurerm_network_interface" "nic" {
  name                = "nic-${var.prefix}"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name

  ip_configuration {
    name                          = "internal"
    subnet_id                     = azurerm_subnet.subnet.id
    private_ip_address_allocation = "Dynamic"
    public_ip_address_id          = azurerm_public_ip.pip.id
  }
}

# 8. Associate Network Interface with Security Group
resource "azurerm_network_interface_security_group_association" "nic_nsg_assoc" {
  network_interface_id      = azurerm_network_interface.nic.id
  network_security_group_id = azurerm_network_security_group.nsg.id
}

# 9. Linux Virtual Machine (Standard_B1s for Azure Student Subscription)
resource "azurerm_linux_virtual_machine" "vm" {
  name                = "vm-${var.prefix}"
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location
  size                = var.vm_size
  admin_username      = var.admin_username
  zone                = "2"

  disable_password_authentication = false
  admin_password                  = "StudentPassword123!" # Change or override as needed

  network_interface_ids = [
    azurerm_network_interface.nic.id,
  ]

  # Cloud-Init script: Installs Node.js, builds React App & runs systemd service on Port 80
  custom_data = base64encode(<<-EOF
              #!/bin/bash
              set -e

              # Install Node.js & NPM
              curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
              apt-get install -y nodejs build-essential

              # Create app directory structure
              mkdir -p /var/www/reactapp/src
              cd /var/www/reactapp

              # Write package.json
              cat <<'JSON' > package.json
              ${file("app/package.json")}
              JSON

              # Write vite.config.js
              cat <<'VITE' > vite.config.js
              ${file("app/vite.config.js")}
              VITE

              # Write index.html
              cat <<'INDEX' > index.html
              ${file("app/index.html")}
              INDEX

              # Write server.js
              cat <<'JS' > server.js
              ${file("app/server.js")}
              JS

              # Write src files
              cat <<'SRC_INDEX_CSS' > src/index.css
              ${file("app/src/index.css")}
              SRC_INDEX_CSS

              cat <<'SRC_MAIN_JSX' > src/main.jsx
              ${file("app/src/main.jsx")}
              SRC_MAIN_JSX

              cat <<'SRC_APP_JSX' > src/App.jsx
              ${file("app/src/App.jsx")}
              SRC_APP_JSX

              # Install dependencies and build React app
              npm install
              npm run build

              # Configure systemd service
              cat <<'SERVICE' > /etc/systemd/system/reactapp.service
              [Unit]
              Description=React Azure Terraform Web App
              After=network.target

              [Service]
              Type=simple
              User=root
              WorkingDirectory=/var/www/reactapp
              ExecStart=/usr/bin/node server.js
              Restart=always
              Environment=PORT=80

              [Install]
              WantedBy=multi-user.target
              SERVICE

              systemctl daemon-reload
              systemctl enable reactapp
              systemctl start reactapp
              EOF
  )

  os_disk {
    caching              = "ReadWrite"
    storage_account_type = "Standard_LRS"
  }

  source_image_reference {
    publisher = "Canonical"
    offer     = "0001-com-ubuntu-server-jammy"
    sku       = "22_04-lts-gen2"
    version   = "latest"
  }

  tags = {
    Environment = "Student"
    ManagedBy   = "Terraform"
  }
}
