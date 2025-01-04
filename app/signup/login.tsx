// app/login/page.tsx
"use client"; // Make sure the file is client-side

import { useState } from 'react';
import { useAuth } from '../../context/AuthContext'; // Your context
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { loginWithEmail } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(''); // Clear previous errors

    const success = await handleLogin(email, password);
    if (success) {
      router.push('/profile'); // Redirect to profile page
    } else {
      setErrorMessage('Invalid login details. Please try again.');
    }
  };

  const handleLogin = async (email: string, password: string) => {
    // Simulate an API call (replace this with your actual API logic)
    return new Promise((resolve) => {
      setTimeout(() => {
        loginWithEmail(email, password, 'user'); // Simulate successful login
        resolve(true); // Simulate success
      }, 1000);
    });
  };

  return (
    <section style={{ textAlign: 'center', margin: '20px' }}>
      <h1>Log In</h1>

      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Log In</button>
      </form>

      <p>
        Don't have an account?{' '}
        <a href="/signup" style={{ color: 'var(--orange)' }}>
          Sign up here
        </a>
      </p>
    </section>
  );
}
