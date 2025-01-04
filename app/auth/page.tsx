'use client'; // Mark this file as a client-side component

import { useState } from 'react';
import { useAuth } from '../../context/AuthContext'; // Assuming you still use the same AuthContext
import { useRouter } from 'next/router';

export default function ProfilePage() {
  const [isSignup, setIsSignup] = useState(true);
  const [role, setRole] = useState<'admin' | 'user'>('user');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const { loginWithEmail } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSignup) {
      // Handle signup logic
      console.log(`Signing up as ${role} with email: ${email}`);
      // Add signup logic (e.g., call a signup API)
    } else {
      // Log in and set user role
      await loginWithEmail(email, password, role);
      // Redirect user based on role
      if (role === 'admin') {
        router.push('/admin'); // Admin dashboard
      } else {
        router.push('/profile'); // Regular user profile
      }
    }
  };

  return (
    <section style={{ textAlign: 'center', margin: '20px' }}>
      <h1>{isSignup ? 'Create an Account' : 'Welcome Back'}</h1>
      <form
        style={{ maxWidth: '400px', margin: '20px auto', textAlign: 'left' }}
        onSubmit={handleSubmit}
      >
        {isSignup && (
          <div>
            <label htmlFor="fullName" style={labelStyle}>
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="John Doe"
              style={inputStyle}
              required
            />
          </div>
        )}

        <div>
          <label htmlFor="email" style={labelStyle}>
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@domain.com"
            style={inputStyle}
            required
          />
        </div>
        <div>
          <label htmlFor="password" style={labelStyle}>
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="********"
            style={inputStyle}
            required
          />
        </div>

        {/* Role selection */}
        {isSignup && (
          <div>
            <label style={labelStyle}>Role</label>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <label>
                <input
                  type="radio"
                  name="role"
                  value="user"
                  checked={role === 'user'}
                  onChange={() => setRole('user')}
                  style={{ marginRight: '10px' }}
                />
                User
              </label>
              <label>
                <input
                  type="radio"
                  name="role"
                  value="admin"
                  checked={role === 'admin'}
                  onChange={() => setRole('admin')}
                  style={{ marginRight: '10px' }}
                />
                Admin
              </label>
            </div>
          </div>
        )}

        <button type="submit" style={buttonStyle}>
          {isSignup ? 'Sign Up' : 'Log In'}
        </button>
      </form>

      <p style={{ marginTop: '20px' }}>
        {isSignup
          ? 'Already have an account?'
          : "Don't have an account?"}{' '}
        <a href="#" onClick={() => setIsSignup(!isSignup)} style={linkStyle}>
          {isSignup ? 'Log In' : 'Sign Up'}
        </a>
      </p>
    </section>
  );
}

const labelStyle = {
  display: 'block',
  marginBottom: '8px',
  fontSize: '16px',
  fontWeight: 'bold',
  color: 'white',
};

const inputStyle = {
  width: '100%',
  padding: '10px',
  marginBottom: '15px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  fontSize: '16px',
};

const buttonStyle = {
  width: '100%',
  padding: '10px',
  backgroundColor: 'var(--blue)',
  color: 'white',
  fontSize: '16px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

const linkStyle = {
  color: 'var(--orange)',
  textDecoration: 'none',
};
