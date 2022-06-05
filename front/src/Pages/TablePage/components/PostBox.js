import React, { useState, useContext } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../userContext/userContext";
export default function PostBox({ tableIndex, alteraTitle, alteraIsSelected }) {
  const { dados, setDados } = useContext(UserContext);
  const navigate = useNavigate();
  const isCheck = dados[tableIndex].isSelected;

  function checkTable() {
    if (dados[tableIndex].title === "" && !isCheck) {
      alert("Digite um nome para sua tabela");
      return;
    }
    alteraIsSelected(!isCheck);
  }
  function navigateBackward() {
    if (tableIndex > 0) {
      navigate(`/tabela/${Number(tableIndex) - 1}`);
    }
  }
  function navigateFoward() {
    if (tableIndex < dados.length - 1) {
      navigate(`/tabela/${Number(tableIndex) + 1}`);
    } else {
      navigate("/concluir");
    }
  }

  return (
    <Box>
      <NavigateButton onClick={() => navigateBackward()}>
        <ion-icon name="arrow-back-circle"></ion-icon>
      </NavigateButton>

      <input
        type="text"
        placeholder="Digite um titulo para sua tabela"
        value={dados[tableIndex].title}
        onChange={(e) => alteraTitle(e.target.value)}
      />
      <CheckBox onClick={() => checkTable()}>
        {isCheck ? <ion-icon name="checkmark"></ion-icon> : ""}
      </CheckBox>
      <NavigateButton onClick={() => navigateFoward()}>
        <ion-icon name="arrow-forward-circle"></ion-icon>
      </NavigateButton>
    </Box>
  );
}
const Box = styled.div`
  display: flex;
  width: 100%;
  max-width: 1100px;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  input {
    max-width: 700px;
    height: 100%;
  }
`;
const CheckBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 100%;
  border: 2px solid black;
  border-radius: 50%;
  cursor: pointer;
  ion-icon {
    width: 100%;
    height: 100%;
    color: green;
  }
`;
const NavigateButton = styled.div`
  cursor: pointer;
  ion-icon {
    width: 60px;
    height: 60px;
    color: black;
  }
`;
