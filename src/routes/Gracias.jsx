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

const Gracias = () => {
  const [loading, setLoading] = useState(true);
  // Estado para guardar los datos del usuario
  const [userData, setUserData] = useState(null);
  const [status, setStatus] = useState("null");
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
      //console.log(status);
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
  return (
    <>
      <div className="w-full h-full relative">
        <div className="z-50 hamburger text-white inter">
          <Navbar />
        </div>
        <div className="w-full h-full  ">
          {loading && <LoadingEnd elemtCargado={elemtCargado} />}
          {(mobile || tablet) && (
            <img
              onLoad={() => setElemtCargado(true)}
              className="osoVideo oso absolute left-0 z-[-1]"
              src={tablet ? "/oso-fondo-tablet.jpg" : "/oso-fondo-mobile.jpg"}
              alt=""
            />
          )}

          {(full || laptop || minilaptop) && (
            <LoadVideo
              onLoadedData={() => setElemtCargado(true)}
              customStyle={"osoVideo absolute left-0 z-[-1]"}
              videoLoad={videoLoad}
              url={"/videoBear.mp4"}
              loop={true}
            />
          )}

          <div className="lg:p-8 xs:p-0 w-full h-full flex max-lg:flex-col relative justify-between items-center">
            <div className="cajaOso z-20 flex flex-col relative justify-center items-center lg:w-1/2 xs:w-1/2 lg:h-full xs:h-[45%]">
              {/*           <p className="py-4">{status}</p> */}
              <Texto
                customstyle={"absolute top-6"}
                title={
                  <>
                    <p className="lg:text-4xl xs:text-lg">
                      <span className="text-[var(--yellow)]">
                        osos disponibles: 827
                      </span>
                    </p>
                  </>
                }
              />
              <Texto
                customstyle={"absolute bottom-0"}
                title={
                  <>
                    <p className="lg:text-4xl xs:text-lg">
                      <span className="text-[var(--yellow)]">
                        ANTES: $80.000
                      </span>
                    </p>
                    <p className="lg:text-6xl xs:text-4xl">
                      <span className="text-[var(--yellow)]">AHORA: $0</span>
                    </p>
                  </>
                }
              />
            </div>
            <div className="cajaCards z-10 flexCenter flex-col lg:w-1/2 xs:w-full lg:border lg:border-white lg:h-full xs:h-[55%] rounded-3xl ">
              <div>
                {error ? (
                  <>
                    <h1 className="w-1/2 m-auto mb-6 text-center">
                      Compre ahora su oso y envieselo a su madre
                    </h1>
                    <Link className="btn w-1/2 m-auto" to="/grabar-audio">
                      {" "}
                      ir ahora
                    </Link>
                  </>
                ) : (
                  <>
                    {userData ? (
                      <div>
                        <h1 className=" w-1/2 m-auto mb-6 text-center">
                          Gracias compra realizada con exito
                        </h1>
                        {userData.map((user, index) => (
                          <div
                            className="w-1/2 m-auto text-[--yellow]"
                            key={index}
                          >
                            <p>Nombre: {user.firstname}</p>
                            <p>email: {user.email}</p>
                            <p>Estado de la transaccion: {user.trx_status}</p>
                            <p>Id transaccion: {user.order_id}</p>
                            {/* Añade más campos si es necesario */}
                          </div>
                        ))}
                        <h2 className="w-1/2 m-auto my-6 text-center">
                          realizar una nueva grabacion
                        </h2>
                        <Link className="btn w-1/2 m-auto" to="/grabar-audio">
                          {" "}
                          ir ahora
                        </Link>
                      </div>
                    ) : (
                      <p>Cargando datos del usuario...</p>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Gracias;