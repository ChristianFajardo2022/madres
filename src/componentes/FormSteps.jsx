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
    firstname: "",
    username: "",
    promoid: "MMbear",
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
      setOnboarding(localOnboarding === "false");
    }
  }, []); // El segundo argumento [] indica que este efecto se ejecuta solo una vez al montar el componente

  /*****Mostrar paises en select */
  const handleDepartmentChange = (e) => {
    setFormData({
      ...formData,
      region_id: e.target.value,
    });
    const departmentName = e.target.value;
    console.log(departmentName);
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
    console.log(e);

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

      const response = await axios.post(
        "https://audiosmadres.onrender.com/submit-form",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Datos y audio enviados con éxito", response.data);
      alert("¡Formulario enviado con éxito!");
      //setIsLoading(false);
      // Redirigir al usuario a la URL con los parámetros en la cadena de consulta
      const queryString = Object.keys(formData)
        .map((key) => key + "=" + encodeURIComponent(formData[key]))
        .join("&");
      window.location.href = `https://www.alcarrito.com/checkout/#shipping?${queryString}`;
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
    }
  };

  return (
    <>
      {isLoading && <>cargando...</>}

      {onboarding && <Onboarding setOnboarding={setOnboarding} />}

      {!isLoading && !onboarding && (
        <form
          onSubmit={handleSubmit(handleNextStep)}
          className="form w-full h-full overflow-hidden"
        >
          <div
            ref={padre}
            className="slidecards w-full h-full lg:relative items-center flex flex-col  justify-evenly max-lg:pb-4  "
          >
            {/* navbar menu hamburgesa*/}

            <div className="lg:h-[36rem] max-lg:min-h-[25rem] w-full relative">
              {/* Cards formulario */}
              <div
                ref={cards}
                style={{ transform: `translateX(-${translate}px)` }}
                className=" font-inter cards h-full lg:w-[122vw] xs:w-[375vw] sm:w-[200vw] relative text-white flex justify-between items-center"
              >
                <div
                  className="cardPadre"
                  style={{ width: `${anchoHijoEnPixel}px` }}
                >
                  <div className={`cardSingle  `}></div>
                </div>

                {/* Mensaje Bienvenida */}

                <div
                  className="cardPadre"
                  style={{ width: `${anchoHijoEnPixel}px` }}
                >
                  <div
                    className={`cardSingle  ${
                      paso == 1 ? "opacity-100" : "opacity-40"
                    }`}
                  >
                    <div className="cajaCard">
                      <Espaciado />
                      <div className="w-full flexCenter flex-col">
                        <span className="w-full h-auto inline-block relative">
                          <img
                            src="/logo-operacion-mayo.svg"
                            alt="Operación mayo"
                          />
                        </span>
                        <p className=" font-normal w-full mt-6">
                          Hacer llegar este oso a las manos de su abuela, fue la
                          misión más importante del soldado ramírez. Tú también
                          puedes decir feliz día mamá con un oso como este.
                        </p>
                      </div>

                      <span
                        onClick={() =>
                          nextSlide(
                            anchoContenedor,
                            valorinicial,
                            anchoHijoEnPixel
                          )
                        }
                        className=" cursor-pointer text-center btn hoverBtn btnGrabadora"
                      >
                        <Texto title={"Empezar"} />
                      </span>
                    </div>
                  </div>
                </div>

                {/* Formulario de nombre   */}

                <div
                  className="cardPadre"
                  style={{ width: `${anchoHijoEnPixel}px` }}
                >
                  <div
                    className={`cardSingle ${
                      paso == 2 ? "opacity-100" : "opacity-40"
                    }`}
                  >
                    <div className="cajaCard">
                      <Espaciado />

                      <div className="w-full">
                        <p className="titulosForm">
                          ¿Cómo te llamas y cual es tu email?
                        </p>
                        <div className="flex flex-col w-full">
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
                          <input
                            type="email"
                            className="email"
                            placeholder="Correo"
                            value={formData.username}
                            {...register("username", {
                              required: "El email es requerido",
                            })}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                username: e.target.value,
                              })
                            }
                            onKeyDown={(e) => {
                              if (formData.username !== "") {
                                handleKeyDown(e);
                              }
                            }}
                          />
                        </div>
                      </div>

                      <span
                        onClick={() => {
                          nextSlide(
                            anchoContenedor,
                            valorinicial,
                            anchoHijoEnPixel
                          );
                          setMensaje(
                            `${formData.firstname}, graba un mensaje de 20 segundos. <br /> 
                  Ella lo escuchará al oprimir el botón del pecho del oso`
                          );
                        }}
                        className={`cursor-pointer text-center btn hoverBtn btnGrabadora ${
                          formData.firstname !== "" ? "active" : "disable"
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
                  <div
                    className={`cardSingle   ${
                      paso == 3 ? "opacity-100" : "opacity-40"
                    }`}
                  >
                    <div className="cajaCard">
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
                  <div
                    className={`cardSingle  ${
                      paso == 4 ? "opacity-100" : "opacity-40"
                    }`}
                  >
                    <div className="cajaCard">
                      <Espaciado />
                      <div className="w-full flexCenter flex-col">
                        <p className="font-inter text-center font-normal w-full mb-6">
                          Estás a punto de hacer tu misión más importante
                        </p>
                        <p className="font-inter text-center font-normal w-full mb-4">
                          bienvenido a la
                        </p>
                        <span className="w-full h-auto inline-block relative">
                          <img
                            src="/logo-operacion-mayo.svg"
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
              </div>

              {/* Botones de siguiente y atras*/}
              <div
                style={{
                  width: `${anchoHijoEnPixel + "px"}`,
                }}
                className="btns mx-auto absolute floatcenter"
              >
                {paso > 1 && (
                  <span
                    onClick={() => prevSlide(valorinicial, anchoHijoEnPixel)}
                    className="cursor-pointer absolute left-[-0.5rem] rotate-180 inline-block w-6 h-auto"
                  >
                    <img src="/svg/next.svg" alt="" />
                  </span>
                )}
                {paso < 4 && (
                  <span
                    onClick={() =>
                      nextSlide(anchoContenedor, valorinicial, anchoHijoEnPixel)
                    }
                    className={`cursor-pointer absolute right-[-0.5rem] inline-block w-6 h-auto ${
                      paso === 1 || paso === 4 || (paso === 3 && irpaso6)
                        ? "activebtn"
                        : paso === 2 && formData.firstname !== ""
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
