import { Link } from 'react-router-dom'
import { Button } from './ui/button'

const LoginSelection = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 relative overflow-hidden flex items-center justify-center">
      {/* Animated shapes */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute animate-blob mix-blend-multiply filter blur-xl opacity-70 animate-delay-2000 bg-green-300 top-0 -left-4 w-72 h-72 rounded-full"></div>
        <div className="absolute animate-blob mix-blend-multiply filter blur-xl opacity-70 animate-delay-4000 bg-blue-300 -bottom-8 left-20 w-72 h-72 rounded-full"></div>
        <div className="absolute animate-blob mix-blend-multiply filter blur-xl opacity-70 bg-pink-300 -right-4 bottom-0 w-72 h-72 rounded-full"></div>
      </div>

      {/* Main content */}
      <div className='relative z-10 shadow-xl p-8 rounded-2xl flex flex-col gap-6 bg-white/80 backdrop-blur-sm max-w-md w-full mx-4'>
        <div className="text-center mb-8">
          <h2 className='text-3xl font-bold text-green-600 mb-2'>Welcome Back!</h2>
          <p className="text-gray-600">Choose your login type to continue</p>
        </div>

        <Link to="/ngo/login" className="w-full transform transition-transform hover:scale-105">
          <Button className="w-full bg-green-600 hover:bg-green-700 text-lg py-6 shadow-lg">
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            Login as NGO
          </Button>
        </Link>

        <Link to="/volunteer/login" className="w-full transform transition-transform hover:scale-105">
          <Button className="w-full bg-green-600 hover:bg-green-700 text-lg py-6 shadow-lg">
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Login as Volunteer
          </Button>
        </Link>

        <p className="text-center text-gray-600 mt-4">
          Don't have an account? 
          <Link to="/signup" className="text-green-600 hover:text-green-700 ml-1 font-semibold">
            Register here
          </Link>
        </p>
      </div>
    </div>
  )
}

export default LoginSelection
