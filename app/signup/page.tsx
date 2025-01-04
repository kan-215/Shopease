"use client";

import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import './signup.css';

export default function SignupPage() {
  const { signup, loginWithEmail, resetPassword } = useAuth();
  const router = useRouter();

  const [isLogin, setIsLogin] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState(''); // for reset password
  const [error, setError] = useState('');
  const [resetPasswordMode, setResetPasswordMode] = useState(false); // toggle for reset password

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      if (isLogin) {
        const result = await loginWithEmail(email, password);
        if (result) {
          setError(result);
        } else {
          router.push('/profile');
        }
      } else {
        const result = await signup(firstName, lastName, email, password, 'user');
        if (result) {
          setError(result);
        } else {
          alert('Sign up successful! Redirecting to login...');
          setIsLogin(true);
        }
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  const handleResetPassword = async () => {
    if (!email || !newPassword) {
      setError('Please provide email and new password.');
      return;
    }
    const result = await resetPassword(email, newPassword);
    if (result) {
      setError(result);
    } else {
      alert('Password reset successful!');
      setIsLogin(true);
    }
  };

  return (
    <div className="form-container">
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSubmit} className="signup-form">
        {!isLogin && (
          <>
            <div className="input-field">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="input-field">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
          </>
        )}
        <div className="input-field">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-field">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {!resetPasswordMode ? (
          <button type="submit">{isLogin ? 'Log In' : 'Sign Up'}</button>
        ) : (
          <>
            <div className="input-field">
              <label htmlFor="newPassword">New Password</label>
              <input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <button type="button" onClick={handleResetPassword}>Reset Password</button>
          </>
        )}
      </form>

      {isLogin ? (
        <>
          <p>Don't have an account? <span onClick={toggleForm}>Sign up</span></p>
          <p><span onClick={() => setResetPasswordMode(true)} className="form-link">Forgot Password?</span></p>
        </>
      ) : (
        <p>Already have an account? <span onClick={toggleForm}>Log in</span></p>
      )}
    </div>
  );
}
