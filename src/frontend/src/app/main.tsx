import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from "axios";


export default function Main() {


  const router = useRouter();

  const executarModelo = async () => {
    try {
      
      const response = await axios.get('http://localhost:5000/execute/model');
      
      console.log('Resposta da API:', response.data);

      router.push('/results')

    }

  }

  return (
    <div className="flex flex-col items-center justify-center bg-zinc-400 min-h-screen">
      <div>
        <p className="text-6xl normal-case text-zinc-900 font-bold mb-5">
          Previsão de Bitcoins e Dogecoins!!!!!!!
        </p>
        <div className="flex text-center justify-center space-x-4">

          <button onClick={executarModelo} className="bg-zinc-600 rounded-lg p-2 w-auto text-zinc-900 text-2xl text-center font-bold">
            Base Treinada
          </button>
          <Link href='insereBase'>
            <button className="bg-zinc-600 rounded-lg p-2 w-auto text-slate-950 text-2xl text-center font-bold">
              Treinar
            </button>
          </Link>

          <Link href='dash'>
            <button className="bg-zinc-600 rounded-lg p-2 w-auto text-slate-950 text-2xl text-center font-bold">
              Gráfico
            </button>
          </Link>


        </div>
      </div>
    </div>
  );
}
