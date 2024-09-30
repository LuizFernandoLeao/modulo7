import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../app/index.css";

const Grafic = () => {
  const [img, setImg] = useState<string | null>(null); 

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.get('http://localhost:5000/dashboard', {
          responseType: 'blob'
        });

        const imageUrl = URL.createObjectURL(response.data);
        setImg(imageUrl); 
      }
    };

    fetchImage();
  }, []);

  return (
    <div>
      {img ? (
        <img src={img} alt="Dashboard" />
      ) : (
        <p>Carregando img...</p>
      )}
    </div>
  );
};

export default Grafic;
