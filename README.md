# Task Management Application

<img width="917" alt="image" src="https://github.com/user-attachments/assets/d8d914ce-976e-4edf-b53e-648c2d916247" />


## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Pages](#pages)
- [How to Run](#how-to-run)

## Introduction
The Task Management App helps users efficiently manage tasks with features like sorting, filtering, and user authentication.

## Features
- User authentication (login/register)
- Task creation and management
- Sorting tasks by priority
- Separate views for completed and incompleted tasks

## Pages
### 🔑 Login  
Users can authenticate themselves using their email and password.

<img width="658" alt="image" src="https://github.com/user-attachments/assets/e516e300-a35d-469b-ad19-bbc833f07ea1" />

### 📝 Create Task  
Allows adding tasks with priority, status, and a description.

<img width="188" alt="image" src="https://github.com/user-attachments/assets/7eed2947-af02-4a4a-a2b9-2f1bacc4717d" />

### 📋 Task Table  
Displays all tasks in a sortable table view.

<img width="602" alt="image" src="https://github.com/user-attachments/assets/ccd3e0d0-4ac3-4e09-9a00-339540313396" />

### ✅ Completed vs 🚧 Incomplete  
Organizes tasks based on their completion status.

<img width="167" alt="image" src="https://github.com/user-attachments/assets/273cdd1b-5d1b-4692-aa37-01f220df25ae" />

---

## Database Design  
The application uses **PostgreSQL** to manage its data. The database contains two main tables:  

1. **User Table**  
   Stores information about registered users, including their ID, name, email, and password.  

2. **Task Table**  
   Stores tasks with fields for description, priority, status, date, and a foreign key (`assigneeId`) linking tasks to users.  

### Database Structure  
#### User Table  
| Column     | Type    | Description                 |
|------------|---------|-----------------------------|
| `id`       | Int     | Primary key, auto-increment |
| `name`     | String  | User's name                |
| `email`    | String  | Unique email address       |
| `password` | String  | Encrypted password         |

#### Task Table  
| Column       | Type      | Description                             |
|--------------|-----------|-----------------------------------------|
| `id`         | Int       | Primary key, auto-increment            |
| `description`| String    | Task description                       |
| `priority`   | String    | Task priority (Low, Medium, High)      |
| `status`     | String    | Task status (Pending, In Progress, Completed) |
| `date`       | DateTime  | Task due date                          |
| `assigneeId` | Int       | Foreign key linking to the user table  |

### Database Schema Diagram  
Below is a visual representation of the database structure:  
#### User Table:  
<img width="593" alt="image" src="https://github.com/user-attachments/assets/d000f873-7d4d-4f7d-8af5-531ee6ea27ee" />

#### Task Table:  
<img width="523" alt="image" src="https://github.com/user-attachments/assets/489cc99c-cede-4eea-8207-c37f3c81f171" />


---

## How to Run
1. Clone the repository:  
   ```bash
   git clone https://github.com/username/task-app.git
   cd task-app
