import React from "react";
import Td from "./Td.js";
import styled from "styled-components";
export default function Table({ dados, alteraDados }) {
  return (
    <TableWrapper>
      <thead>
        <tr>
          {Object.keys(dados[0]).map((item, i) => (
            <th key={i}>{item}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {dados.map((item, index) => (
          <tr key={index}>
            {Object.keys(dados[index]).map((key, i) => (
              <Td key={i} alteraDados={alteraDados(index, key)}>
                {item[key]}
              </Td>
            ))}
          </tr>
        ))}
      </tbody>
    </TableWrapper>
  );
}
const TableWrapper = styled.table`
  display: table;
  border-collapse: separate;
  border-spacing: 6px;

  th,
  td {
    border: 1px solid black;
  }
  th {
    font-size: 20px;
    font-weight: 700;
    padding: 15px;
  }

  input {
    padding: 15px;
    background-color: #ffffff;
    border: 1px solid #d4d4d4;
    width: 100%;
    border-radius: 5px;
    font-size: 20px;
  }
`;
