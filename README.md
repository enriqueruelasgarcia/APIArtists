# Singers API

This is a simple RESTful API built with Node.js and Express to manage a collection of singers. The API allows users to retrieve a list of all singers or get detailed information about a specific singer by their ID.

## Features

- Retrieve all singers (`GET /`)
- Retrieve a specific singer by their ID (`GET /:id`)

## Installation

1. Clone the repository:
    git clone <repository-url>
    ```
2. Navigate to the project directory:
    cd <project-directory>
    ```
3. Install dependencies:
    npm install
    ```
4. Start the server:
    npm start
    ```

## API Endpoints

### Get All Singers

- **URL:** `/`
- **Method:** `GET`
- **Description:** Retrieves a list of all singers.
- **Response:**
  - **Status:** `200 OK`
  - **Body:** JSON array of singers.

### Get Singer by ID

- **URL:** `/:id`
- **Method:** `GET`
- **Description:** Retrieves a specific singer by their ID.


## Controllers

- `singersController.listar(req, res)`: Handles retrieving all singers.
- `singersController.buscar(req, res)`: Handles retrieving a singer by their ID.

## Project Structure

- **routes/singers.js:** Defines the routes for retrieving singers.
- **controllers/singersController.js:** Contains the business logic for handling requests related to singers.

## How to Use

1. **Get All Singers:** Send a `GET` request to `/` to retrieve a list of all available singers.
2. **Get Singer by ID:** Send a `GET` request to `/:id` with the specific singer ID to retrieve detailed information about that singer.
