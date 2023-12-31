import { useEffect, useState } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import "./App.css";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "./Firebase";
import CreateUser from "./pages/CreateUser";
import { signOut } from "firebase/auth";

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });
  }, []);

  const handleLogout = () => {
    signOut(auth).then(() => {
      setUser(null);
      navigate("/");
    });
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route
          path="/"
          element={<Home user={user} handleLogout={handleLogout} />}
        />
        <Route
          path="/create"
          element={
            user?.uid ? <CreateUser user={user} /> : <Navigate to="/auth" />
          }
        />
        <Route
          path="/update/:id"
          element={
            user?.uid ? <CreateUser user={user} /> : <Navigate to="/auth" />
          }
        />
      </Routes>
    </>
  );
}

export default App;
