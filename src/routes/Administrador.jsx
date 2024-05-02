import React, { useState, useEffect } from "react";
import { firestore, storage } from "../firebase/firebase-config";
import { collection, query, where, getDocs } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import axios from "axios";

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

  const descargarCSV = async () => {
    try {
      const response = await axios.get(
        "https://audiosmadres.onrender.com/export-users-csv",
        {
          responseType: "blob",
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "usuarios.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading CSV:", error);
    }
  };

  return (
    <div className="font-inter lowercase w-full h-screen flex flex-col justify-center items-center">
      <button className="btn active mb-12" onClick={descargarCSV}>
        descargar DB
      </button>
      <div className="min-h-96 bg-zinc-700 py-4 px-4 flexCenter flex-wrap rounded-3xl overflow-auto">
        <div className="w-full flex justify-evenly">
          <input
            type="text"
            value={textoFiltro}
            onChange={(e) => setTextoFiltro(e.target.value)}
            className="rounded-full px-4"
          />
          <select
            className="rounded-full px-4"
            onChange={(e) => setFiltro(e.target.value)}
          >
            <option value="">Seleccione un filtro</option>
            <option value="email">Email</option>
            <option value="firstname">Nombre</option>
          </select>
          <button
            className="hover:text-black hover:bg-white transition text-white border border-white px-4 py-2 rounded-full"
            onClick={filtrarUsuarios}
          >
            Filtrar
          </button>
        </div>
        <ul className=" text-white">
          {usuarios.map((usuario) => (
            <ul>
              <li key={usuario.id} className="w-full my-6">
                <span className="text-xl font-black">{usuario.firstname}</span>{" "}
                - {usuario.email}
              </li>
              <audio
                id={`audioElement_${usuario.id}`}
                controls
                src={`${usuario.audioURL}.mp3`}
              ></audio>
            </ul>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Administrador;
