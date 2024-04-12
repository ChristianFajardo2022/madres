// Formulario.jsx
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { firestore, storage } from '../firebase/firebase-config';
import { ref, uploadBytes } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';

function Formulario() {
    const [formData, setFormData] = useState({
        nombre: '',
        cedula: '',
        correoElectronico: '',
        numeroWhatsapp: ''
    });
    const location = useLocation();
    const mediaBlobUrl = location.state?.mediaBlobUrl;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let audioRefPath = '';
        if (mediaBlobUrl) {
            const audioBlob = await fetch(mediaBlobUrl).then(r => r.blob());
            const audioRef = ref(storage, `audios/${new Date().getTime()}.mp3`);
            const uploadResult = await uploadBytes(audioRef, audioBlob);
            audioRefPath = uploadResult.metadata.fullPath;
        }

        try {
            await addDoc(collection(firestore, 'usuarios'), {
                ...formData,
                audioRef: audioRefPath
            });
            console.log('Datos y audio enviados a Firestore');
        } catch (error) {
            console.error("Error al enviar los datos a Firestore: ", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className='w-ful h-screen flex flex-col justify-center items-center bg-slate-400'>
            <div className='w-[30%] bg-blue-200'>
            <div className='my-4'>
                <label className='mr-4'>Nombre:</label>
                <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} />
            </div>
            <div className='my-4'>
                <label className='mr-4'>Cédula:</label>
                <input type="text" name="cedula" value={formData.cedula} onChange={handleChange} />
            </div>
            <div className='my-4'>
                <label className='mr-4'>Correo Electrónico:</label>
                <input type="email" name="correoElectronico" value={formData.correoElectronico} onChange={handleChange} />
            </div>
            <div className='my-4'>
                <label className='mr-4'>Número de WhatsApp:</label>
                <input type="text" name="numeroWhatsapp" value={formData.numeroWhatsapp} onChange={handleChange} />
            </div>
            <button type="submit">Enviar</button>
            </div>
        </form>
    );
}

export default Formulario;
