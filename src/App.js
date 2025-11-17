import { useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from "./login";
import Bolsa from "./Bolsa";

export default function App() {
  const [logado, setLogado] = useState(false);

  return logado ? (
    <Bolsa />
  ) : (
    <Login onLogin={() => setLogado(true)}/>
  );
}
