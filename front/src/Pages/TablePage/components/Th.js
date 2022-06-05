import React, { useEffect } from "react";

export default function Th(props) {
  return (
    <th>
      <textarea
        type="text"
        value={props.children}
        onChange={(e) => props.alteraData(e.target.value)}
      />
    </th>
  );
}
