import React, { useEffect } from "react";

export default function Td(props) {
  return (
    <td>
      <textarea
        type="text"
        value={props.children}
        onChange={(e) => props.alteraData(e.target.value)}
      />
    </td>
  );
}
