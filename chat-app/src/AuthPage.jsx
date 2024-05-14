import axios from 'axios';
import React from 'react';

const AuthPage = (props) => {
  const onSubmit = (e) => {
    e.preventDefault();
    const username = e.target.elements.username.value;

    axios.post('http://localhost:3001/authenticate', {
      username: username,
      secret: username // Assuming the secret is the username for simplicity
    })
    .then(response => {
      // Assuming 'response.data' contains the necessary user data and 'secret'
      props.onAuth({ ...response.data, secret: username });
    })
    .catch(error => {
      // More robust error handling
      if (error.response) {
        // Server responded with a status code outside the 2xx range
        console.error('Authentication failed:', error.response.data);
        alert(`Authentication failed: ${error.response.data.error}`);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error:', error.message);
        alert('Authentication failed. Please try again later.');
      }
    });
  };

  return (
    <div className="background">
      <form onSubmit={onSubmit} className="form-card">
        <div className="form-title">Welcome 👋</div>
        <div className="form-subtitle">Set a username to get started</div>
        <div className="auth">
          <div className="auth-label">Username</div>
          <input className="auth-input" name="username" />
          <button className="auth-button" type="submit">
            Enter
          </button>
        </div>
      </form>
    </div>
  );
};

export default AuthPage;
