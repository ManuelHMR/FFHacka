import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import TablePage from "./Pages/TablePage";
import MainPage from "./Pages/MainPage";
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
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  );
}
