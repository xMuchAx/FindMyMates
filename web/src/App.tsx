import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./views/Index";
import Register from "./views/Register";
import Login from "./views/Login";
import Home from "./views/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
