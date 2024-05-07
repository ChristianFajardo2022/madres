import React, { useEffect, useState } from "react";
import { firestore, storage } from "../firebase/firebase-config";
import { collection, query, where, getDocs } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import { urlAlcarrito, urlServer } from "../data/url";
import { useLocation } from "react-router-dom";
import gsap from "gsap";

const RescatarDatos = () => {
  const [emailQuery, setEmailQuery] = useState("");
  const [userData, setUserData] = useState(null);
  const [status, setStatus] = useState(null);
  const [audio, setAudio] = useState(null);
  const [localStorageOrder, setLocalStorageOrder] = useState(true);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const emailParam = queryParams.get("email");

  const filtrarUsuarios = async () => {
    if (emailParam) {
      setEmailQuery(emailParam);
    } else if (emailParam == null || !emailParam) {
      const storedData = localStorage.getItem("formData");
      const { email } = JSON.parse(storedData);
      setEmailQuery(email);
      console.log(email);
    }

    if (emailParam) {
      const q = query(
        collection(firestore, "usuarios"),
        where("email", "==", emailQuery)
      );

      const querySnapshot = await getDocs(q);

      const userDoc = querySnapshot.docs[0];

      const data = userDoc.data();

      try {
        const url = await getDownloadURL(ref(storage, data.audioRef));
        setAudio(url);

        setUserData({
          email: data.email || "",
          firstname: data.firstname || "",
          customer_id: data.customer_id || "",
          promoid: data.promoid || "MMbear",
          trx_status: data.trx_status || "",
          order_id: data.order_id || "",
          stockUpdated: data.stockUpdated || false,
        });
      } catch (error) {
        console.error("Error al obtener URL de descarga", error);
      }
    }
  };

  useEffect(() => {
    filtrarUsuarios();
  }, []); // Ejecutar solo una vez al cargar el componente

  // useEffect para manejar la lógica después de que emailQuery se actualice
  useEffect(() => {
    const fetchData = async () => {
      if (emailQuery) {
        const q = query(
          collection(firestore, "usuarios"),
          where("email", "==", emailQuery)
        );

        const querySnapshot = await getDocs(q);
        const userDoc = querySnapshot.docs[0];

        if (userDoc) {
          const data = userDoc.data();
          try {
            const url = await getDownloadURL(ref(storage, data.audioRef));
            setAudio(url);

            setUserData({
              email: data.email || "",
              firstname: data.firstname || "",
              customer_id: data.customer_id || "",
              promoid: data.promoid || "MMbear",
              trx_status: data.trx_status || "",
              order_id: data.order_id || "",
              stockUpdated: data.stockUpdated || false,
            });
          } catch (error) {
            console.error("Error al obtener URL de descarga", error);
          }
        } else {
          console.error(
            "No se encontró ningún usuario con el email proporcionado"
          );
        }
      }
    };

    fetchData();
  }, [emailQuery]); // Ejecutar cuando emailQuery cambie

  //useEffect para capturar el estado de la compra
  useEffect(() => {
    if (userData) {
      setStatus(userData.trx_status);
    }
  }, [userData]);

  //Evento par aenviar al checkou

  const submitHandler = () => {
    const dataSend = {
      firstname: userData.firstname,
      customer_id: userData.customer_id,
      promoid: userData.promoid,
      order_id: userData.order_id,
    };

    const queryString = Object.keys(dataSend)
      .map((key) => key + "=" + encodeURIComponent(dataSend[key]))
      .join("&");
    window.location.href = `${urlAlcarrito}?${queryString}`;
  };

  //Evento para cerrar el popup

  const handleclose = () => {
    const tl = gsap.timeline();
    tl.to(".dataClient", {
      opacity: 0,
      ease: "power1.inOut",
      duration: 1,
    });
    tl.add(() => setLocalStorageOrder(false));
  };

  const vacio = status == "canceled" || status == "";

  return (
    <>
      {localStorageOrder && (
        <>
          {vacio && (
            <div className="dataClient fixed w-full h-full z-[201] bg-black bg-opacity-20 backdrop-blur-xl top-0 left-0 flexCenter">
              <div className="relative font-inter bg-white w-2/5 h-2/5 rounded-3xl flexCenter flex-col">
                <span
                  onClick={handleclose}
                  className="absolute cursor-pointer -top-12 right-6 w-6 h-6 inline-block"
                >
                  <img src="/svg/close.svg" alt="" />
                </span>
                <h2 className="text-black">{userData && userData.firstname}</h2>
                <p className="text-center my-12">
                  Cuentas con un audio pendiente para incluir en tu oso, puedes
                  revisarlo, y continuar con la compra o realizar un nuevo
                  registro
                </p>
                <audio src={audio} controls></audio>

                <button onClick={submitHandler} className="btn active my-6">
                  Ir al checkout
                </button>
                <button onClick={handleclose} className="btn ">
                  Iniciar una <br />
                  nueva grabación
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default RescatarDatos;
