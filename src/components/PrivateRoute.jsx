import PropTypes from 'prop-types'; // Import PropTypes

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { TailSpin } from 'react-loader-spinner';

const PrivateRoute = ({ children }) => {
  const { isLoggedIn, isLoading } = useAuth();
  // 如果仍在加载状态，可以显示加载指示器或返回 null
  if (isLoading) {
    return <TailSpin color="#00BFFF" height={80} width={80} />;
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return children;
};

// Define PropTypes for PrivateRoute
PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired, // 'children' should be a React node
};

export default PrivateRoute;
