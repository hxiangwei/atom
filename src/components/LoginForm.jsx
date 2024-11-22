import React, { useState, useEffect } from 'react';
import { useAuth } from '../AuthContext.jsx';
import '../css/LoginForm.css';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  const { isLoggedIn, isLoading, login, error } = useAuth();
  const navigate = useNavigate();
  const handleChange = e => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/dashboard');
    }
  }, [isLoggedIn, navigate]);

  const handleSubmit = async e => {
    e.preventDefault();
    await login(credentials);
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2 className="form-title">Login</h2>
        <div className="input-group">
          <label htmlFor="username">用户名:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={credentials.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">密码:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" disabled={isLoading} className="login-button">
          登录
        </button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default LoginForm;
