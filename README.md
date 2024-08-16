<h1 align="start">
  Next.js Clerk Authentication Starter
</h1>

<img width="1280" alt="Next.js Authentication Thumbnail" src="https://github.com/user-attachments/assets/fe828deb-7cef-4712-ba8a-74ce1d1d4c18">

## 📚 Introduction

In this project, we build a full-stack authentication system using Next.js, Clerk, Shadcn UI, Prisma, and MongoDB. This setup includes user authentication, secure login, and registration processes, making it perfect for modern web applications.

## 🎥 Watch Tutorial on YouTube

Check out the tutorial to see how this authentication system was built: [Watch the Tutorial](https://www.youtube.com/watch?v=4ntGgYG_t0U) 💻

## 🛠️ Tech Stack

- **Next.js**: Framework for building server-rendered React applications.
- **Clerk**: For secure user authentication and management.
- **Shadcn UI**: For building seamless UI.
- **Prisma**: ORM for managing database interactions.
- **MongoDB Atlas**: Cloud-based MongoDB for storing user data.

## 🚀 Quick Start

### Prerequisites
Ensure you have the following installed:
- Node.js
- Git
- npm / yarn / pnpm

1. Clone this repository:

   ```bash
   git clone https://github.com/Shreyas-29/nextjs-clerk-auth-starter.git
   cd nextjs-clerk-auth-starter
   ```
2. Install dependencies:
   ```bash
    npm install
   ```
3. Set up environment variables:
   ```bash
    # database
    DATABASE_URL=
    
    # clerk
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
    CLERK_SECRET_KEY=
    NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
    NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
    NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_URL=/
    NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_URL=/
   ```
4. Setup the Prisma:
   ```bash
   npx prisma init
   npx prisma generate
   npx prisma db push 
   ```
5. Start the development server:
   ```bash
    npm run dev
   ```
6.	Open your browser and navigate to http://localhost:3000 to see the app in action.

📄 License

This project is licensed under the MIT License - see the LICENSE file for details.








   
