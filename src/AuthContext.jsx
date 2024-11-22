import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types'; // Import PropTypes
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    token: null,
    isLoggedIn: false,
  });
  const [error, setError] = useState(null); // 添加一个状态来存储错误信息
  const [isLoading, setIsLoading] = useState(true); // 添加 isLoading 状态
  const navigate = useNavigate();

  // 初始化本地认证信息
  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      setAuthState({ token: authToken, isLoggedIn: true });
    }
    setIsLoading(false);
  }, []);

  const login = async credentials => {
    try {
      // 这里替换成您的登录API
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        setAuthState({ token: data.token, isLoggedIn: true });
        localStorage.setItem('authToken', data.token); // 保存令牌到 localStorage
        navigate('/dashboard'); // Navigate to the dashboard
      } else {
        // 获取状态码和状态文本
        const statusText = response.statusText;
        const statusCode = response.status;
        setError(`登录失败: ${statusCode} ${statusText}`);
      }
      // 保存 token 和登录状态
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  };

  const cleanToken = () => {
    setAuthState({ token: null, isLoggedIn: false });
    localStorage.removeItem('authToken'); // 清除 localStorage 中的令牌
  };

  return (
    <AuthContext.Provider
      value={{ ...authState, login, cleanToken, error, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
// Define PropTypes for PrivateRoute
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired, // 'children' should be a React node
};
export const useAuth = () => useContext(AuthContext);
