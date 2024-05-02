import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";

const Frases = () => {
  const frases = [
    "Estás siendo redireccionado al checkout de...",
    "El osito de peluche originalmente decía “I love you”.",
    "El osito de peluche número uno lo tiene Isabel en su habitación.",
    "Gracias a todos los héroes que se alejan de casa para protegernos.",
    "Existen todo tipo de madres que merecen ser celebradas.",
    "Este es un homenaje a quienes entendieron la entrega de ser mamá.",
    "Esto está tardando un poco más de lo habitual, gracias por esperarnos.",
  ];

  const [indice, setIndice] = useState(0);
  const fraseRef = useRef(null);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setIndice((indice) => (indice + 1) % frases.length);
    }, 5000);

    return () => clearInterval(intervalo);
  }, []);

  useEffect(() => {
    const frase = fraseRef.current;
    gsap.fromTo(
      frase,
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 1,
        ease: "power3.out",
      }
    );
  }, [indice]);

  return <p ref={fraseRef}>{frases[indice]}</p>;
};

export default Frases;
