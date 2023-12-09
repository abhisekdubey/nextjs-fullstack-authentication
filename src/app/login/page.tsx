"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';
import toast, { Toaster } from 'react-hot-toast';

const LoginPage = () => {

    const router = useRouter()
    const [user, setUser] = useState({
        email: '',
        password: '',
    })

    const [buttonDisabled, setButtonDisabled] = useState(true)
    const [loading, setLoading] = useState(false)

    const onLogin = async () => {
        try {
            setLoading(true)
            const response = await axios.post("/api/users/login", user)
            console.log("login success", response.data)
            toast.success(response.data.message)
            router.push("/profile")
        } catch (error: any) {
            toast.error(error.message)
            setLoading(false)
            console.log("Login Failed", error.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false)
        } else {
            setButtonDisabled(true)
        }

        return () => {

        }
    }, [user])

    return (
        <div className='flex flex-col items-center justify-center min-h-screen py-2'>
            <h1>{loading ? "Processing" : "Login"}</h1>
            <hr />
            <label htmlFor="email">email</label>
            <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                id="email"
                type="text"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder="email"
            />
            <label htmlFor="password">password</label>
            <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                id="password"
                type="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                placeholder="password"
            />
            <button
                disabled={buttonDisabled ? true : false}
                onClick={onLogin}
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">{buttonDisabled ? "No Login" : "Login"}</button>
            <Link href="/signup">Visit Signup page</Link>
            <Toaster />
        </div>
    )
}

export default LoginPage;