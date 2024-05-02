import React, { useState, useEffect } from "react";
import { firestore, storage } from "../firebase/firebase-config";
import { collection, query, where, getDocs } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";

function Administrador() {
  const [usuarios, setUsuarios] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [textoFiltro, setTextoFiltro] = useState("");

  const filtrarUsuarios = async () => {
    if (!textoFiltro) {
      setUsuarios([]);
      return;
    }

    const q = query(
      collection(firestore, "usuarios"),
      where(filtro, "==", textoFiltro)
    );
    const querySnapshot = await getDocs(q);
    const usuariosFiltrados = await Promise.all(
      querySnapshot.docs.map(async (doc) => {
        const data = doc.data();
        try {
          const url = await getDownloadURL(ref(storage, data.audioRef));
          return { id: doc.id, ...data, audioURL: url };
        } catch (error) {
          console.error("Error al obtener URL de descarga", error);
          return { id: doc.id, ...data, audioURL: "" }; // Si falla la descarga, proporciona una URL vacía.
        }
      })
    );

    setUsuarios(usuariosFiltrados);
  };

  const handleDescargarAudio = (usuario) => {
    if (usuario.audioURL) {
      const link = document.createElement("a");
      link.href = usuario.audioURL;
      link.setAttribute("download", "audioDescargado.mp3");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="font-inter lowercase w-full h-screen flex flex-col justify-center items-center">
      <div className="h-full bg-slate-400 py-4 px-4 overflow-scroll">
        <input
          type="text"
          value={textoFiltro}
          onChange={(e) => setTextoFiltro(e.target.value)}
          className="mr-5 mb-5"
        />
        <select onChange={(e) => setFiltro(e.target.value)}>
          <option value="">Seleccione un filtro</option>
          <option value="email">Email</option>
          <option value="firstname">Nombre</option>
        </select>
        <button onClick={filtrarUsuarios}>Filtrar</button>
        <ul className="mr-5 mb-5 h-full">
          {usuarios.map((usuario) => (
            <li key={usuario.id} className="mr-5">
              {usuario.firstname} - {usuario.email}
              <button onClick={() => handleDescargarAudio(usuario)}>
                Descargar
              </button>
              <audio
                id={`audioElement_${usuario.id}`}
                controls
                src={usuario.audioURL}
              ></audio>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Administrador;
