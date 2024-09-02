import { useState } from 'react';
import useAuthStore from '../store/Authstore';
import { User } from "../store/Authstore"
// Custom hook for handling user login
const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const { setUser } = useAuthStore();

  interface Logins {
    email: string;
    password: string;
  }

  interface ApiUser {
    _id: string;
    firstName: string;
    secondName: string;
    email: string;
    created: string;
  }

  const login = async (loginForm: Logins) => {
    const { email, password } = loginForm;
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/auth/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'An unknown error occurred');
      }

      const data = await response.json();
      const apiUser: ApiUser = data.user;

      //API response object to match the User interface 
      const user: User = {
        id: apiUser._id,
        firstName: apiUser.firstName,
        secondName: apiUser.secondName,
        email: apiUser.email,
      };

      // Set user in the Zustand store
      setUser(user);
      setSuccess(true);
      localStorage.setItem('authToken', data.token);
    } catch (err: any) {
      setError(err.message || 'An error occurred during login');
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error, success };
};

export default useLogin;
