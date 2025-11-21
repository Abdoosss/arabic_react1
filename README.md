# Arabic Furniture Website - My Break & Ghassanko

A modern, responsive Arabic furniture brand website built with React and Tailwind CSS.

## Features

- **RTL Layout**: Fully Arabic interface with right-to-left text direction
- **Two Brands**: My Break (main focus) and Ghassanko (secondary)
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Modern UI**: Clean design with mauve (#8E7AB5) and white color scheme
- **Animations**: Smooth scroll animations using Framer Motion
- **Image Sliders**: Product galleries using Swiper.js
- **Authentication**: User registration and login with Local Storage
- **Admin Dashboard**: Full CRUD operations for products and content management
- **Booking System**: Contact forms and booking modals instead of e-commerce checkout

## Tech Stack

- React 18
- Tailwind CSS
- React Router DOM
- Framer Motion
- Swiper.js
- React Toastify
- Zustand (State Management)
- Local Storage for data persistence

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Admin Access

- Email: admin@mybreak.com
- Password: Admin123!

## Project Structure

```
src/
├── assets/          # Images and static files
├── components/      # Reusable UI components
├── pages/          # Page components
├── context/        # React Context for state management
├── utils/          # Utility functions
├── data/           # Static data files
├── App.js          # Main app component
└── index.js        # Entry point
```

## Pages

- **Home**: Hero section, product highlights, brand sections
- **Products**: Grid view of all products with filtering
- **Product Details**: Individual product pages with image galleries
- **About**: Brand story and information
- **Contact**: Contact form and location map
- **Login/Register**: User authentication
- **Dashboard**: Admin panel for content and product management

## Arabic Fonts

The website uses Tajawal and Cairo fonts from Google Fonts for elegant Arabic typography.

## Customization

- Colors can be modified in `tailwind.config.js`
- Product data is stored in `src/data/products.json`
- Arabic text content can be updated in individual components