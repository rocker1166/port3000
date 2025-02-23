"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const RedirectPage = () => {
  const router = useRouter();

  useEffect(() => {
    const fetchUserIdAndRedirect = async () => {
      try {
        const userIdResponse = await fetch('/api/userid');
        const { currentUser, userId } = await userIdResponse.json();

        if (!currentUser) {
          throw new Error('User ID not found');
        }

        const objectId = localStorage.getItem('documentId');
        const userData = { currentUser };

        const response = await fetch('/api/updateUser', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            objectId: objectId,
            userData,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to update user data');
        }

        router.push('/dashboard');
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