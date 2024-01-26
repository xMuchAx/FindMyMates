import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from 'react';

import Register from "./views/Register";
import Login from "./views/Login";

import Layout from "./Layout";
import Index from "./views/Index";
import EventDetail from "./views/EventDetail";

import { AuthContext, AuthContextType } from './AuthContext'; // Importez AuthContextType ici

function App() {
  const [auth, setAuth] = useState<AuthContextType['auth']>({ userId: null, token: null });

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Index />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/*"
            element={
              <Layout>
                <Route path="/event-detail" element={<EventDetail />} />
              </Layout>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;