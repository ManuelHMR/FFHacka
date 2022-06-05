import { useEffect, useContext } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import { UserContext } from "../../../userContext/userContext";
import axios from "axios";
const baseStyle = {
  width: "100%",
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 10,
  borderColor: "#063970",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "black",
  outline: "none",
  transition: "border .24s ease-in-out",
};

export default function DropZone(props) {
  const { URL, file, setFile } = useContext(UserContext);
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    accept: {
      "application/pdf": [".pdf"],
    },
  });
  useEffect(() => {
    setFile(acceptedFiles[0]);
  }, [acceptedFiles]);
  const fileRender = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));
  function postPdf() {
    const data = new FormData();
    data.append("name", "name");
    data.append("pdf", file);
    console.log(data);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        "Access-Control-Allow-Origin": "*",
      },
    };
    axios
      .post("https://httpbin.org/anything", data, config)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }

  return (
    <Section>
      <div {...getRootProps({ className: "dropzone", style: baseStyle })}>
        <form eenctype="multipart/form-data">
          <input {...getInputProps()} />
        </form>
        <p>Arraste o arquivo PDF aqui, ou então clique e selecione-o</p>
      </div>
      <aside>
        <h4>Nome do Arquivo:</h4>
        <ul>{fileRender}</ul>
      </aside>
    </Section>
  );
}
const Section = styled.section`
  width: 100%;
  h4 {
    text-align: center;
    margin: 20px 0;
    font-weight: 700;
    font-size: 20px;
  }
  ul {
    text-align: center;
  }
`;
