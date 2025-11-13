// src/Login.js
import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  return (
    <>
      {/* Overlay for darkening/focusing techy background */}
      <div className="background-overlay" />

      <div className="page-content"
        style={{
          minHeight: '80vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        {/* Centered Login Card */}
        <div
          style={{
            background: '#fff',
            borderRadius: '14px',
            boxShadow: '0 8px 32px rgba(25,118,210,0.18)',
            padding: '42px 32px 32px 32px',
            minWidth: '340px',
            maxWidth: '400px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          {/* App Title */}
          <h1
            style={{
              fontSize: '2.6rem',
              fontWeight: 800,
              margin: 0,
              letterSpacing: '1px',
              color: '#1976d2',
            }}
          >
            MyDataHub
          </h1>
          {/* Slogan */}
          <p
            style={{
              fontSize: '1.2rem',
              color: '#333',
              margin: '8px 0 28px 0',
              fontWeight: 500,
              textAlign: 'center',
              letterSpacing: '0.2px'
            }}
          >
            Control your data. Know your rights.
          </p>

          {/* Login Prompt & Button */}
          
          

          <GoogleLogin
            onSuccess={credentialResponse => {
              console.log('Google response:', credentialResponse);

              // Save user info to localStorage
              localStorage.setItem('user', JSON.stringify(credentialResponse));
              localStorage.setItem('isLoggedIn', 'true');

              // Clear previous errors
              setError(null);

              // Redirect to MyData Wallet after 1 second (visual feedback)
              setTimeout(() => {
                navigate('/wallet');
              }, 1000);
            }}
            onError={() => {
              console.log('Login Failed');
              setError('Login failed. Please try again.');
            }}
          />
          {error && (
            <p style={{ color: 'red', marginTop: '20px' }}>
              {error}
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default Login;
