import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { Register, Login, EditUser } from "./components/UserForm";
import Navbar from "./components/Navbar";
import { Home, AboutProject, Maintenance, More } from "./components/Sections";
import UserCard from "./components/UserCard";
import { useAuth } from "./context/AuthContext";
import SensorData from "./components/SensorData";

function App() {
  const { isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkBackend = async () => {
      try {
        const response = await fetch(`${config.api.url}/backendIsActive`);
        if (response.ok) {
          console.log("Backend activo");
        } else {
          console.error("Backend no disponible");
        }
      } catch (error) {
        console.error("Error al conectar con el backend:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkBackend();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-400">
        <div className="text-center">
          <div className="loader mb-4"></div>
          <p className="text-lg font-semibold text-gray-800">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="bg-gray-400 min-h-screen">
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar />
      </div>
      <Routes>
        <Route
          path="/"
          element={
            <div className="container mx-auto -mt-16">
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
