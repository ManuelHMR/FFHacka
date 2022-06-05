import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import TablePage from "./Pages/TablePage";
import MainPage from "./Pages/MainPage";
import PostPage from "./Pages/PostPage";
import "./assets/css/reset.css";
import "./assets/css/style.css";
import UserContextProvider from "./userContext/UserContextProvider.js";

export default function App() {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/tabela/:tableIndex" element={<TablePage />} />
          <Route path="/concluir" element={<PostPage />} />
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  );
}
