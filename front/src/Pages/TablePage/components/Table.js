import React from "react";
import Td from "./Td.js";
import Th from "./Th.js";
import styled from "styled-components";
export default function Table({ dados, alteraData, alteraHeaders, headers }) {
  return (
    <TableWrapper>
      <thead>
        <tr>
          {headers.map((item, i) => (
            <Th alteraData={alteraHeaders(i)} key={i}>
              {item}
            </Th>
          ))}
        </tr>
      </thead>
      <tbody>
        {dados.map((item, index) => (
          <tr key={index}>
            {Object.keys(dados[index]).map((key, i) => (
              <Td key={i} alteraData={alteraData(index, key)}>
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
    word-break: break-all;
  }
  th {
    font-size: 20px;
    font-weight: 700;
  }
  th textarea {
    background-color: #f2f2f2;
  }

  input {
    max-width: 300px;
    padding: 15px;
    background-color: #ffffff;
    border: 1px solid #d4d4d4;
    width: 100%;
    border-radius: 5px;
    font-size: 20px;
    word-break: break-all;
  }
`;
