# User Management Web Application

## Overview

This is a simple yet powerful web application designed to manage user profiles. The application allows users to edit their own profiles, view other users' profiles, and provides admin functionalities to manage all users. Developed with modern technologies and best practices, this project serves as a comprehensive example of a full-stack application.

## Features

- **React Server Components**: Utilizes React Server Components for optimized rendering and data fetching.
- **Server-Managed Process**: All processes are managed through server components, ensuring efficient data handling.
- **User Interface**: Users visiting the application can view registered users displayed as cards on the homepage. They can also register and log in.
- **Role Management**: Admins can manage user roles, providing different levels of access and functionalities.
  - **Admin Role**: Full access to the admin page, with capabilities for full CRUD operations.
  - **User Role**: Limited access to only view and update their own profile information.

## Technologies Used

- **Next.js**: For routing and server-side rendering.
- **Shadcn**: For UI components.
- **Tailwind**: For styling.
- **TypeScript**: For static type checking.
- **Next Auth**: For authentication.
- **Zod**: For form validation.
- **Prisma ORM**: For database management.
- **PlanetScale (MYSQL)**: As the database.

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`
