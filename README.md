# Expense Tracker

A full-stack Expense Tracker application built with **Spring Boot** and **React** to help users manage expenses, budgets, and spending analytics.

> 🚧 Frontend is currently under development.

---

## Features

### Authentication & Security

* JWT Authentication
* Google OAuth2 Login
* Spring Security
* User-specific data isolation

### Categories

* Create Category
* Update Category
* Delete Category
* View Categories

### Expenses

* Create Expense
* Update Expense
* Delete Expense
* Pagination
* Filtering
* Sorting

### Budgets

* Create Budget
* Update Budget
* Delete Budget
* Budget Tracking
* Remaining Budget Calculation

### Analytics

* Dashboard API
* Monthly Spending Summary
* Category-wise Expense Breakdown

### Reports

* Export Expenses as CSV

### Infrastructure

* Dockerized Backend
* Swagger/OpenAPI Documentation
* Global Exception Handling
* Bean Validation
* MapStruct DTO Mapping

---

## Tech Stack

### Backend

* Java 21
* Spring Boot 3
* Spring Security
* JWT
* OAuth2 (Google Login)
* Spring Data JPA
* MySQL
* MapStruct
* Swagger/OpenAPI
* Docker

### Frontend (Coming Soon)

* React
* Vite
* TailwindCSS
* Axios
* Recharts

---

## Project Status

Backend : ✅ Completed

Frontend : 🚧 In Progress

Testing : 🚧 Planned

Deployment : 🚧 Planned

---

## Running the Backend

Clone the repository

```bash
git clone <repository-url>
cd expense-tracker
```

Build the project

```bash
./gradlew clean build
```

Run the application

```bash
./gradlew bootRun
```

Or using Docker

```bash
docker build -t expense-tracker .
docker run -p 8080:8080 expense-tracker
```

---

## Upcoming Features

* React Dashboard
* Interactive Charts
* Unit Testing with JUnit & Mockito
* Integration Testing
* Docker Compose Support
* CI/CD Pipeline
* Cloud Deployment

---

## Author

Jay Raghuvanshi

Computer Science Engineering Student | Java Backend Developer
