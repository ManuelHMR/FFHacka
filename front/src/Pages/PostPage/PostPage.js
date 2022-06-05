import React, { useState, useContext } from "react";
import styled from "styled-components";
import logo from "../../assets/img/ff-seguros-logo.png";
import { Link } from "react-router-dom";
import { UserContext } from "../../userContext/userContext";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import axios from "axios";
export default function PostPage() {
  const { dados, URL } = useContext(UserContext);
  const [isSent, setIsSent] = useState(false);
  const navigate = useNavigate();
  const [isLoading, setIsloading] = useState(false);
  function postFinalData() {
    if (isSent) {
      setIsSent(false);
      navigate("/");
      return;
    }
    setIsloading(true);
    const body = dados.filter((item) => item.isSelected === true);
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    };
    axios
      .post(`${URL}/tables`, body, config)
      .then(() => {
        setIsSent(true);
        setIsloading(false);
      })
      .catch((err) => console.log(body, err));
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
      <BackButton onClick={() => navigate(isSent ? "/" : -1)}>
        <ion-icon name={isSent ? "home" : "arrow-back-circle"}></ion-icon>
        <h1>{isSent ? "Menu" : "Retornar"}</h1>
      </BackButton>
      <ImgWrapper>
        <img src={logo} alt="Logo da FF Seguros" />
      </ImgWrapper>
      <ConfirmButton>
        <ion-icon
          onClick={() => postFinalData()}
          name={isSent ? "checkmark-circle" : "cloud-upload"}
        ></ion-icon>
        <h1>
          {isSent
            ? "Enviado com sucesso"
            : "Clique para enviar suas tabelas para o banco de dados"}
        </h1>
      </ConfirmButton>
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h1 {
    font-size: 20px;
    font-weight: 700;
  }
  ion-icon {
    width: 150px;
    height: 150px;
    color: #063970;
    cursor: pointer;
  }
`;
const BackButton = styled.div`
  position: fixed;
  top: 10px;
  left: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h1 {
    font-size: 20px;
    font-weight: 700;
  }
  ion-icon {
    width: 100px;
    height: 100px;
    color: #063970;
    cursor: pointer;
  }
`;
