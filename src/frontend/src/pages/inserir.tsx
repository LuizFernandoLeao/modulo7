import { useState, ChangeEvent } from "react";
import { useRouter } from 'next/navigation';
import "../app/index.css";
import axios from "axios";

export default function Inserir() {

  const router = useRouter();
  
  const [file, setFile] = useState<File | null>(null);

  const executarModelo = async () => {
    try {
      const response = await axios.get('http://localhost:5000/execute/model');
      console.log('Resposta da API:', response.data);
      router.push('/results');
    } catch (error) {
      console.error('Erro na rota /execute/model', error);
    }
  };

  const changeFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const uploadedFile = e.target.files[0];
      setFile(uploadedFile);
      console.log("Arquivo selecionado:", uploadedFile);
    }
  };

  const clickButton = () => {
    document.getElementById("file")?.click();
  };

  const upload = async () => {
    if (!file) {
      alert("Selecione um arquivo antes de enviar.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:5000/addData", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Arquivo enviado com sucesso!");
      } else {
        alert("Erro ao enviar o arquivo.");
      }
    } catch (error) {
      console.error("Erro no upload:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-zinc-200 min-h-screen">
      <input
        id="fileInput"
        type="file"
        accept=".csv"
        style={{ display: "none" }}
        onChange={changeFile}
      />
      <button
        className="bg-zinc-500 rounded-lg p-2 w-auto text-zinc-900 text-2xl text-center font-bold"
        onClick={clickButton}
      >
        Inserir
      </button>
      <br />
      <button
        className="bg-zinc-500 rounded-lg p-2 w-auto text-zinc-900 text-2xl text-center font-bold"
        onClick={upload}
      >
        Enviar
      </button>

      {file && <p className="text-black mt-4">Arquivo selecionado: {file.name}</p>}

      <br />

      <button onClick={executarModelo} className="text-slate-950 text-2xl text-center font-bold bg-amber-200 rounded-lg p-2 w-auto">
        Modelo Treinado
      </button>

    </div>
  );
}
