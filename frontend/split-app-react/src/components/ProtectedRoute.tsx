import { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../util/firebaseConfig";

// Define the prop type
interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        navigate("/login"); // Redirect to login if not authenticated
      }
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, [navigate]);

  if (loading) return <div>Loading...</div>;

  return isAuthenticated ? <>{children}</> : null;
};

export default ProtectedRoute;
