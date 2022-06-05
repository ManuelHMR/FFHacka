import React,{useEffect} from 'react'

export default function Td(props) {

  return (
      
    <td>
        <input type="text" value={props.children} onChange={(e)=>props.alteraDados(e.target.value)}/>
            
    </td>
  )
}
