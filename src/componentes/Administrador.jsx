import React, { useState, useEffect } from "react";
import axios from "axios";

function Administrador() {
  const [usuarios, setUsuarios] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [textoFiltro, setTextoFiltro] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const obtenerUsuarios = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://audiosmadres.onrender.com/get-all-users"
        );
        setUsuarios(response.data.users);
      } catch (error) {
        console.error("Error al obtener los usuarios:", error);
      }
      setLoading(false);
    };

    obtenerUsuarios();
  }, []);

  const filtrarUsuarios = async () => {
    if (!textoFiltro || !filtro) return;

    setLoading(true);
    try {
      const response = await axios.get(
        `https://audiosmadres.onrender.com/filter-users?field=${filtro}&value=${textoFiltro}`
      );
      setUsuarios(response.data.users);
    } catch (error) {
      console.error("Error al filtrar los usuarios:", error);
    }
    setLoading(false);
  };

  const descargarAudio = async (audioRef) => {
    // Ajusta esta lógica de acuerdo a cómo se construyen tus URLs
    const ref = audioRef.split("madres-2d8e4.appspot.com/")[1];
    try {
      const response = await axios.get(
        `https://audiosmadres.onrender.com/download-audio?ref=${ref}`,
        { responseType: "blob" }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "audioDescargado.wav"); // Asegura la extensión
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error al descargar el audio:", error);
    }
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
    <div className="w-full h-screen flex flex-col justify-center items-center">
      {loading && <p>Cargando...</p>}
      <div className="bg-slate-400 py-4 px-4">
        <input
          type="text"
          value={textoFiltro}
          onChange={(e) => setTextoFiltro(e.target.value)}
          className="mr-5 mb-5"
        />
        <select onChange={(e) => setFiltro(e.target.value)}>
          <option value="">Seleccionar filtro...</option>
          <option value="nombre">Nombre</option>
          <option value="apellido">Apellido</option>
          <option value="tipodocumento">Tipo de Documento</option>
          <option value="numerodocumento">Número de Documento</option>
          <option value="email">Correo Electrónico</option>
          <option value="telefono">Teléfono</option>
          <option value="nombredestino">Nombre Destino</option>
          <option value="apellidodestino">Apellido Destino</option>
          <option value="pais">País</option>
          <option value="departamento">Departamento</option>
          <option value="ciudad">Ciudad</option>
          <option value="direccion">Dirección</option>
        </select>
        <button onClick={filtrarUsuarios}>Filtrar</button>
        <button
          onClick={descargarCSV}
          className="bg-blue-500 text-white p-2 rounded-lg"
        >
          Descargar CSV
        </button>
        <ul className="mr-5 mb-5">
          {usuarios.map((usuario) => (
            <li key={usuario.id} className="mr-5">
              {usuario.nombre} {usuario.apellido} - {usuario.tipodocumento}{" "}
              {usuario.numerodocumento} - {usuario.email}
              <button
                onClick={() => descargarAudio(usuario.audioRef)}
                className="mr-5 mb-5 ml-5 bg-red-500 rounded-lg px-4"
              >
                Descargar Audio
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Administrador;
