import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import SinglePlayerPage from "./pages/SinglePlayerPage";
import GameLobby from "./pages/GameLobby";
import ProfilePage from "./pages/ProfilePage";
import { AuthProvider } from "./context/AuthContext";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/singleplayer" element={<SinglePlayerPage />} />
            <Route path="/multiplayer/:mode" element={<GameLobby />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
