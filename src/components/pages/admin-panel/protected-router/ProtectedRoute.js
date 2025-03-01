import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ children }) => {
  const is_admin = localStorage.getItem("is_admin")
  
  if (is_admin == "false") {
    return <Navigate to="/products" replace />;
  }

  return children;
};