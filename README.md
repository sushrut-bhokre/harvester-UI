# ZEUS-UI

This repository contains the source code for the Zeus Web UI.

The UI is packaged as a bundled extension (`.tar.gz`) and consumed by the `zeus-edge` repository to provide a graphical interface for managing Zeus clusters.

---

## Overview

The Zeus UI provides a web-based interface for interacting with the Zeus platform. It enables users to manage clusters, nodes, networking, and system configurations through an intuitive dashboard.

The core UI logic is built on top of the Rancher Dashboard framework, with custom extensions and configurations specific to Zeus.

---

## Architecture

- Built using Rancher Dashboard (Shell framework)
- Core UI logic resides inside `node_modules` (Rancher shell)
- Zeus-specific customizations are layered on top of the shell
- Styling is managed via `main.scss`

---

## Features

### Cluster Management
- View cluster status and health
- Monitor node availability
- Access cluster endpoints

### Node Management
- View and manage nodes
- Inspect node resources (CPU, RAM, storage)
- Node role visibility (management / worker)

### Networking
- View cluster networking configuration
- Display node IPs and endpoints
- Monitor connectivity status

### Storage
- View storage allocation
- Monitor volumes and usage
- Persistent storage insights

### System Monitoring
- Basic system metrics and status
- Health overview of cluster components

### UI Customization
- Custom styling via `main.scss`
- Extendable via Rancher shell framework

---

## Build Instructions

### Prerequisites

- Node.js (recommended 20 LTS version or greater)
- Yarn or npm

---

### Install Dependencies

```bash
yarn install
yarn dev
```
### To run in extended mode with existing zeus deployment use 
```
RANCHER_ENV=harvester API=https://your-zeus-management-ip yarn dev
```
