import React, { useEffect, useRef, useState } from "react";
import Button from "./Button";
import { useForm } from "react-hook-form";
import Texto from "./Texto";
import AudioPlayer from "./AudioPlayer";
import data from "../data/colombia.json";
import Navbar from "./Navbar";
import axios from "axios";
import Espaciado from "./Espaciado";
import { mobile, tablet } from "../helpers/medidasResponsive";
import Onboarding from "./Onboarding";
import gsap from "gsap";
import { url, urlAlcarrito, urlAlcarritoDev, urlDev } from "../data/url";
import Frases from "./Frases";

const FormSteps = ({
  startRecording,
  stopRecording,
  status,
  mediaBlobUrl,
  setBotonAudio,
  setReproducir,
  reproducir,
}) => {
  const [paso, setpaso] = useState(1);
  const [readyToBuy, setReadyToBuy] = useState(false);
  const [anchoContenedor, setAnchoContenedor] = useState(0);
  const [mensaje, setMensaje] = useState(
    "graba un mensaje de 20 segundos. <br /> Ella lo escuchará al oprimir el botón del pecho del oso"
  );
  const [anchoHijoEnPixel, setAnchoHijoEnPixel] = useState(0);
  const [valorinicial, setValorInicial] = useState(0);
  const [irpaso6, setIrpaso6] = useState(false);
  const [translate, setTranslate] = useState(0);
  const input = useRef(null);
  const cards = useRef(null);
  const padre = useRef(null);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [onboarding, setOnboarding] = useState(true);
  const [error, setError] = useState("");
  const [audiourl, setAudiourl] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    firstname: "",
    customer_id: "",
    promoid: "MMbear",
    trx_status: "",
    order_id: "",
  });

  //console.log(formData);
  //console.log(paso);
  // console.log(status);

  useEffect(() => {
    gsap.fromTo(
      ".form",
      {
        opacity: 0,
      },
      {
        opacity: 1,
        ease: "power1.inOut",
        duration: 0.5,
        delay: 0.5,
      }
    );
  }, [onboarding]);

  // Cuando vuelves a la página
  useEffect(() => {
    // Cargar el estado isLoading desde el localStorage al montar el componente
    const localOnboarding = localStorage.getItem("onboarding");

    if (localOnboarding !== null) {
      setOnboarding(localOnboarding === "true");
    }
  }, []); // El segundo argumento [] indica que este efecto se ejecuta solo una vez al montar el componente

  /*****Mostrar paises en select */
  const handleDepartmentChange = (e) => {
    setFormData({
      ...formData,
      region_id: e.target.value,
    });
    const departmentName = e.target.value;

    setSelectedDepartment(departmentName);
    const department = data.find((dept) => dept.region_id == departmentName);
    if (department) {
      setCities(department.ciudades);
    } else {
      setCities([]);
    }
  };
  useEffect(() => {
    if (cards.current) {
      const contenedorWidth = cards.current.offsetWidth;

      setAnchoContenedor(contenedorWidth);

      // Calcula el ancho en píxeles para cada hijo
      const hijosDirectos = cards.current.children.length;
      const anchoHijo = contenedorWidth / hijosDirectos;
      setAnchoHijoEnPixel(mobile ? anchoHijo : anchoHijo);
      setTranslate(mobile ? anchoHijo / 1.2 : anchoHijo / 2);
      setValorInicial(anchoHijo);
    }
  }, [cards, padre, onboarding]);

  const nextSlide = (valorFinal, valorinicial, anchoHijoEnPixel) => {
    const incial = mobile ? valorinicial * 1.2 : valorinicial * 2;
    const division = mobile ? valorinicial / 1.2 : valorinicial / 2;
    const valor = valorFinal - incial + division;

    setTranslate((prevIndex) =>
      prevIndex >= valor ? valor : prevIndex + anchoHijoEnPixel
    );
    setTimeout(() => {
      setpaso((prevIndex) => (prevIndex >= 11 ? 11 : prevIndex + 1));
    }, 400); // Retraso de 100 milisegundos
  };

  const prevSlide = (valorinicial, anchoHijoEnPixel) => {
    const valor = mobile ? valorinicial / 1.2 : valorinicial / 2;
    setTranslate((prevIndex) =>
      prevIndex <= valor ? valor : prevIndex - anchoHijoEnPixel
    );

    setTimeout(() => {
      setpaso((prevIndex) => (prevIndex <= 1 ? 1 : prevIndex - 1));
    }, 400);
  };

  /* Formulario */

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  /***********Funcion de envio de datos */
  const submitHandler = async (e) => {
    nextSlide(anchoContenedor, valorinicial, anchoHijoEnPixel);

    if (!audiourl) {
      setError("Por favor, graba un audio antes de enviar el formulario.");
      alert("Por favor, graba un audio antes de enviar el formulario.");
      return;
    }

    setIsLoading(true);
    setOnboarding(false);
    localStorage.setItem("onboarding", "false");
    setError("");

    try {
      const audioBlob = await fetch(audiourl).then((r) => r.blob());
      const data = new FormData();
      data.append("formData", JSON.stringify(formData));
      data.append("audio", audioBlob, "audio.mp3");

      // Guardar formData y audioBlob en localStorage
      localStorage.setItem("formData", JSON.stringify(formData));
      //localStorage.setItem("audioBlob", audioBlob);

      const response = await axios.post(`${url}/submit-form`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Datos y audio enviados con éxito", response.data);

      //setIsLoading(false);
      // Redirigir al usuario a la URL con los parámetros en la cadena de consulta
      const dataSend = {
        firstname: formData.firstname,
        customer_id: formData.customer_id,
        promoid: formData.promoid,
      };
      const queryString = Object.keys(dataSend)
        .map((key) => key + "=" + encodeURIComponent(dataSend[key]))
        .join("&");
      window.location.href = `${urlAlcarritoDev}?${queryString}`;
    } catch (error) {
      console.error("Error al enviar los datos y audio", error);
      setError("Error al enviar el formulario. Por favor, inténtalo de nuevo.");
      //setIsLoading(false);
    }
  };

  const handleNextStep = async (data) => {
    const newFormData = { ...formData, ...data };

    submitHandler(newFormData);
  };
  useEffect(() => {
    const handleTabKey = (event) => {
      if (event.key === "Tab" || event.key === "Enter") {
        event.preventDefault();
      }
    };

    document.addEventListener("keydown", handleTabKey);

    return () => {
      document.removeEventListener("keydown", handleTabKey);
    };
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === "Tab") {
      nextSlide(anchoContenedor, valorinicial, anchoHijoEnPixel);
      setMensaje(
        `${formData.firstname}, graba un mensaje de 20 segundos. <br /> 
        Ella lo escuchará al oprimir el botón del pecho del oso`
      );
      updateUsername();
    }
  };

  // Función para generar un número aleatorio de 6 dígitos
  const generateRandomNumber = () => {
    return Math.floor(100000 + Math.random() * 900000);
  };

  // Función para actualizar el username
  const updateUsername = () => {
    if (formData.firstname) {
      const randomNumber = generateRandomNumber();
      const newUsername = `${formData.firstname}${randomNumber}`;
      setFormData({
        ...formData,
        customer_id: newUsername,
      });
    } else {
      console.error("Firstname is required to generate username");
    }
  };

  return (
    <>
      {onboarding && <Onboarding setOnboarding={setOnboarding} />}

      {!onboarding && (
        <form
          onSubmit={handleSubmit(handleNextStep)}
          className="form w-full h-full max-lg:overflow-hidden"
        >
          <div ref={padre} className="slidecards">
            {/* navbar menu hamburgesa*/}

            <div className="lg:h-[36rem] max-lg:min-h-[25rem] w-full relative">
              {/* Cards formulario */}
              <div
                ref={cards}
                style={{ transform: `translateX(-${translate}px)` }}
                className="cards"
              >
                {/* Caja vacia */}
                <div
                  className="cardPadre"
                  style={{ width: `${anchoHijoEnPixel}px` }}
                >
                  <div className={`cardSingle  `}></div>
                </div>

                {/* Formulario de nombre   */}

                <div
                  className="cardPadre"
                  style={{ width: `${anchoHijoEnPixel}px` }}
                >
                  <div className={`cardSingle `}>
                    <div
                      className={`cajaCard ${
                        paso == 1 ? "opacity-100" : " Effectblur"
                      }  ${paso > 1 && "none"}`}
                    >
                      <Espaciado />

                      <div className="w-full">
                        <div className="flex flex-col w-full">
                          <p className="titulosForm">
                            Primero, ¿cuál es tu nombre?
                          </p>
                          <input
                            type="text"
                            placeholder="Nombre"
                            value={formData.firstname}
                            {...register("firstname", {
                              required: "Nombre es requerido",
                            })}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                firstname: e.target.value,
                              })
                            }
                            onKeyDown={(e) => {
                              if (formData.firstname !== "") {
                                if (e.key === "Tab" || e.key === "Enter") {
                                  document.querySelector(".email").focus();
                                }
                              }
                            }}
                          />
                        </div>
                        <div className="flex flex-col w-full">
                          <p className="titulosForm">¿Tu e-mail?</p>

                          <input
                            type="email"
                            className="email"
                            placeholder="Correo"
                            value={formData.email}
                            {...register("email", {
                              required: "El email es requerido",
                            })}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                email: e.target.value,
                              })
                            }
                            onKeyDown={(e) => {
                              if (formData.email !== "") {
                                handleKeyDown(e);
                              }
                            }}
                          />
                        </div>
                      </div>

                      <span
                        onClick={() => {
                          updateUsername();
                          nextSlide(
                            anchoContenedor,
                            valorinicial,
                            anchoHijoEnPixel
                          );
                          setMensaje(
                            `${formData.firstname}, graba en máximo 20 segundos el mensaje
                  que quieres hacerle llegar a esa persona especial`
                          );
                        }}
                        className={`cursor-pointer text-center btn hoverBtn btnGrabadora ${
                          formData.firstname !== "" && formData.email !== ""
                            ? "active"
                            : "disable"
                        }`}
                      >
                        <Texto title={"Continuar"} />
                      </span>
                    </div>
                  </div>
                </div>

                {/* Funcion grabar audio */}

                <div
                  className="cardPadre"
                  style={{ width: `${anchoHijoEnPixel}px` }}
                >
                  <div className={`cardSingle ${paso > 2 && "opacity-0"}`}>
                    <div
                      className={`cajaCard ${
                        paso == 2 ? "opacity-100" : " Effectblur"
                      }  ${paso > 2 && "none"}`}
                    >
                      <Espaciado />
                      <div className="w-full flexCenter flex-col">
                        <div className="w-full">
                          <p
                            className="titulosForm"
                            dangerouslySetInnerHTML={{ __html: mensaje }}
                          />

                          <AudioPlayer
                            setMensaje={setMensaje}
                            audiourl={audiourl}
                            setAudiourl={setAudiourl}
                            startRecording={startRecording}
                            setIrpaso6={setIrpaso6}
                            stopRecording={stopRecording}
                            status={status}
                            mediaBlobUrl={mediaBlobUrl}
                            setBotonAudio={setBotonAudio}
                            setReproducir={setReproducir}
                            reproducir={reproducir}
                            funcionNext={() => {
                              nextSlide(
                                anchoContenedor,
                                valorinicial,
                                anchoHijoEnPixel
                              );
                              setReadyToBuy(true);
                            }}
                          />
                        </div>
                      </div>
                      <Espaciado />
                    </div>
                  </div>
                </div>

                {/* Mensaje de confirmación y boton de compra */}

                <div
                  className="cardPadre"
                  style={{ width: `${anchoHijoEnPixel}px` }}
                >
                  <div className={`cardSingle  ${paso > 3 && "opacity-0"}`}>
                    <div
                      className={`cajaCard ${
                        paso == 3 ? "opacity-100" : " Effectblur"
                      }  ${paso > 3 && "none"}`}
                    >
                      <Espaciado />
                      <div className="w-full flexCenter flex-col">
                        <p className="font-inter text-center font-normal w-full mb-6">
                          Estás a punto de hacer tu misión más importante.
                        </p>
                        <p className="font-inter text-center font-normal w-full mb-4">
                          Bienvenido a:
                        </p>
                        <span className="w-full h-auto inline-block relative">
                          <img
                            src="/svg/logo-operacion-mayo.svg"
                            alt="Operación mayo"
                          />
                        </span>
                      </div>

                      <div className="btnCompra flexCenter w-full">
                        <Button
                          type={true}
                          title={"comprar"}
                          custoMStyle={`${
                            readyToBuy
                              ? "opacity-100 pointer-events-all"
                              : "opacity-30 pointer-events-none"
                          } cursor-pointer text-center btn hoverBtn btnGrabadora`}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Ir al carrito */}

                <div
                  className="cardPadre"
                  style={{ width: `${anchoHijoEnPixel}px` }}
                >
                  <div className={`cardSingle  ${paso > 4 && "opacity-0"}`}>
                    <div
                      className={`cajaCard ${
                        paso == 4 ? "opacity-100" : " Effectblur"
                      }  ${paso > 4 && "none"}`}
                    >
                      <Espaciado />

                      <div className="flex flex-col h-80 items-center justify-evenly w-full">
                        {isLoading && (
                          <>
                            <p className="text-center font-normal w-full mt-6">
                              <Frases />
                            </p>
                            <span className=" w-3/5 h-auto">
                              <img src="/imagenes/Logoalcarrito.webp" alt="" />
                            </span>
                            <div className="spinner"></div>
                          </>
                        )}
                      </div>

                      <Espaciado />
                    </div>
                  </div>
                </div>
              </div>

              <div
                style={{
                  width: `${anchoHijoEnPixel + "px"}`,
                }}
                className="btns mx-auto absolute floatcenter"
              >
                {paso > 1 && (
                  <span
                    onClick={() => prevSlide(valorinicial, anchoHijoEnPixel)}
                    className="cursor-pointer absolute left-0 lg:translate-x-[-100%] rotate-180 inline-block w-6 h-auto"
                  >
                    <img src="/svg/next.svg" alt="" />
                  </span>
                )}
                {paso < 3 && (
                  <span
                    onClick={() =>
                      nextSlide(anchoContenedor, valorinicial, anchoHijoEnPixel)
                    }
                    className={`cursor-pointer absolute  right-0 inline-block w-6 h-auto ${
                      paso === 4 || (paso === 2 && irpaso6)
                        ? "activebtn"
                        : paso === 1 &&
                          formData.firstname !== "" &&
                          formData.email !== ""
                        ? "activebtn"
                        : "disable"
                    }`}
                  >
                    <img src="/svg/next.svg" alt="" />
                  </span>
                )}
              </div>
            </div>
            {/* Barra de progreso*/}

            <div className="overflow-hidden rounded-3xl xs:w-2/5 lg:w-1/3 h-[8px] relative max-lg:my-2">
              <div className="maskChild absolute top-0 left-0 inline-block w-full h-full bg-[--yellow] opacity-35"></div>

              <div
                style={{ width: `${paso <= 1 ? 0 : (paso / 4) * 100}%` }}
                className=" rounded-e-3xl transition-all ease-out duration-1000 absolute z-50 top-0 left-0 inline-block h-full w-10 bg-[--yellow] "
              ></div>
            </div>
          </div>
        </form>
      )}
    </>
  );
};

export default FormSteps;
