#!/usr/bin/env bash

echo "
----------------------
  NODE & NPM
----------------------
"

# Add nodejs 10 ppa (personal package archive) from nodesource
curl -fsSL https://deb.nodesource.com/setup_14.x | sudo -E bash -

# Install nodejs and npm
sudo apt-get install -y nodejs


echo "
----------------------
  MONGODB
----------------------
"

# Import MongoDB public GPG Key
wget -qO - https://www.mongodb.org/static/pgp/server-5.0.asc | sudo apt-key add -

# Create the /etc/apt/sources.list.d/mongodb-org-5.0.list file for MongoDB
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/5.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-5.0.list

# Reload local package database
sudo apt-get update

# Install the MongoDB packages
sudo apt-get install -y mongodb-org

# Start mongodb
sudo systemctl start mongod

# Set mongodb to start automatically on system startup
sudo systemctl enable mongod


echo "
----------------------
  PM2
----------------------
"

# PM2 is a production process manager for Node.js applications with a built-in load balancer
# install pm2 with npm
sudo npm install -g pm2

# set pm2 to start automatically on system startup
sudo pm2 startup systemd


echo "
----------------------
  NGINX
----------------------
"

# Install nginx
sudo apt-get install -y nginx


echo "
----------------------
  UFW (FIREWALL)
----------------------
"

# Allow ssh connections through firewall
sudo ufw allow OpenSSH

# Allow http & https through firewall
sudo ufw allow 'Nginx Full'

# Enable firewall
sudo ufw --force enable
