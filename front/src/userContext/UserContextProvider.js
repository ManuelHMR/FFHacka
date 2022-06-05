import axios from "axios";
import React from "react";
import { UserContext } from "./userContext.js";
import { useState } from "react";
export default function UserContextProvider(props) {
  // const URL = "https://ff-hacka.herokuapp.com";
  const URL = 'http://localhost:4000'
  const [file, setFile] = useState("");
  return (
    <UserContext.Provider value={{ URL, file, setFile }}>
      {props.children}
    </UserContext.Provider>
  );
}
