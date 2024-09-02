import { useState } from 'react';
import { useRouter } from 'next/navigation';

// Define the interface for login parameters
interface RegParams {
  firstName: string;
  secondName: string;
  email: string;
  password: string;
}

// Custom hook for handling user registration
const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const register = async (form: RegParams) => {
    const { firstName, secondName, email, password } = form;
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/auth/register", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstName, secondName, email, password }),
      });

      if (!response.ok) {
        // Assuming the response may have error details
        const errorData = await response.json();
        throw new Error(errorData.message || 'User already exists!');
      }

      const data = await response.json();
      console.log(data);
      setSuccess(true);
      setTimeout(() => {
        router.replace("/login");
      }, 3000)
    } catch (err) {
      setError(err.message || "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  return { register, loading, error, success };
};

export default useRegister;
