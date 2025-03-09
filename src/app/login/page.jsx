'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  FaUser, 
  FaLock, 
  FaEnvelope, 
  FaEye, 
  FaEyeSlash 
} from 'react-icons/fa';
import axios from 'axios'

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();


  const handleSubmit = async(e) => {
    e.preventDefault();
    // Add login logic here'
    const resp = await axios.post("http://localhost:3000/register/doctor/login",{
      email:email,
      password:password

    })
    if(resp?.status==200)
      {
        router.push('/dashboard');
        localStorage.setItem('token',resp?.data?.datoa);
      }
    console.log("resp",resp);
    console.log('Login attempt:', { email, password });

  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-2xl rounded-2xl w-full max-w-md p-8 space-y-6"
      >
        <div className="text-center">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
            Welcome Back
          </h1>
          <p className="text-gray-500">Enter your credentials to access your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaEnvelope className="text-gray-400" />
            </div>
            <input 
              type="email" 
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-3 border border-gray-300  text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaLock className="text-gray-400" />
            </div>
            <input 
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full pl-10 pr-12 py-3 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-blue-500 transition"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="remember"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label 
                htmlFor="remember" 
                className="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>
            <Link 
              href="/forgot-password" 
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Forgot Password?
            </Link>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg hover:opacity-90 transition duration-300 font-bold"
          >
            Sign In
          </motion.button>
        </form>

        <div className="text-center">
          <p className="text-gray-600">
            Don't have an account? {' '}
            <Link 
              href="/signup" 
              className="text-blue-600 hover:text-blue-800 font-semibold"
            >
              Sign Up
            </Link>
          </p>
        </div>

        {/* <div className="flex items-center justify-center space-x-4 mt-6">
          <div className="h-px bg-gray-300 w-full"></div>
          <span className="text-gray-500">or</span>
          <div className="h-px bg-gray-300 w-full"></div>
        </div> */}

        {/* <div className="grid grid-cols-2 gap-4 mt-6">
          <button className="flex items-center justify-center bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition">
            <FaUser className="mr-2" /> Google
          </button>
          <button className="flex items-center justify-center bg-blue-700 text-white py-2 rounded-lg hover:bg-blue-800 transition">
            <FaUser className="mr-2" /> Facebook
          </button>
        </div> */}
      </motion.div>
    </div>
  );
}
