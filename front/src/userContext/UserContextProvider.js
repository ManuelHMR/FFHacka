import axios from "axios";
import React from "react";
import { UserContext } from "./userContext.js";
import { useState } from "react";
import dadosTeste from "./teste.js";
export default function UserContextProvider(props) {
  const URL = "https://ff-hacka.herokuapp.com";
  // const URL = 'http://localhost:4000'
  const [file, setFile] = useState("");

  const [dados, setDados] = useState(dadosTeste);
  return (
    <UserContext.Provider
      value={{
        URL,
        file,
        setFile,
        dados,
        setDados,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
