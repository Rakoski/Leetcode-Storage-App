# Leetcode Storage App

This project is a leetcode problem storage web app built using TypeScript, Node.js, React.js, GraphQL, and MongoDB. It allows users to store and organize their leetcode problems they have solved. This is meant as a training project for MongoDB, GraphQL and Typescript.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
  - [Server](#server)
  - [Client](#client)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed on your machine:

- Node.js (version 18.X.X)
- npm (version 5.X.X)
- MongoDB (running locally or a connection to a MongoDB instance)

### Installation

1. Clone the repository:

     ```
     git clone https://github.com/your-username/Leetcode-Storage-App.git
2. Navigate to the project directory:

3. Install dependencies for both the server and client:

    ```
   cd server
   npm install

   cd ../client
   npm install
## Project Structure
The project is organized into two main parts:

1. server: Node.js server with GraphQL API and MongoDB database.
2. client: React.js client for the front end.

<code>event-booking-index/
|-- server/
|   |-- graphql/
|   |-- models/
|   |-- middleware/
|   |-- index.ts
|   |-- .env
|   |-- package.json
|   |-- tsconfig.json
|-- client/
|   |-- public/
|   |-- src/
|   |   |-- components/
|   |   |-- containers/
|   |   |-- pages/
|   |   |-- App.tsx
|   |   |-- index.tsx
|   |-- package.json
|   |-- tsconfig.json
|-- .gitignore
|-- README.md
</code>

## Configuration

1. Update the necessary configuration values in the .env file inside the folder package, such as MongoDB connection details.

2. Running the Application
   
  Start the server:

    cd server
    npx ts-node index.ts
    
The server will be running at http://localhost:4000.

  Start the client

    cd client
    npm start
  
The client will be accessible at http://localhost:3000.

## Technologies Used
Node.js,
Ts-node,
TypeScript,
React.js,
GraphQL,
MongoDB

### Contributing
Feel free to contribute by opening issues or pull requests.

### License
This project is licensed under the MIT License.
