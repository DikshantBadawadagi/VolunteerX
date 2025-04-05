import { Link } from 'react-router-dom'
import { Button } from './ui/button'

const SignupSelection = () => {
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
          <h2 className='text-3xl font-bold text-green-600 mb-2'>Get Started</h2>
          <p className="text-gray-600">Choose your registration type</p>
        </div>

        <Link to="/ngo/signup" className="w-full transform transition-transform hover:scale-105">
          <Button className="w-full bg-green-600 hover:bg-green-700 text-lg py-6 shadow-lg">
            Register as NGO
          </Button>
        </Link>

        <Link to="/volunteer/signup" className="w-full transform transition-transform hover:scale-105">
          <Button className="w-full bg-green-600 hover:bg-green-700 text-lg py-6 shadow-lg">
            Register as Volunteer
          </Button>
        </Link>

        <p className="text-center text-gray-600 mt-4">
          Already have an account? 
          <Link to="/login" className="text-green-600 hover:text-green-700 ml-1 font-semibold">
            Login here
          </Link>
        </p>
      </div>
    </div>
  )
}

export default SignupSelection
