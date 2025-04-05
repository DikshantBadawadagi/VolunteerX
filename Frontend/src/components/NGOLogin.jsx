import { useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import axios from 'axios'
import { toast } from 'sonner'
import { Link, useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { setAuthUser } from '@/redux/authSlice'

const NGOLogin = () => {
    const [input, setInput] = useState({ email: "", password: "" })
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const loginHandler = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            const res = await axios.post('http://localhost:3000/api/v1/ngo/login', input, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            })
            if (res.data.success) {
                dispatch(setAuthUser(res.data.ngo))
                navigate("/")
                toast.success(res.data.message)
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Login failed')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 relative overflow-hidden flex items-center justify-center">
            {/* Animated shapes */}
            <div className="absolute inset-0 w-full h-full">
                <div className="absolute animate-blob mix-blend-multiply filter blur-xl opacity-70 animate-delay-2000 bg-green-300 top-0 -left-4 w-72 h-72 rounded-full"></div>
                <div className="absolute animate-blob mix-blend-multiply filter blur-xl opacity-70 animate-delay-4000 bg-blue-300 -bottom-8 left-20 w-72 h-72 rounded-full"></div>
                <div className="absolute animate-blob mix-blend-multiply filter blur-xl opacity-70 bg-pink-300 -right-4 bottom-0 w-72 h-72 rounded-full"></div>
            </div>

            {/* Main content */}
            <form onSubmit={loginHandler} className='relative z-10 shadow-xl flex flex-col gap-6 p-8 bg-white/80 backdrop-blur-sm rounded-2xl max-w-md w-full mx-4'>
                <div className="text-center space-y-2">
                    <h2 className='text-3xl font-bold text-green-600'>NGO Login</h2>
                    <p className="text-gray-600">Welcome back! Please enter your details</p>
                </div>
                
                <div className="space-y-2">
                    <span className='font-medium text-gray-700'>Email</span>
                    <Input
                        type="email"
                        name="email"
                        value={input.email}
                        onChange={(e) => setInput({ ...input, email: e.target.value })}
                        className="focus-visible:ring-green-600 border-gray-200"
                        placeholder="Enter your email"
                    />
                </div>

                <div className="space-y-2">
                    <span className='font-medium text-gray-700'>Password</span>
                    <Input
                        type="password"
                        name="password"
                        value={input.password}
                        onChange={(e) => setInput({ ...input, password: e.target.value })}
                        className="focus-visible:ring-green-600 border-gray-200"
                        placeholder="Enter your password"
                    />
                </div>

                <Button type='submit' disabled={loading} 
                    className="bg-green-600 hover:bg-green-700 text-lg py-6">
                    {loading ? <><Loader2 className='mr-2 h-5 w-5 animate-spin' /> Please wait</> : 'Login'}
                </Button>

                <div className="text-center space-y-2">
                    <Link to="/login" className='text-green-600 hover:text-green-700 font-semibold'>
                        ← Back to selection
                    </Link>
                    <p className="text-gray-600">
                        Don't have an account? 
                        <Link to="/ngo/signup" className="text-green-600 hover:text-green-700 ml-1 font-semibold">
                            Register here
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    )
}

export default NGOLogin
