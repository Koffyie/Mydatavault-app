// src/Login.js
import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  return (
    <div style={{
      minHeight: '60vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px'
    }}>
      <h2>Sign in with Google</h2>
      <p style={{ color: '#666', marginBottom: '20px' }}>
        Manage your data connections and privacy preferences
      </p>

      <GoogleLogin
        onSuccess={credentialResponse => {
          console.log('Google response:', credentialResponse);
          
          // Save user info to localStorage
          localStorage.setItem('user', JSON.stringify(credentialResponse));
          localStorage.setItem('isLoggedIn', 'true');
          
          // Clear any previous errors
          setError(null);
          
          // Redirect to MyData Wallet after 1 second (for visual feedback)
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
  );
}

export default Login;
