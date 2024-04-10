import React, { useState, useEffect } from 'react';
import { firestore, storage } from '../firebase/firebase-config';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { ref, getDownloadURL } from 'firebase/storage';

function Administrador() {
    const [usuarios, setUsuarios] = useState([]);
    const [filtro, setFiltro] = useState('');
    const [textoFiltro, setTextoFiltro] = useState('');

    useEffect(() => {
        const obtenerUsuarios = async () => {
            const q = query(collection(firestore, "usuarios"));
            const querySnapshot = await getDocs(q);
            let usuarios = [];
            querySnapshot.forEach((doc) => {
                usuarios.push({ id: doc.id, ...doc.data() });
            });
            setUsuarios(usuarios);
        };

        obtenerUsuarios();
    }, []);

    const filtrarUsuarios = async () => {
        if (!textoFiltro) return;

        const q = query(collection(firestore, "usuarios"), where(filtro, "==", textoFiltro));
        const querySnapshot = await getDocs(q);
        let usuariosFiltrados = [];
        querySnapshot.forEach((doc) => {
            usuariosFiltrados.push({ id: doc.id, ...doc.data() });
        });
        setUsuarios(usuariosFiltrados);
    };

    const descargarAudio = async (audioRef) => {
        try {
            const audioURL = await getDownloadURL(ref(storage, audioRef));
            const link = document.createElement('a');
            link.href = audioURL;
            link.setAttribute('download', 'audioDescargado.mp3');  // Asegúrate de que la extensión corresponda al tipo de archivo
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error("Error al obtener la URL de descarga: ", error);
        }
    };    
    return (
        <div className='w-full h-screen flex flex-col justify-center items-center'>
            <div className=' bg-slate-400 py-4 px-4'>
            <input type="text" value={textoFiltro} onChange={(e) => setTextoFiltro(e.target.value)} className='mr-5 mb-5' />
            <select onChange={(e) => setFiltro(e.target.value)}>
                <option value="nombre">Nombre</option>
                <option value="cedula">Cédula</option>
                <option value="correoElectronico">Correo Electrónico</option>
                <option value="numeroWhatsapp">Número de WhatsApp</option>
            </select>
            <button onClick={filtrarUsuarios}>Filtrar</button>
            <ul className='mr-5 mb-5'>
                {usuarios.map(usuario => (
                    <li key={usuario.id} className='mr-5'>
                        {usuario.nombre} - {usuario.cedula} - {usuario.correoElectronico}
                        <button target-blank onClick={() => descargarAudio(usuario.audioRef)} className='mr-5 mb-5 ml-5 bg-red-500 rounded-lg px-4'>Descargar Audio</button>
                    </li>
                ))}
            </ul>
            </div>
        </div>
    );
}

export default Administrador;
