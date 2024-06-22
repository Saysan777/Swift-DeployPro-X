# Swift DeployPro-X Project

Welcome to the Swift DeployPro X project repository! This project is inspired by Vercel deployment and is designed to dynamically deploy and serve web applications from any given Git repository URL. It's built using Node.js and leverages AWS ECS for container management, AWS S3 for storage, and Redis for real-time messaging.

## Features

- **Dynamic Project Builds**: Automatically builds projects from provided Git URLs.

- **Real-time Build Logs**: Utilizes Redis to stream build logs in real-time, allowing users to monitor the build process.

- **Direct Serving from S3**: Implements a reverse proxy to serve files directly from AWS S3 based on subdomain mapping, making the projects accessible via unique URLs.

## Architecture:

1. **ApiServer**: Manages incoming HTTP requests, initiates new builds, and handles the lifecycle of each project build.

2. **BuildServer**: Responsible for cloning the repository, building the project, and streaming output files to an S3 bucket.

3. **S3 Reverse Proxy**: Serves the built projects by resolving the correct S3 bucket path from the request's subdomain.

## Getting Started

To get started with this project, clone this repository and install the necessary dependencies.
To set up and run the project locally, follow these steps:

1. **Clone the Repository**:
   Open your terminal and run the following command to clone the repository:

   ```bash
   git clone https://github.com/Saysan777/Swift-DeployPro-X.git
   ```

2. **Navigate to the Project Directory**:
   Change into the project directory:

   ```bash
   cd Swift-DeployPro-X
   ```

3. **Install Dependencies**:
   Install the necessary Node.js dependencies by running:

   ```bash
   npm install
   ```

4. **Start the Project**:
   Once the dependencies are installed, you can start the project by running:
   ```bash
   npm start
   ```

This will set up everything needed to run the Swift-DeployPro-X Project locally.

## Scalability and Security

### Scalability

- **Horizontal Scaling**: Utilizes AWS ECS to dynamically scale the number of containers based on traffic and workload, ensuring efficient resource utilization.

- **Independent Scaling for Build Servers**: Allows multiple builds to run simultaneously without bottlenecking, by scaling BuildServers based on demand.

- **High-Throughput Redis**: Employs Redis for real-time logging and messaging, supporting high-throughput and low-latency operations essential for scalability.

- **Efficient Content Delivery**: Leverages AWS S3 and a reverse proxy setup to offload static content delivery, enhancing performance and scalability.

### Security

- **Request Validation**: Ensures all incoming requests to the ApiServer are valid and authenticated, preventing unauthorized access.

- **Network Security**: Uses AWS security groups and network ACLs to tightly control access to the infrastructure.

- **Encrypted Communications**: Implements TLS for secure data transmission between services, safeguarding against data interception.

- **Regular Security Audits**: Conducts periodic security checks and updates to protect against new vulnerabilities and ensure the system's integrity.
