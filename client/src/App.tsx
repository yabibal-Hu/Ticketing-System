import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import UserDashboard from "./components/UserDashboard";
import AdminDashboard from "./components/AdminDashboard";
import Home from "./components/Home";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";

const App: React.FC = () => {
  const { token, user } = useSelector((state: RootState) => state.auth);

  // Redirect to home if the route is unknown
  const getDefaultRoute = () => {
    if (!token) {
      return <Navigate to="/" />; // Redirect to home if not logged in
    }
    return user?.role === "admin" ? (
      <Navigate to="/admin" /> // Redirect to admin dashboard for admins
    ) : (
      <Navigate to="/dashboard" /> // Redirect to user dashboard for regular users
    );
  };

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Protected Routes */}
      {token && (
        <>
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </>
      )}

      {/* Redirect unknown routes */}
      <Route path="*" element={getDefaultRoute()} />
    </Routes>
  );
};

export default App;
