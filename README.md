# 💰 Expense Tracker

A full-stack Expense Tracker application built with Spring Boot, React, MySQL, JWT Authentication, OAuth2 (Google Login), and Docker.

---

## 🚀 Features

### Authentication
- JWT Authentication
- Google OAuth2 Login
- BCrypt Password Encryption
- Spring Security
- Stateless Authentication

### Expense Management
- Add Expenses
- Update Expenses
- Delete Expenses
- Pagination
- User-specific expenses

### Category Management
- Create Categories
- Update Categories
- Delete Categories

### Budget Management
- Monthly Budgets
- Budget Tracking

### Analytics Dashboard
- Monthly Expense Summary
- Spending Breakdown
- Dashboard Statistics

### Security
- JWT Authorization Filter
- OAuth2 Authentication
- Protected REST APIs
- Role-ready Security Configuration

---

## 🛠 Tech Stack

### Backend

- Java 21
- Spring Boot
- Spring Security
- Spring Data JPA
- Hibernate
- MySQL
- JWT
- OAuth2
- Lombok
- MapStruct
- Swagger/OpenAPI

### Frontend

- React
- Vite
- Tailwind CSS
- Axios
- React Router

### DevOps

- Docker
- Docker Compose

---

## 📁 Project Structure

```
expense-tracker
│
├── backend
│   ├── src
│   ├── Dockerfile
│   └── compose.yaml
│
├── frontend
│   ├── src
│   ├── Dockerfile
│   └── nginx.conf
│
└── README.md
```

---

## 📸 Screenshots

### Login
<img width="1853" height="920" alt="Screenshot from 2026-06-30 17-21-41" src="https://github.com/user-attachments/assets/06161d6d-6150-4ef3-87ca-adda197d4355" />



### Dashboard
// Dark Mode 
<img width="1853" height="920" alt="Screenshot from 2026-06-30 17-21-30" src="https://github.com/user-attachments/assets/4407f654-f6fe-424d-8427-aa5354515a36" />
//
Light Mode
<img width="1853" height="920" alt="Screenshot from 2026-06-30 17-21-02" src="https://github.com/user-attachments/assets/6ef145f4-a16f-4a9a-bf07-2826041b219c" />



### Expenses

<img width="1853" height="920" alt="Screenshot from 2026-06-30 17-21-09" src="https://github.com/user-attachments/assets/dccea608-6ba2-4d56-a974-a4ae5565e905" />


### Categories

<img width="1853" height="920" alt="Screenshot from 2026-06-30 17-21-15" src="https://github.com/user-attachments/assets/a2c84f41-5f3b-4394-b3ee-95f3796d8682" />


### Budgets

<img width="1853" height="920" alt="Screenshot from 2026-06-30 17-21-20" src="https://github.com/user-attachments/assets/a7ccc937-8fcb-4c22-9bba-2d5d455b5e0a" />

---

## ⚙️ Running Locally

### Clone

```bash
git clone https://github.com/jerryRaghuvanshi/expense-tracker.git

cd expense-tracker
```

### Backend

```bash
./gradlew bootRun
```

### Frontend

```bash
npm install
npm run dev
```

---

## 🐳 Running with Docker

```bash
docker compose up --build
```

This starts

- MySQL
- Spring Boot Backend
- React Frontend

---

## 🔐 Environment Variables

Create a `.env` file.

```env
DB_URL=
DB_USERNAME=
DB_PASSWORD=

JWT_SECRET=
JWT_EXPIRATION=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

---

## 📖 API Documentation

Swagger UI

```
http://localhost:8080/swagger-ui/index.html
```

---

## 🚀 Future Improvements

- Multi-currency support
- Recurring expenses & recurring budgets
- Shared family/workspace expense management
- Push & email notifications
- AI-powered expense insights and spending recommendations
- Receipt OCR (scan bills using camera)
- Bank account integration (Plaid/Open Banking)
- Progressive Web App (PWA) support
- Microservices architecture
- API Gateway
- Service Discovery
- Docker Swarm / Kubernetes deployment
- CI/CD with GitHub Actions
- AWS Cloud deployment
- Monitoring with Prometheus & Grafana
- Distributed tracing with Zipkin
---

## 👨‍💻 Author

**Jay Raghuvanshi**

LinkedIn:
https://www.linkedin.com/in/jay-singh-raghuvanshi/

GitHub:
https://github.com/jerryRaghuvanshi
