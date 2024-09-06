# FairBank

FairBank is a transparent and ethical web banking application, developed as part of the INM5151 course at UQAM. This project aims to offer an innovative and interest-free banking service platform. FairBank provides a range of features, including transaction management, user interface customization, and an administrator page for advanced user and service management.

## Demo
https://github.com/user-attachments/assets/437bb85c-3d37-40f7-95c3-e1b43d1d767b

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributors](#contributors)
- [License](#license)

## Features

- **Account Creation**: Allows users to create a bank account.
- **Authentication**: Secure management of user authentication.
- **User Account Management**: View and modify user information.
- **Transactions**: Perform transactions between users.
- **Transaction History**: Track completed transactions.
- **Administrator Page**: View overall site activities. Manage user requests.
- **Custom Emails**: Welcome email, password change email, newsletter email, and account deletion confirmation email.

## Technologies Used

### Frontend
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Shadcn UI](https://shadcn.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Router Dom](https://reactrouter.com/)
- [Axios](https://axios-http.com/)
- [react-hook-form](https://react-hook-form.com/)
- [zod](https://github.com/colinhacks/zod)
- [i18n](https://react.i18next.com)

### Backend
- [Django](https://www.djangoproject.com/)
- [Django REST framework](https://www.django-rest-framework.org/)

### Database
- Sqlite3
  
## Installation

### Prerequisites

- Node.js
- npm
- Python
- pip
- Modern web browser

### Instructions

#### Clone the Repository

1. Clone the repository:
   ```bash
   git clone https://github.com/Alteernative/FairBank.git
   cd fairbank
   ```

#### Install Frontend Dependencies

2. Install the frontend dependencies :
   ```bash
   cd frontend
   npm install
   ```

#### Install Backend Dependencies

3. Install the backend dependencies :

##### macOS and Linux

   ```bash
   cd ../backend
   python3 -m venv .venv
   source .venv/bin/activate
   pip install -r requirements.txt
   ```

##### Windows

   ```bash
   cd ../backend
   python -m venv .venv
   .venv\Scripts\activate
   pip install -r requirements.txt
   ```

#### Configure the Database

4. Configure the database :
   ```bash
   python manage.py migrate
   ```

#### Start Development Servers

5. Start the development servers:

##### Frontend

   ```bash
   cd frontend
   npm run dev
   ```

##### Backend

   ```bash
   cd ../backend
   python manage.py runserver
   ```

## Usage 

1. Open your browser and go to http://localhost:5173 to use the application's user interface.
2. Use the available features to create an account, perform transactions, modify the site's appearance, etc

## Project Structure

- `frontend/` : Contains the source code for the frontend.
- `backend/` : Contains the source code for the backend.
- `README.md` : Project documentation.

## Contributors

- [Khalladi, Issam](https://www.linkedin.com/in/issamkhalladi/)
- [Jdaini, Mohammed Ali](https://www.linkedin.com/in/mohammed-ali-jdaini/)
- [Mihai, Dragomir Emilian](https://www.linkedin.com/in/dragomir-mihai/)

## Licence

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.
