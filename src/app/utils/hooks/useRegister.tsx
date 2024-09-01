

import { useState } from 'react';
import { useRouter } from 'next/navigation';

// Custom hook for handling user login
const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();


  interface logins {
    email: string,
    password: string
  }

  const login = async (firstName, secondName, email, password) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/auth/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstName, secondName, email, password }),
      });

      if (!response.ok) {
        setSuccess(false);
        throw new Error('User already exists!');
      }

      const data = await response.json();
      setSuccess(true);
      router.replace("/login");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error, success };
};

export default useRegister;
