import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../index.css'

export function Homepage(){
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Top Bar Section */}
      <header className="py-4 px-6 bg-white shadow-md flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">DailyChits</h1>
        <nav>
          <ul className="flex space-x-2 md:space-x-4">
            <li><Link to="/signup" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-2 md:py-2 md:px-4 rounded-lg transition duration-300 text-xs">Sign Up</Link></li>
            <li><Link to="/signin" className="bg-blue-500 hover:bg-blue-600 text-white  py-2 px-2 md:py-2 md:px-4 rounded-lg transition duration-300 text-xs ">Sign In</Link></li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-6 md:px-20">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-5xl font-bold text-gray-800 mb-4"
          >
            Track Your Daily Progress and Important Notes
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-lg text-gray-600 mb-8"
          >
            DailyChits helps you record your daily achievements, learnings, and important notes securely.
          </motion.p>
          <Link to="/signup" className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-8 rounded-lg text-lg transition duration-300 inline-block">
            Get Started
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="bg-gray-200 py-20 px-6 md:px-20">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl font-bold text-gray-800 mb-4"
          >
            What We Offer
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-lg text-gray-600 mb-8"
          >
            DailyChits provides a simple yet powerful platform to:
          </motion.p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-6 rounded-lg bg-white shadow-md"
            >
              <h3 className="text-2xl font-bold mb-4">Track Daily Progress</h3>
              <p className="text-gray-700">Write and store your daily progress, learnings, and achievements. Reflect and review your productivity over time.</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-6 rounded-lg bg-white shadow-md"
            >
              <h3 className="text-2xl font-bold mb-4">Store Important Notes</h3>
              <p className="text-gray-700">Save important notes and reminders securely. Organize and access them anytime, anywhere.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 md:px-20">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl font-bold text-gray-800 mb-8"
          >
            Key Features
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-6 rounded-lg bg-white shadow-md"
            >
              <h3 className="text-2xl font-bold mb-4">Simple and Intuitive Interface</h3>
              <p className="text-gray-700">Easy-to-use interface designed for seamless daily logging and note-taking.</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-6 rounded-lg bg-white shadow-md"
            >
              <h3 className="text-2xl font-bold mb-4">Secure and Private</h3>
              <p className="text-gray-700">Your data is securely stored and accessible only to you. Privacy and data protection are our top priorities.</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-6 rounded-lg bg-white shadow-md"
            >
              <h3 className="text-2xl font-bold mb-4">Customizable Cards</h3>
              <p className="text-gray-700">Create and customize cards for different types of entries. Mark cards as important for easy access.</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-6 rounded-lg bg-white shadow-md"
            >
              <h3 className="text-2xl font-bold mb-4">Mobile Friendly</h3>
              <p className="text-gray-700">Access DailyChits on-the-go with our responsive design. Works seamlessly on all devices.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Sign Up Section */}
      <section id="signup" className="bg-gray-200 py-20 px-6 md:px-20">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl font-bold text-gray-800 mb-8"
          >
            Sign Up Now
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-lg text-gray-600 mb-8"
          >
            Join thousands of users who are improving their productivity and organization with DailyChits.
          </motion.p>
          <Link to="/signup" className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-8 rounded-lg text-lg transition duration-300 inline-block">
            Get Started
          </Link>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-gray-300 text-center py-6">
        <p>&copy; 2024 DailyChits. All rights reserved.</p>
      </footer>
    </div>
  );
};

