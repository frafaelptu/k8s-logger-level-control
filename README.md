
# K8s Loggers Manager

This is a web interface for managing log levels across Kubernetes pods using the k8s-loggers-manager Spring Boot service.

## Features

- Dynamically change log levels for multiple pods/deployments at once
- View currently modified log packages
- Monitor success/failure status of log level changes
- Filter changed packages by base package name

## Prerequisites

- A running instance of the k8s-loggers-manager Spring Boot service
- Modern web browser

## Getting Started

1. Clone this repository
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`
4. Open your browser and navigate to the local development URL

## Configuration

The application is preconfigured to connect to a local k8s-loggers-manager service at `http://localhost:8081`. You can modify the API URL in `src/services/api.ts` if needed.

## Usage

### Changing Log Levels

1. Navigate to the "Change Log Levels" tab
2. Enter the Kubernetes namespace and deployment name
3. Optionally, specify a label selector to target specific pods
4. Enter the package name to change the log level for (or "ROOT" for root logger)
5. Select the desired log level
6. Click "Change Log Levels" to apply changes

### Viewing Changed Packages

1. Navigate to the "View Changed Packages" tab
2. Enter a base package name to filter (optional)
3. Click "Search" to retrieve changed packages

## API Integration

This application communicates with the k8s-loggers-manager Spring Boot service through the following endpoints:

- POST `/log-level` - Change log levels for pods
- GET `/log-level/changed-packages` - Retrieve changed packages
- GET `/actuator/health` - Check service health status

## License

This project is open source and available under the MIT license.
