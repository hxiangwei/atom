import React from 'react';
import { AuthProvider } from './AuthContext.jsx';
import AppRoutes from './components/AppRoutes.jsx'; // Your component that contains Routes

function App() {
  return (
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
  );
}

export default App;
