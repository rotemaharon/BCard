# BCard - Digital Business Cards Platform

A full-stack final project built with React and TypeScript.

## Getting Started

1. Clone the repository:
```bash
   git clone https://github.com/rotemaharon/BCard.git
   cd BCard
```

2. Install dependencies:
```bash
   npm install
```

3. Create a `.env` file in the root directory based on `.env.example`:
```
VITE_API_URL=https://bcard-ojqa.onrender.com
```

4. Start the development server:
```bash
   npm run dev
```

## Test Users

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@gmail.com | Abc!123Abc |
| Business | pizza@gmail.com | Abc!123Abc |
| Regular | guest@gmail.com | Guest!4321 |

## Features

- Full role-based authorization with dynamic navigation and CRUD permissions
- JWT authentication stored in localStorage and sent with every API request
- Real-time global card search in the Navbar
- Form validation using Formik and Yup with strict password Regex
- Accessible images with descriptive alt attributes
- Dark mode with persistence across page refreshes
- Card details page with an embedded dynamic Google Map
- CRM panel for Admin users to manage user status and deletion

## Tech Stack

- React 19, TypeScript, Vite
- Context API for state management
- Formik and Yup for form validation
- Axios for HTTP requests
- JWT and jwt-decode for authentication
- React Icons and React Toastify for UI

Developed by Rotem Aharon