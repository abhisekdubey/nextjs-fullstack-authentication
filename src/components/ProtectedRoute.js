import React, { useEffect } from 'react'
import { useRouter } from 'next/router';
import { isAuthenticated } from '../utils/auth';


const ProtectedRoute = ({ children }) => {

    const router = useRouter();

    useEffect(() => {
        // Check if the user is authenticated
        if (!isAuthenticated()) {
            // Redirect to the login page if not authenticated
            router.push('/login');
        }
    }, []);


    return isAuthenticated() ? children : null
}

export default ProtectedRoute;