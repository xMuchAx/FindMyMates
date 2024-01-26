import { BrowserRouter, Route, Routes } from "react-router-dom";

import Register from "./views/Register";
import Login from "./views/Login";

import Layout from "./Layout";
import Index from "./views/Index";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<Index />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home/*" element={<Layout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
