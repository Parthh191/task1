import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Home from './pages/Home';
import PostDetail from './pages/PostDetail';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Router>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen px-2 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-8 max-w-7xl mx-auto"
      >
        <header className="mb-4 sm:mb-8">
          <motion.nav 
            className="flex justify-between items-center"
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.h1 
              className="text-2xl sm:text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
              whileHover={{ scale: 1.05 }}
            >
              Blog App
            </motion.h1>
          </motion.nav>
        </header>

        <main className="container mx-auto">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/post/:id" element={<PostDetail />} />
            </Routes>
          </AnimatePresence>
        </main>

        <footer className="mt-8 sm:mt-16 text-center text-gray-400">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-sm sm:text-base"
          >
            © {new Date().getFullYear()} Blog App. All rights reserved.
          </motion.p>
        </footer>
      </motion.div>
    </Router>
    </>
  )
}

export default App
