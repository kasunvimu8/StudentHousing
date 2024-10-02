# Student Housing Web Application

## 🛠️ Prerequisites

Before you start, you will need to have the following installed:

- Git
- Docker and Docker Compose
- Node.js v20.11.1(LTS)
- MongoDB
- Email Server Account (NodeMailer & OFFICE 365)
- Amazon S3
- A modern web browser (Chrome, Firefox, etc.)

### Git

1. **Windows:**

   - Download Git from [Git SCM](https://git-scm.com/download/win).
   - Run the installer and follow the instructions.

2. **macOS:**

   - Install Git using Homebrew with the command `brew install git` in the terminal.
   - If you don't have Homebrew, install it from [brew.sh](https://brew.sh/).

3. **Linux:**
   - Use the package manager to install Git, for example `sudo apt-get install git` for Debian/Ubuntu.

### Docker and Docker Compose

1. **Windows/macOS:**

   - Install Docker Desktop from the [docker.com](https://www.docker.com/products/docker-desktop).
   - Docker Compose is included in Docker Desktop.

2. **Linux:**
   - Install Docker using the official guide from [docker.com](https://docs.docker.com/engine/install/).
   - Install Docker Compose separately following the instructions on the [Docker Compose documentation](https://docs.docker.com/compose/install/).

### Node.js v20.11.1 (LTS)

1. **All Platforms:**

   - Download the LTS version from the [official Node.js website](https://nodejs.org/).
   - Run the installer and follow the instructions to install Node.js and npm.

2. **Alternatively, use nvm:**
   - Install `nvm` (Node Version Manager) from [nvm's GitHub page](https://github.com/nvm-sh/nvm).
   - Install Node.js using nvm with the command `nvm install 20.11.1`.

## 🚀 Get Started

To get started with the Maltego Project, follow these steps:

### 1. Clone the Repository

Clone the project repository to your local machine using Git.

```bash
git clone git@github.com:kasunvimu8/student-housing.git
```

### 3.Set up the Environment Configuration

Make sure that that you created a .env.local file with the necessary keys similar to the .env_example

### 3. Run the server

First, run the development server:

```bash
npm run dev
```

Create production build:

```bash
npm run build
```

run production server:

```bash
npm start
```

## 📝 Design & Guidelines

### Design

Figma design for the project can be found [here](https://www.figma.com/file/lPeRLZfiV24L872YwWm4ZJ/Student-Housing?type=design&node-id=18%3A2055&mode=design&t=QfrTuZD2Xzrv8BE3-1)
