import Table from "./components/Table.js";
import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "../../userContext/userContext";
import PostBox from "./components/PostBox.js";
import Loading from "../../components/Loading.js";
export default function TablePage() {
  const { dados, setDados } = useContext(UserContext);
  const { tableIndex } = useParams();

  function alteraData(lin, col) {
    return function _alteraDados(dadoNovo) {
      setDados((dados) => {
        dados[tableIndex].data[lin][col] = dadoNovo;
        return [...dados];
      });
    };
  }
  function alteraHeaders(col) {
    return function _alteraDados(dadoNovo) {
      setDados((dados) => {
        dados[tableIndex].headers[col] = dadoNovo;
        return [...dados];
      });
    };
  }
  function alteraTitle(tableIndex) {
    return function _alteraDados(dadoNovo) {
      setDados((dados) => {
        dados[tableIndex].title = dadoNovo;
        return [...dados];
      });
    };
  }
  function alteraIsSelected(tableIndex) {
    return function _alteraDados(dadoNovo) {
      setDados((dados) => {
        dados[tableIndex].isSelected = dadoNovo;
        return [...dados];
      });
    };
  }

  if (dados === undefined) {
    return <Loading></Loading>;
  }
  return (
    <Container>
      <PostBox
        tableIndex={tableIndex}
        alteraTitle={alteraTitle(tableIndex)}
        alteraIsSelected={alteraIsSelected(tableIndex)}
      />
      <Table
        alteraData={alteraData}
        alteraHeaders={alteraHeaders}
        dados={dados[tableIndex]?.data}
        headers={dados[tableIndex]?.headers}
      />
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
  textarea {
    padding: 15px;
    font-family: Arial, Helvetica, sans-serif;
    background-color: #ffffff;
    border: 1px solid #d4d4d4;
    width: 100%;
    border-radius: 5px;
    font-size: 20px;
    overflow-y: scroll;
  }
`;

const ButtonBox = styled.div`
  display: flex;
  color: #ffffff;
  width: 100%;
  max-width: 1100px;
  column-gap: 20px;
  justify-content: space-between;
`;
