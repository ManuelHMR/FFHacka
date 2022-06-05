import React, { useState, useCallback, useContext } from "react";
import styled from "styled-components";
import logo from "../../assets/img/ff-seguros-logo.png";
import DropZone from "./components/DropZone";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../userContext/userContext";
import axios from "axios";
import Loading from "../../components/Loading";

export default function MainPage() {
  const { URL, file } = useContext(UserContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  function teste(pdf) {
    console.log(pdf, "entrei");
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        "Access-Control-Allow-Origin": "*",
      },
    };
    console.log(pdf, "o que sou");
    axios
      .post(`${URL}/pdf`, pdf, config)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }

  const [name, setName] = useState();

  function postPdf() {
    const data = new FormData();
    data.append("name", file.path);
    data.append("pdf", file);
    setIsLoading(true);
    axios
      .post(`${URL}/pdf`, data)
      .then((res) => {
        console.log(res);
        setIsLoading(false);
        navigate("/tabela/0");
      })
      .catch((err) => console.log(err));
  }
  if (isLoading) {
    return (
      <Loading>
        <p>Seu documento está sendo processado, aguarde um momento</p>
        <p>Esse processo, pode demorar alguns minutos</p>
      </Loading>
    );
  }
  return (
    <Container>
      <ImgWrapper>
        <img src={logo} alt="Logo da FF Seguros" />
      </ImgWrapper>
      <DropZone />
      {/* <Link to="/tabela/0"> */}
      <ConfirmButton onClick={() => postPdf()}>Enviar</ConfirmButton>
      {/* </Link> */}
    </Container>
  );
}
const Container = styled.div`
  height: 100vh;
  width: 100%;
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const ImgWrapper = styled.div`
  background-color: black;
  width: 500px;
  margin-bottom: 30px;
  border-radius: 5px;
  max-width: 100%;
  img {
    width: 100%;
  }
`;
const ConfirmButton = styled.div`
  margin-top: 20px;
  height: 60px;
  border-radius: 10px;
  width: 150px;
  background-color: #063970;
  font-size: 20px;
  color: #ffffff;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
