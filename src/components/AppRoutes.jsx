import React from 'react';
import LoginForm from './LoginForm.jsx'; // 路径根据你的项目结构调整
import Dashboard from './Dashboard.jsx';
import { Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from './PrivateRoute.jsx';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginForm />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      {/* 默认路由: 当访问根路径时重定向到登录 */}
      <Route path="/" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default AppRoutes;
