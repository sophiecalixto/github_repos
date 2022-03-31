import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import Repository from "./pages/Repository";

export default function Rotas() {

  return (
   <BrowserRouter>
     <Routes>
       <Route path="/" exact element={<Main/>} />
       <Route path="/repository/:id" element={<Repository/>} />
     </Routes>
   </BrowserRouter>
  );
}