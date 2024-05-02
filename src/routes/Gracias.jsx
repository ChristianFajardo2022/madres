import React, { useState, useEffect, useRef } from "react";
import Texto from "../componentes/Texto";
import Navbar from "../componentes/Navbar";
import LoadVideo from "../componentes/LoadVideo";
import LoadingEnd from "../componentes/Loading";
import {
  full,
  laptop,
  minilaptop,
  mobile,
  tablet,
} from "../helpers/medidasResponsive";
import gsap from "gsap";
import { Link } from "react-router-dom";
import { url, urlDev } from "../data/url";
import Explora from "../componentes/Explora";
import CompartirContenido from "../componentes/CompartirContenido";
import { Helmet } from "react-helmet";

const Gracias = () => {
  const [loading, setLoading] = useState(true);
  // Estado para guardar los datos del usuario
  const [userData, setUserData] = useState(null);
  const [status, setStatus] = useState(null);
  // Estado para manejar errores de la solicitud
  const [error, setError] = useState(null);
  const videoLoad = useRef(null);
  const [elemtCargado, setElemtCargado] = useState(false);

  useEffect(() => {
    // Función para obtener los datos del usuario
    function fetchUserData() {
      // Obtener el  customer_id desde localStorage
      const storedData = localStorage.getItem("formData");
      if (!storedData) {
        setError("No user data in localStorage.");
        return;
      }
      const { customer_id } = JSON.parse(storedData);

      if (!customer_id) {
        setError(" customer_id not found in local storage.");
        return;
      }

      fetch(
        `${url}/get-user-data?customer_id=${encodeURIComponent(customer_id)}`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            setUserData(data.data);
          } else {
            setError("Error fetching data: " + data.message);
          }
        })
        .catch((error) => {
          console.error("Network error:", error);
          setError("Network error: " + error.message);
        });
    }

    fetchUserData();
  }, []);

  useEffect(() => {
    if (userData) {
      setStatus(userData[0].trx_status);
      console.log(status);
    }
  }, [userData]);

  // Ejecutar el loading

  useEffect(() => {
    if (elemtCargado) {
      avanzar();
    }
  }, [elemtCargado]);

  const avanzar = () => {
    const tl = gsap.timeline();
    tl.delay(1);
    tl.to(".loading", {
      opacity: "0",
      ease: "power1.inOut",
      duration: 1,
    });
    tl.add(() => {
      setLoading(false);
    });
  };

  const vacio = status == null || status == "";
  console.log(vacio);
  return (
    <>
      <Helmet>
        <title>Gracias - operación mayo</title>
        <link rel="canonical" href="/gracias" />
        <meta
          name="description"
          content="Gracias por ser parte de esta entrega"
        />
      </Helmet>
      <div className={`w-full relative  ${vacio ? "h-[100vh]" : "h-[200vh]"}`}>
        {loading && <LoadingEnd elemtCargado={elemtCargado} />}

        <div id="graba" className="w-full h-screen ">
          {vacio ? (
            <img
              onLoad={() => setElemtCargado(true)}
              className={"osoVideo oso absolute left-0 z-[-1]"}
              src={
                tablet
                  ? "/imagenes/graciasNone.webp"
                  : mobile
                  ? "/imagenes/bg-graciasNoneM.webp"
                  : "/imagenes/bg-graciasNone.webp"
              }
              alt=""
            />
          ) : (
            <img
              onLoad={() => setElemtCargado(true)}
              className={"osoVideo oso absolute left-0 z-[-1]"}
              src={
                tablet
                  ? "/imagenes/bg-gracias.webp"
                  : mobile
                  ? "/imagenes/GRACIAS-OSOM.webp"
                  : "/imagenes/bg-gracias.webp"
              }
              alt=""
            />
          )}

          <div className="lg:p-8 xs:p-0 w-full h-full flex max-lg:flex-col relative justify-between items-center">
            <div className=" w-full relative h-full flex flex-col items-center justify-between pb-48">
              <h1 className="w-fit min-w-[28rem] flexCenter pt-6 flex-col">
                <span className="flex flex-col justify-between h-[0.4rem] w-full ">
                  <span className="h-[1px] w-full bg-[--yellow]"></span>
                  <span className="h-[1px] w-full bg-[--yellow]"></span>
                </span>

                <span className="flex items-center justify-between w-full">
                  <span className="w-4 h-4 inline-block">
                    <img src="/svg/estrella.svg" alt="" />
                  </span>
                  <span className="my-2 ml-4 mr-3 lg:text-6xl xs:text-5xl uppercase">
                    {vacio && "OPERACIÓN MAYO"}
                    {status === "approved" && "GRACIAS POR TU ENTREGA"}
                    {status === "pending" && "GRACIAS POR TU ENTREGA"}
                    {status === "canceled" && "misión fallida"}
                    {status === "rejected" && "misión fallida"}
                  </span>
                  <span className="w-4 h-4 inline-block">
                    <img src="/svg/estrella.svg" alt="" />
                  </span>
                </span>
                <span className="flex flex-col justify-between h-[0.4rem] w-full ">
                  <span className="h-[1px] w-full bg-[--yellow]"></span>
                  <span className="h-[1px] w-full bg-[--yellow]"></span>
                </span>
              </h1>

              <div className="flex flex-col items-center px-[3rem] w-full">
                {error || vacio ? (
                  <>
                    <h2 className="w-full m-auto mb-6 text-center">
                      Graba un mensaje y envíaselo a los <br />
                      que entendieron la entrega de ser mamá
                    </h2>
                  </>
                ) : (
                  <>
                    {userData ? (
                      <>
                        {userData.map((user, index) => (
                          <div
                            className="w-fit text-[--yellow] font-inter font-semibold mb-6"
                            key={index}
                          >
                            <p className="text-6xl mb-6 text-white capitalize">
                              {user.firstname}
                            </p>

                            <div className="cajatransaccion flex items-center">
                              <span className="w-12 h-12 inline-block mr-4">
                                <img
                                  src={
                                    status === "approved"
                                      ? "/svg/aprobado.svg"
                                      : status === "pending"
                                      ? "/svg/proceso.svg"
                                      : status === "canceled"
                                      ? "/svg/cancelado.svg"
                                      : status === "rejected"
                                      ? "/svg/rechazado.svg"
                                      : ""
                                  }
                                  alt=""
                                />
                              </span>
                              <div className="cajatransaccionDatos">
                                <p className="text-3xl">
                                  {status === "approved" && "Envío aprobado"}
                                  {status === "pending" && "Envío en proceso"}
                                  {status === "canceled" && "Envío cancelado"}
                                  {status === "rejected" && "Envío rechazado"}
                                </p>
                                <p className="text-3xl">
                                  <span className="text-white">
                                    Id-compra:{" "}
                                  </span>
                                  {status === "approved" && user.order_id}
                                  {status === "pending" && user.order_id}
                                  {status === "canceled" && ""}
                                  {status === "rejected" && ""}
                                </p>
                              </div>
                            </div>
                            {/* Añade más campos si es necesario */}
                          </div>
                        ))}
                      </>
                    ) : (
                      <p>Cargando datos del usuario...</p>
                    )}
                  </>
                )}
                <div className="flex flex-col items-center justify-between w-full ">
                  <Link
                    className="btn graciasBtn active my-6 text-xl"
                    to="/grabar-audio"
                  >
                    {/* Posible eliminacion */}
                    {vacio ? "Iniciar" : "Regresar al Home"}
                  </Link>

                  {!vacio && (
                    <a className="btn graciasBtn text-xl" href="#explora">
                      detrás de cámaras
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        {!vacio && (
          <div id="explora" className="w-full h-screen  relative">
            <Explora />
          </div>
        )}
      </div>
      {!vacio && (
        <div
          id="compartir"
          className="w-full h-screen bg-black relative flexCenter text-[--yellow]"
        >
          <CompartirContenido
            texto={
              "En operacionmayo.com puedes grabar un mensaje de voz para enviárselo a mamá dentro de un osito peluche para celebrar el Día de las Madres. 🤩 🥰"
            }
            url={"operacionmayo.com"}
          />
        </div>
      )}
    </>
  );
};

export default Gracias;
