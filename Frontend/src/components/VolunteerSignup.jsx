import { useState } from 'react'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import axios from 'axios'
import { toast } from 'sonner'
import { Link, useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'

const VolunteerSignup = () => {
    const [input, setInput] = useState({
        name: "",
        email: "",
        password: "",
        dob: "",
        gender: "",
        location: "",
        skills: "",
        about: ""
    })
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const signupHandler = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            // Format skills from comma-separated string to array
            const formattedData = {
                ...input,
                skills: input.skills.split(',').map(skill => skill.trim()),
                dob: new Date(input.dob).toISOString()
            }

            const res = await axios.post('http://localhost:3000/api/v1/volunteer/register', formattedData, {
                headers: { 'Content-Type': 'application/json' }
            })
            if (res.data.success) {
                navigate("/volunteer/login")
                toast.success(res.data.message)
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Registration failed')
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

            <form onSubmit={signupHandler} className='relative z-10 shadow-xl p-8 bg-white/80 backdrop-blur-sm rounded-2xl max-w-4xl mx-4'>
                <div className="text-center mb-6">
                    <h2 className='text-3xl font-bold text-green-600'>Volunteer Registration</h2>
                    <p className="text-gray-600">Join our community</p>
                </div>

                <div className="grid grid-cols-2 gap-6">
                    {/* Left Column */}
                    <div className="space-y-4">
                        <div>
                            <span className='font-medium'>Full Name</span>
                            <Input
                                type="text"
                                value={input.name}
                                onChange={(e) => setInput({ ...input, name: e.target.value })}
                                className="focus-visible:ring-green-600 border-gray-200"
                                required
                            />
                        </div>

                        <div>
                            <span className='font-medium'>Email</span>
                            <Input
                                type="email"
                                value={input.email}
                                onChange={(e) => setInput({ ...input, email: e.target.value })}
                                className="focus-visible:ring-green-600 border-gray-200"
                                required
                            />
                        </div>

                        <div>
                            <span className='font-medium'>Password</span>
                            <Input
                                type="password"
                                value={input.password}
                                onChange={(e) => setInput({ ...input, password: e.target.value })}
                                className="focus-visible:ring-green-600 border-gray-200"
                                required
                            />
                        </div>

                        <div>
                            <span className='font-medium'>Date of Birth</span>
                            <Input
                                type="date"
                                value={input.dob}
                                onChange={(e) => setInput({ ...input, dob: e.target.value })}
                                className="focus-visible:ring-green-600 border-gray-200"
                                required
                            />
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-4">
                        <div>
                            <span className='font-medium'>Gender</span>
                            <Select onValueChange={(value) => setInput({ ...input, gender: value })}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select gender" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="male">Male</SelectItem>
                                    <SelectItem value="female">Female</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <span className='font-medium'>Location</span>
                            <Input
                                type="text"
                                value={input.location}
                                onChange={(e) => setInput({ ...input, location: e.target.value })}
                                className="focus-visible:ring-green-600 border-gray-200"
                                required
                            />
                        </div>

                        <div>
                            <span className='font-medium'>Skills</span>
                            <Input
                                type="text"
                                value={input.skills}
                                onChange={(e) => setInput({ ...input, skills: e.target.value })}
                                className="focus-visible:ring-green-600 border-gray-200"
                                placeholder="e.g. teaching, first aid (comma separated)"
                                required
                            />
                        </div>

                        <div>
                            <span className='font-medium'>About</span>
                            <Textarea
                                value={input.about}
                                onChange={(e) => setInput({ ...input, about: e.target.value })}
                                className="focus-visible:ring-green-600 border-gray-200 h-20"
                                required
                            />
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between mt-6">
                    <Link to="/signup" className='text-green-600 hover:text-green-700 font-semibold'>
                        ← Back to selection
                    </Link>
                    <Button type='submit' disabled={loading} className="bg-green-600 hover:bg-green-700">
                        {loading ? <><Loader2 className='mr-2 h-5 w-5 animate-spin' /> Please wait</> : 'Register'}
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default VolunteerSignup
