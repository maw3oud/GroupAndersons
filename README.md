<<<<<<< HEAD
# GroupAndersons
=======
# Group Andersons Employee Portal

A comprehensive employee management web application built with Next.js, Prisma, and Supabase.

## Features

- **User Authentication**: Secure login system with role-based access control
- **Employee Profiles**: Edit personal information and upload profile images
- **File Management**: Upload, download, and share PDF, Word, Excel, and image documents
- **Notes System**: Create personal and collaborative notes with tagging capabilities
- **Dark/Light Mode**: Toggle between dark and light themes
- **Responsive Design**: Works on all devices from mobile to desktop

## Tech Stack

- **Frontend**: Next.js 14 with App Router, TypeScript, Tailwind CSS
- **Authentication**: NextAuth.js
- **Database ORM**: Prisma
- **Database**: PostgreSQL (Supabase)
- **Styling**: Tailwind CSS
- **Theming**: next-themes

## Getting Started

### Prerequisites

- Node.js 18.0.0 or later
- npm or yarn
- A Supabase account with a PostgreSQL database

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/group-andersons-employee-portal.git
   cd group-andersons-employee-portal
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` and add your Supabase database URL and other required variables.

4. Push the Prisma schema to your database:
   ```bash
   npx prisma db push
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment to Vercel

### Automatic Deployment

1. Push your code to a GitHub repository.
2. Create a new project on [Vercel](https://vercel.com).
3. Import your GitHub repository.
4. Configure the environment variables in the Vercel dashboard:
   - `NEXTAUTH_URL`: Your production URL (e.g., https://groupandersons.com)
   - `NEXTAUTH_SECRET`: A secure random string
   - `DATABASE_URL`: Your Supabase PostgreSQL connection string

5. Deploy the project.

### Manual Deployment

1. Install the Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy the project:
   ```bash
   vercel
   ```

4. For production deployment:
   ```bash
   vercel --prod
   ```

## Custom Domain Setup

To use your custom domain (groupandersons.com):

1. Go to your Vercel project dashboard.
2. Navigate to "Settings" > "Domains".
3. Add your domain and follow the instructions to configure DNS settings.

## Initial Setup After Deployment

1. Create an admin user by accessing the database directly or using the registration page.
2. Set up initial roles and permissions.
3. Add company-wide documents and resources.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
>>>>>>> master
