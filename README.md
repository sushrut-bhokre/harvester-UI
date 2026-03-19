# zeus-installer

Repository for building the Zeus ISO image. This includes all the scripts, configurations, and the interactive installer console used during system installation.

The `zeus-installer` works in conjunction with the `zeus-edge` repository to provision and deploy a complete Zeus cluster environment.

---

## Overview

The Zeus Installer is an interactive console-based installation system that runs when the Zeus ISO is booted. It allows users to configure and deploy a node into a Zeus cluster with guided inputs.

The installer supports both:
- Creating a new cluster
- Joining an existing cluster

It handles system provisioning, configuration, and initialization of the Zeus environment.

---

## Features

### Cluster Configuration
- Create a new Zeus cluster
- Join an existing cluster
- Cluster token-based authentication
- Cluster role selection (management / worker node)

### Node Configuration
- Set node hostname
- Configure node password (SSH access)
- Assign node roles dynamically
- Display node IP and cluster endpoint after installation

### Disk & Storage Configuration
- Select installation disk
- Select data disk for workloads
- Configure persistent storage partition
- Support for single-disk and multi-disk setups

### Network Configuration
- Select network interface
- DHCP or static IP configuration
- DNS server configuration
- NTP server configuration
- Virtual IP (VIP) setup for cluster access
- Cluster network configuration (optional)

### Security & Access
- Node password setup
- SSH key import via URL
- Cluster token configuration
- Secure communication between nodes

### Advanced Configuration
- HTTP/HTTPS proxy support
- Custom configuration via remote URL (cloud-init / config file)
- Preflight hardware checks before installation
- Option to skip checks (for testing environments)

### Installation Modes
- Interactive installation (ISO boot)
- Automated installation (PXE boot with config file)

---

## Build Instructions

### Prerequisites

- Docker
- Git
- Go (version defined in `go.mod`)
- Make

### Build ISO

```bash
make
```
## Notes


`zeus-installer` is designed to be used **together with the `zeus-edge` repository**.  
  It is responsible for building the ISO and handling the installation workflow,  
  while `zeus-edge` provides the core runtime, services, and cluster components.

