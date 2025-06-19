# Task1 - React Blog Application

A modern React blog application built with Vite, React Router, and Tailwind CSS.

## Features

- Modern React development with Vite
- Responsive design with Tailwind CSS
- Blog post management
- Comments functionality
- Dynamic routing with React Router
- Smooth animations with Framer Motion
- API integration with Axios
- Date formatting with Day.js

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

## Getting Started

1. Clone the repository
```bash
git clone <repository-url>
cd task1
```

2. Install dependencies
```bash
npm install
```

3. Start the JSON server (in a separate terminal)
```bash
npm run server
```
This will start the mock backend server at `http://localhost:3001`

4. Start the development server (in another terminal)
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint to check code quality
- `npm run server` - Start the JSON server for the mock backend

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/         # Page components
├── service/       # API and other services
├── assets/        # Static assets
└── App.jsx        # Main application component
```

## Technologies Used

- [React](https://react.dev/) - UI Library
- [Vite](https://vitejs.dev/) - Build Tool
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [React Router](https://reactrouter.com/) - Routing
- [Framer Motion](https://www.framer.com/motion/) - Animations
- [Axios](https://axios-http.com/) - HTTP client
- [Day.js](https://day.js.org/) - Date formatting

## Contributing

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.
