# Event Booking Index

This project is an event booking index built using TypeScript, Node.js, React.js, GraphQL, and MongoDB. It allows users to browse and book events.

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

   ```bash
   git clone https://github.com/your-username/event-booking-index.git
2. Navigate to the project directory:

3. Install dependencies for both the server and client:

   ```bash
   cd server
   npm install

   cd ../client
   npm install
   
### Project Structure
The project is organized into two main parts:

server: Node.js server with GraphQL API and MongoDB database.
client: React.js client for the front end.


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

### Configuration

1. Update the necessary configuration values in the .env file inside the folder package, such as MongoDB connection details.

3. Running the Application
   
  Start the server:

    ```
    Copy code
    cd server
    npx ts-node index.ts
    
The server will be running at http://localhost:4000.

  Start the client

    cd client
    npm start
  
The client will be accessible at http://localhost:3000.

### Technologies Used
Node.js
TypeScript
React.js
GraphQL
MongoDB

### Contributing
Feel free to contribute by opening issues or pull requests.

### License
This project is licensed under the MIT License.
