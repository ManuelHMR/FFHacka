import Table from "./components/Table.js";
import React, { useState } from "react";
import styled from "styled-components";
export default function TablePage() {
  const [dadosTeste, setDadosTeste] = useState([
    {
      Coluna1: "Teste1Linha1",
      Coluna2: "Teste2Linha1",
      Coluna3: "Teste3Linha1",
      Coluna4: "Teste4Linha1",
    },
    {
      Coluna1: "Teste1Linha2",
      Coluna2: "Teste2Linha2",
      Coluna3: "Teste3Linha2",
      Coluna4: "Teste4Linha2",
    },
    {
      Coluna1: "Teste1Linha3",
      Coluna2: "Teste2Linha3",
      Coluna3: "Teste3Linha3",
      Coluna4: "Teste4Linha3",
    },
    {
      Coluna1: "Teste1Linha4",
      Coluna2: "Teste2Linha4",
      Coluna3: "Teste3Linha4",
      Coluna4: "Teste4Linha4",
    },
    {
      Coluna1: "Teste1Linha5",
      Coluna2: "Teste2Linha5",
      Coluna3: "Teste3Linha5",
      Coluna4: "Teste4Linha5",
    },
    {
      Coluna1: "Teste1Linha6",
      Coluna2: "Teste2Linha6",
      Coluna3: "Teste3Linha6",
      Coluna4: "Teste4Linha6",
    },
  ]);
  function alteraDados(lin, col) {
    return function _alteraDados(dadoNovo) {
      setDadosTeste((dados) => {
        dados[lin][col] = dadoNovo;
        return [...dados];
      });
    };
  }
  return (
    <Container>
      <PostBox>
        <input type="text" placeholder="Digite um titulo para sua tabela" />
        <ButtonBox>
          <ConfirmButton>Salvar</ConfirmButton>
          <DeleteButton>Deletar</DeleteButton>
        </ButtonBox>
      </PostBox>
      <Table alteraDados={alteraDados} dados={dadosTeste} />
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
  input {
    padding: 15px;
    background-color: #ffffff;
    border: 1px solid #d4d4d4;
    width: 100%;
    border-radius: 5px;
    font-size: 20px;
  }
`;
const PostBox = styled.div`
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
const ButtonBox = styled.div`
  display: flex;
  color: #ffffff;
  height: 100%;
  column-gap: 20px;
`;
const ConfirmButton = styled.div`
  border-radius: 10px;
  width: 120px;
  background-color: #063970;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
const DeleteButton = styled.div`
  border-radius: 10px;
  width: 120px;
  background-color: crimson;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
