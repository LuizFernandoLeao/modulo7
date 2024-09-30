import { useEffect, useState } from "react";
import "../app/index.css";
import axios from "axios"

export default function Results() {
    const [message, setMessage] = useState(""); 
    const [data, setData] = useState(null);    

    useEffect(() => {
        async function fetchResults() {
            try {
                const response = await axios.get("http://127.0.0.1:5000/execute/model");
                const result = await response.data;

                setMessage(result[0]);
                setData(result[1]);
            } catch (error) {
                console.error("Erro ao buscar resultados:", error);
            }
        }

        fetchResults();
    }, []); 

    return (
        <div className="bg-amber-50 min-h-screen flex flex-col items-center justify-center p-6">
          <h1 className="text-4xl font-extrabold text-black mb-6">
            Resultados:
          </h1>
      
          <p className="text-xl text-black mb-4">{message}</p>
      
          {data && (
            <div className="bg-white shadow-lg rounded-lg p-6 mt-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                Previsão para a compra de Dogecoin:
              </h2>
              <p className="text-lg text-gray-600 mt-2">{data}</p>
            </div>
          )}
        </div>
      );
      
}
