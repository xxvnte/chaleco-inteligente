import { Route, Routes, Navigate } from "react-router-dom";
import { Register, Login, EditUser } from "./components/UserForm";
import Navbar from "./components/Navbar";
import { Home, AboutProject, Maintenance, More } from "./components/Sections";
import { UserCard } from "./components/UserCard";
import { useAuth } from "./context/AuthContext";
import SensorData from "./components/SensorData";

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <main className="bg-gray-400 min-h-screen">
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar />
      </div>
      <Routes>
        <Route
          path="/"
          element={
            <div className="container mx-auto p-10">
              <div id="home" className="h-screen py-16">
                <Home />
              </div>
              <div id="aboutProject" className="h-screen py-16">
                <AboutProject />
              </div>
              <div id="maintenance" className="h-screen py-16">
                <Maintenance />
              </div>
              <div id="more" className="h-screen py-16">
                <More />
              </div>
            </div>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/user_profile/:userId"
          element={isAuthenticated ? <UserCard /> : <Navigate to="/login" />}
        />
        <Route
          path="/data/:userId"
          element={isAuthenticated ? <SensorData /> : <Navigate to="/login" />}
        />
        <Route
          path="/edit_user/:userId"
          element={isAuthenticated ? <EditUser /> : <Navigate to="/login" />}
        />
      </Routes>
    </main>
  );
}

export default App;
