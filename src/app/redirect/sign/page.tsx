"use client"
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { doc, setDoc , getDoc } from 'firebase/firestore';
import { db } from '@/lib/db/firebase';

const RedirectPage = () => {
    const router = useRouter();

    useEffect(() => {
        const fetchUserIdAndRedirect = async () => {
            try {
                const response = await fetch('/api/userid');
                const data = await response.json();
                const userId = data.userId;

                if (!userId) {
                    throw new Error('User ID not found');
                }

                if (userId) {
                    const userDoc = await getDoc(doc(db, 'users', userId));
                 
                   if(userDoc.data()?.userType === 'seller'){
                    router.push('/dashboard');
                }

                else{
                    router.push('/buy');
                }
                }
            } catch (error) {
                console.error('Error fetching user ID or redirecting:', error);
            }
        };

        fetchUserIdAndRedirect();
    }, [router]);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div className="spinner"></div>
            <style jsx>{`
                .spinner {
                    border: 4px solid rgba(0, 0, 0, 0.1);
                    width: 36px;
                    height: 36px;
                    border-radius: 50%;
                    border-left-color: #09f;
                    animation: spin 1s ease infinite;
                }

                @keyframes spin {
                    0% {
                        transform: rotate(0deg);
                    }
                    100% {
                        transform: rotate(360deg);
                    }
                }
            `}</style>
        </div>
    );
};

export default RedirectPage;
