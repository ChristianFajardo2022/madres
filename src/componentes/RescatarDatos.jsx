import React, { useEffect, useState } from "react";
import { firestore, storage } from "../firebase/firebase-config";
import { collection, query, where, getDocs } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import { useLocation } from "react-router-dom";
import gsap from "gsap";

const RescatarDatos = () => {
  const [emailQuery, setEmailQuery] = useState("");
  const [userData, setUserData] = useState([]);
  const [status, setStatus] = useState(null);
  const [localStorageOrder, setLocalStorageOrder] = useState(true);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const emailParam = queryParams.get("email");

  const fetchData = async (email) => {
    const q = query(
      collection(firestore, "usuarios"),
      where("email", "==", email)
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
          return { id: doc.id, ...data, audioURL: "" };
        }
      })
    );
    return usuariosFiltrados;
  };

  useEffect(() => {
    if (emailParam) {
      setEmailQuery(emailParam);
    } else {
      const storedData = localStorage.getItem("formData");
      if (storedData) {
        const { email } = JSON.parse(storedData);
        setEmailQuery(email);
      }
    }
  }, [emailParam]);

  useEffect(() => {
    const fetchDataAndSetState = async () => {
      if (emailQuery) {
        const usuariosFiltrados = await fetchData(emailQuery);
        setUserData(usuariosFiltrados);
      }
    };
    fetchDataAndSetState();
  }, [emailQuery]);

  // useEffect para capturar el estado de la compra
  useEffect(() => {
    if (userData.length > 0) {
      setStatus(userData[0].trx_status);
      setSelectedUsers([userData[0]]);
    }
  }, [userData]);

  //Evento para enviar al checkout
  const submitHandler = () => {
    const dataToSend = selectedUsers.map((user) => ({
      firstname: user.firstname,
      customer_id: user.customer_id,
      promoid: user.promoid,
      order_id: user.order_id,
    }));

    // Construir la cadena de consulta para enviar datos al carrito
    const queryString = dataToSend
      .map((data) =>
        Object.keys(data)
          .map((key) => `${key}=${encodeURIComponent(data[key])}`)
          .join("&")
      )
      .join("&");

    window.location.href = `${urlAlcarrito}?${queryString}`;
  };

  //Evento para cerrar el popup
  const handleClose = () => {
    const tl = gsap.timeline();
    tl.to(".dataClient", {
      opacity: 0,
      ease: "power1.inOut",
      duration: 1,
    });
    tl.add(() => setLocalStorageOrder(false));
  };

  const handleCheckboxChange = (event, user) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      setSelectedUsers([user]);
    } else {
      setSelectedUsers([]);
    }
  };

  const vacio = status === "canceled" || status === "";

  return (
    <>
      {localStorageOrder && (
        <>
          {vacio && (
            <div className="dataClient text-xl text-[--yellow] fixed w-full h-full z-[201] bg-black bg-opacity-20 backdrop-blur-xl top-0 left-0 flexCenter max-lg:p-6">
              <div className="relative font-inter bg-black bg-opacity-30 lg:w-2/5 xs:w-full min-h-2/4 rounded-3xl flexCenter max-lg:flex-col p-12 border border-[--yellow]">
                <div className="iconPopUp lg:w-1/2 xs:w-full lg:pr-6">
                  <span className="w-full h-auto inline-block">
                    <img src="/svg/iconAudio.svg" alt="" />
                  </span>
                  <p className="text-2xl xs:text-center my-12 font-medium lg:text-start">
                    {userData.length > 0 && userData[0].firstname}

                    {userData.length < 2
                      ? " tienes una grabación pendiente para poner en tu oso."
                      : " tienes algunas grabaciones. Escoge la mejor y continúa para poner en tu oso."}
                  </p>
                </div>
                <div className="audioBoxPopup lg:w-1/2 xs:w-full lg:pl-6">
                  <span
                    onClick={handleClose}
                    className="absolute cursor-pointer -top-12 right-6 w-6 h-6 inline-block"
                  >
                    <img src="/svg/close.svg" alt="" />
                  </span>

                  <p className="text-2xl text-center my-12 max-lg:text-white">
                    ¿Qué quieres hacer?
                  </p>
                  {userData.map((user) => (
                    <div
                      key={user.id}
                      className="checkbox-container flex items-center justify-between"
                    >
                      <audio
                        className="w-full"
                        src={user.audioURL}
                        controls
                      ></audio>
                      <input
                        type="checkbox"
                        onChange={(event) => handleCheckboxChange(event, user)}
                        checked={selectedUsers.some(
                          (selectedUser) => selectedUser.id === user.id
                        )}
                      />
                    </div>
                  ))}
                  <button
                    onClick={submitHandler}
                    className="btn active my-6 w-full"
                  >
                    Continuar al checkout
                  </button>
                  <button onClick={handleClose} className="btn w-full">
                    Grabar uno nuevo
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default RescatarDatos;
