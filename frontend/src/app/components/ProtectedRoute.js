import { useEffect } from 'react';
import { useRouter } from 'next/navigation'

export const ProtectedRoute = ({ children }) => {
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.replace('/login'); // Redirect to login if no token
        }
    }, []);

    return children;
};