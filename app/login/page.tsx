'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { Mail, Lock, ArrowRight, Loader } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        toast.error(data.error || 'Login failed')
        return
      }

      // Store token in localStorage
      localStorage.setItem('authToken', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      
      toast.success('Login successful!')
      
      // Redirect based on role
      if (data.user.role === 'SUPER_ADMIN') {
        router.push('/super-admin/dashboard')
      } else if (data.user.role === 'SCHOOL_ADMIN' || data.user.role === 'TEACHER') {
        router.push('/admin/dashboard')
      } else {
        router.push('/dashboard')
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 flex items-center justify-center px-4">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Card */}
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-2xl p-8 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
              CBT Pro
            </div>
            <h1 className="text-2xl font-bold mb-2">Welcome Back</h1>
            <p className="text-slate-400">Sign in to your account to continue</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-slate-700/80 transition"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-slate-700/80 transition"
                />
              </div>
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end">
              <Link
                href="/forgot-password"
                className="text-sm text-blue-400 hover:text-blue-300 transition"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg py-3 font-semibold flex items-center justify-center gap-2 transition transform hover:scale-105"
            >
              {loading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          {/* Demo Info */}
          <div className="mt-6 p-4 bg-slate-700/30 rounded-lg border border-slate-700">
            <p className="text-xs text-slate-400 mb-2 font-semibold">DEMO CREDENTIALS:</p>
            <p className="text-xs text-slate-300">
              Student: student@demo.com / password123
            </p>
            <p className="text-xs text-slate-300">
              Admin: admin@demo.com / password123
            </p>
          </div>

          {/* Sign Up Link */}
          <p className="text-center text-slate-400 mt-6">
            Don't have an account?{' '}
            <Link href="/signup" className="text-blue-400 hover:text-blue-300 font-semibold transition">
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
