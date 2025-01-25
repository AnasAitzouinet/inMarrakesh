# Anasaitzouinet-inmarrakesh

A Next.js 13 (App Router) web application that showcases destinations, handles user authentication, and includes a custom Admin panel. This project uses TypeScript, Tailwind CSS, Prisma, and various custom hooks and components to provide a scalable, maintainable architecture.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Scripts](#scripts)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)

## Overview
Anasaitzouinet-inmarrakesh is a tourism-focused platform that allows users to discover popular destinations, read about tours, and optionally reserve or book them. It also includes:

- A secure authentication system with support for email-based OTP or magic links (via Prisma and custom logic)
- An admin dashboard for managing content, accessible via app/Admin
- Custom UI components and hooks to streamline development and maintain consistency

## Features
- Next.js 13 App Router for modern, file-based routing and server-side rendering (SSR)
- Tailwind CSS for utility-first, responsive styling
- TypeScript for static typing and improved developer experience
- Prisma for database migrations and ORM functionality
- Custom Hooks & Components to facilitate code reuse (e.g., useUploadFile, useMobile)
- Custom Admin area under /Admin subdirectory
- Middleware for host-based rewrites or request handling
- Authentication routes under app/api/auth and front-end pages under app/auth

## Tech Stack
- **Framework**: Next.js 13
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Prisma ORM (with migrations)
- **Build Tooling**: PostCSS, ESLint
- **Utilities**: Custom hooks, UI components, and more

## Project Structure
Below is a simplified overview of the folder structure. Files of note are highlighted.