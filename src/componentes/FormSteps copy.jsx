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

const FormSteps = ({ startRecording, stopRecording, status, mediaBlobUrl }) => {
  const [paso, setpaso] = useState(1);
  const [anchoContenedor, setAnchoContenedor] = useState(0);
  const [mensaje, setMensaje] = useState(
    "Dile en 20 segundos todo lo que sientes"
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
  const [error, setError] = useState("");
  const [audiourl, setAudiourl] = useState("");
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    tipo_identificacion_usuario: "",
    numero_identificacion_usuario: "",
    username: "",
    telephone: "",
    nombreDestino: "",
    apellidoDestino: "",
    pais: "Colombia",
    region_id: "",
    city: "",
    street: "",
    promoid: "MMbear",
  });

  //console.log(formData);
  //console.log(paso);
  // console.log(status);

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
  }, [cards, padre]);

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
    if (!audiourl) {
      setError("Por favor, graba un audio antes de enviar el formulario.");
      alert("Por favor, graba un audio antes de enviar el formulario.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const audioBlob = await fetch(audiourl).then((r) => r.blob());
      const data = new FormData();
      data.append("formData", JSON.stringify(formData));
      data.append("audio", audioBlob, "audio.mp3");

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
      setIsLoading(false);
    } catch (error) {
      console.error("Error al enviar los datos y audio", error);
      setError("Error al enviar el formulario. Por favor, inténtalo de nuevo.");
      setIsLoading(false);
    }
  };

  const handleNextStep = async (data) => {
    const newFormData = { ...formData, ...data };

    if (paso < 11) {
      nextSlide(anchoContenedor, valorinicial, anchoHijoEnPixel);
    } else {
      submitHandler(newFormData);
    }
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
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleNextStep)}
      className="w-full h-full overflow-hidden"
    >
      <div
        ref={padre}
        className="slidecards w-full h-full lg:relative items-center flex flex-col  justify-evenly max-lg:pb-4  "
      >
        {/* navbar menu hamburgesa*/}

        <div className="lg:h-[32rem] max-lg:min-h-40 w-full relative">
          {/* Cards formulario */}
          <div
            ref={cards}
            style={{ transform: `translateX(-${translate}px)` }}
            className=" cards"
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
                    <span className="w-14 h-auto inline-block relative">
                      <img src="/svg/heart.svg" alt="" />
                    </span>
                    <p className=" font-normal w-full lg:mt-6 xs:mt-2 px-2">
                      Este día de la madre puedes dar un regalo tan lleno de
                      historia como este
                    </p>
                  </div>

                  <span
                    onClick={() =>
                      nextSlide(anchoContenedor, valorinicial, anchoHijoEnPixel)
                    }
                    className="cursor-pointer text-center btn hoverBtn btnGrabadora"
                  >
                    <Texto title={"Empezar"} />
                  </span>
                </div>
              </div>
            </div>

            {/* Formulario de nombre y apellido */}

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
                    <p className="titulosForm">¿Cómo te llamas?</p>
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
                            if (e.key === "Enter" || e.key === "Tab") {
                              document.querySelector(".lastname").focus();
                            }
                          }
                        }}
                      />
                      {errors.firstname && (
                        <p className="errors">{errors.firstname.message}</p>
                      )}

                      <input
                        ref={input}
                        type="text"
                        className="lastname"
                        placeholder="Apellido"
                        value={formData.lastname}
                        {...register("lastname", {
                          required: "Apellido es requerido",
                        })}
                        onChange={(e) =>
                          setFormData({ ...formData, lastname: e.target.value })
                        }
                        onKeyDown={(e) => {
                          if (
                            formData.firstname !== "" &&
                            formData.lastname !== ""
                          ) {
                            handleKeyDown(e);
                          }
                        }}
                      />
                      {errors.lastname && (
                        <p className="errors">{errors.lastname.message}</p>
                      )}
                    </div>
                  </div>

                  <span
                    onClick={() =>
                      nextSlide(anchoContenedor, valorinicial, anchoHijoEnPixel)
                    }
                    className={`cursor-pointer text-center btn hoverBtn btnGrabadora ${
                      formData.nombre !== "" && formData.lastname !== ""
                        ? "active"
                        : "disable"
                    }`}
                  >
                    <Texto title={"Continuar"} />
                  </span>
                </div>
              </div>
            </div>

            {/* Formulario de Tipo de documento y numero */}

            <div
              className="cardPadre"
              style={{ width: `${anchoHijoEnPixel}px` }}
            >
              <div
                className={`cardSingle ${
                  paso == 3 ? "opacity-100" : "opacity-40"
                }`}
              >
                <div className="cajaCard">
                  <Espaciado />

                  <div className="w-full">
                    <p className="titulosForm">
                      ¿Cuál es tu tipo y número de documento?
                    </p>
                    <div className="flex flex-col w-full">
                      <select
                        {...register("tipo_identificacion_usuario", {
                          required: "Selecciona tu tipo de documento",
                        })}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            tipo_identificacion_usuario: e.target.value,
                          })
                        }
                      >
                        <option value="">Tipo de documento</option>
                        <option value="308">Cédula de ciudadanía</option>
                        <option value="311">Cédula de extranjería</option>
                        <option value="314">Tarjeta de identidad</option>
                        <option value="433">
                          Número de identificación tributaria
                        </option>
                      </select>
                      {errors.tipo_identificacion_usuario && (
                        <p className="errors">
                          {errors.tipo_identificacion_usuario.message}
                        </p>
                      )}

                      <input
                        type="number"
                        placeholder="Numero"
                        style={{ appearance: "textfield" }} // Agrega esta línea
                        value={formData.numero_identificacion_usuario}
                        {...register("numero", {
                          required: "Número es requerido",
                          minLength: {
                            value: 5,
                            message: "Mínimo 5 caracteres",
                          },
                        })}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            numero_identificacion_usuario: e.target.value,
                          })
                        }
                        inputMode="numeric"
                        onKeyDown={(e) => {
                          if (
                            formData.tipo_identificacion_usuario !== "" &&
                            formData.numero_identificacion_usuario !== "" &&
                            formData.numero_identificacion_usuario.length > 5
                          ) {
                            handleKeyDown(e);
                          }
                        }}
                      />
                      {errors.numero && (
                        <p className="errors">{errors.numero.message}</p>
                      )}
                    </div>
                  </div>

                  <span
                    onClick={() =>
                      nextSlide(anchoContenedor, valorinicial, anchoHijoEnPixel)
                    }
                    className={`cursor-pointer text-center btn hoverBtn btnGrabadora ${
                      formData.tipo_identificacion_usuario !== "" &&
                      formData.numero_identificacion_usuario !== "" &&
                      formData.numero_identificacion_usuario.length > 5
                        ? "active"
                        : "disable"
                    }`}
                  >
                    <Texto title={"Continuar"} />
                  </span>
                </div>
              </div>
            </div>

            {/* Mensaje de grabar el mensaje */}

            <div
              className="cardPadre"
              style={{ width: `${anchoHijoEnPixel}px` }}
            >
              <div
                className={`cardSingle ${
                  paso == 4 ? "opacity-100" : "opacity-40"
                }`}
              >
                <div className="cajaCard">
                  <Espaciado />
                  <div className="w-full flexCenter flex-col">
                    <p className="font-inter text-center font-normal w-full  ">
                      <span className="capitalize">
                        {formData.firstname}, <br />
                      </span>
                      graba un mensaje para esa persona que te cuidó como a un
                      hijo y nosotros se lo haremos llegar dentro de un oso
                      igual a este
                    </p>
                  </div>

                  <span
                    onClick={() =>
                      nextSlide(anchoContenedor, valorinicial, anchoHijoEnPixel)
                    }
                    className={`cursor-pointer text-center btn hoverBtn btnGrabadora `}
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
                  paso == 5 ? "opacity-100" : "opacity-40"
                }`}
              >
                <div className="cajaCard">
                  <Espaciado />
                  <div className="w-full flexCenter flex-col">
                    <div className="w-full">
                      <p className="titulosForm">{mensaje}</p>

                      <AudioPlayer
                        setMensaje={setMensaje}
                        audiourl={audiourl}
                        setAudiourl={setAudiourl}
                        startRecording={startRecording}
                        setIrpaso6={setIrpaso6}
                        stopRecording={stopRecording}
                        status={status}
                        mediaBlobUrl={mediaBlobUrl}
                        funcionNext={() =>
                          nextSlide(
                            anchoContenedor,
                            valorinicial,
                            anchoHijoEnPixel
                          )
                        }
                      />
                    </div>
                  </div>
                  <Espaciado />
                </div>
              </div>
            </div>

            {/* Mensaje de confirmación de audio */}

            <div
              className="cardPadre"
              style={{ width: `${anchoHijoEnPixel}px` }}
            >
              <div
                className={`cardSingle   ${
                  paso == 6 ? "opacity-100" : "opacity-40"
                }`}
              >
                <div className="cajaCard">
                  <Espaciado />
                  <div className="w-full flexCenter flex-col">
                    <p className="font-inter text-center font-normal w-full">
                      Perfecto, en Inter Rapidísimo nos encargaremos de que tu
                      mensaje sea recibido.
                    </p>
                  </div>

                  <span
                    onClick={() =>
                      nextSlide(anchoContenedor, valorinicial, anchoHijoEnPixel)
                    }
                    className="cursor-pointer text-center btn hoverBtn btnGrabadora"
                  >
                    <Texto title={"Continuar"} />
                  </span>
                </div>
              </div>
            </div>

            {/* A quien envia */}

            <div
              className="cardPadre"
              style={{ width: `${anchoHijoEnPixel}px` }}
            >
              <div
                className={`cardSingle ${
                  paso == 7 ? "opacity-100" : "opacity-40"
                }`}
              >
                <div className="cajaCard">
                  <Espaciado />
                  <div className="w-full">
                    <p className="titulosForm">¿A quién se lo enviaremos?</p>
                    <div className="flex flex-col w-full">
                      <input
                        type="text"
                        placeholder="Nombre"
                        value={formData.nombreDestino}
                        {...register("nombreDestino", {
                          required: "Nombre es requerido",
                        })}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            nombreDestino: e.target.value,
                          })
                        }
                        onKeyDown={(e) => {
                          if (formData.nombreDestino !== "") {
                            if (e.key === "Enter" || e.key === "Tab") {
                              document
                                .querySelector(".apellidoDestino")
                                .focus();
                            }
                          }
                        }}
                      />
                      {errors.nombre && (
                        <p className="errors">{errors.nombreDestino.message}</p>
                      )}

                      <input
                        type="text"
                        className="apellidoDestino"
                        placeholder="Apellido"
                        value={formData.apellidoDestino}
                        {...register("apellidoDestino", {
                          required: "Apellido es requerido",
                        })}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            apellidoDestino: e.target.value,
                          })
                        }
                        onKeyDown={(e) => {
                          if (
                            formData.apellidoDestino !== "" &&
                            formData.nombreDestino !== ""
                          ) {
                            handleKeyDown(e);
                          }
                        }}
                      />
                      {errors.apellidoDestino && (
                        <p className="errors">
                          {errors.apellidoDestino.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <span
                    onClick={() =>
                      nextSlide(anchoContenedor, valorinicial, anchoHijoEnPixel)
                    }
                    className={`cursor-pointer text-center btn hoverBtn btnGrabadora ${
                      formData.nombreDestino !== "" &&
                      formData.apellidoDestino !== ""
                        ? "active"
                        : "disable"
                    }`}
                  >
                    <Texto title={"Continuar"} />
                  </span>
                </div>
              </div>
            </div>

            {/* pais y region_id */}

            <div
              className="cardPadre"
              style={{ width: `${anchoHijoEnPixel}px` }}
            >
              <div
                className={`cardSingle ${
                  paso == 8 ? "opacity-100" : "opacity-40"
                }`}
              >
                <div className="cajaCard">
                  <Espaciado />
                  <div className="w-full">
                    <p className="titulosForm">¿Dónde vive?</p>
                    <div className="flex flex-col w-full">
                      <input
                        type="text"
                        placeholder="Nombre"
                        readOnly
                        value={formData.pais}
                      />

                      <select
                        {...register("region_id", {
                          required: "Selecciona Departamento de residencia",
                        })}
                        value={selectedDepartment}
                        onChange={handleDepartmentChange}
                        onKeyDown={(e) => {
                          if (formData.region_id !== "") {
                            handleKeyDown(e);
                          }
                        }}
                      >
                        <option value="">Seleccione un Departamento</option>
                        {data.map((department) => (
                          <option
                            key={department.id}
                            value={department.region_id}
                          >
                            {department.departamento}
                          </option>
                        ))}
                      </select>

                      {errors.region_id && (
                        <p className="errors">{errors.region_id.message}</p>
                      )}
                    </div>
                  </div>

                  <span
                    onClick={() =>
                      nextSlide(anchoContenedor, valorinicial, anchoHijoEnPixel)
                    }
                    className={`cursor-pointer text-center btn hoverBtn btnGrabadora ${
                      formData.pais !== "" && formData.region_id !== ""
                        ? "active"
                        : "disable"
                    }`}
                  >
                    <Texto title={"Continuar"} />
                  </span>
                </div>
              </div>
            </div>

            {/* Ciudad y street de envio  */}

            <div
              className="cardPadre"
              style={{ width: `${anchoHijoEnPixel}px` }}
            >
              <div
                className={`cardSingle ${
                  paso == 9 ? "opacity-100" : "opacity-40"
                }`}
              >
                <div className="cajaCard">
                  <Espaciado />
                  <div className="w-full">
                    <p className="titulosForm">¿Dónde vive?</p>
                    <div className="flex flex-col w-full">
                      <select
                        disabled={!selectedDepartment}
                        {...register("city", {
                          required: "Selecciona ciudad de residencia",
                        })}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            city: e.target.value,
                          })
                        }
                      >
                        <option value={""}>Seleccione una ciudad</option>
                        {cities.map((city) => (
                          <option key={city} value={city}>
                            {city}
                          </option>
                        ))}
                      </select>
                      {errors.city && (
                        <p className="errors">{errors.city.message}</p>
                      )}

                      <input
                        type="text"
                        placeholder="Dirección"
                        value={formData.street}
                        {...register("street", {
                          required: "Dirección es requerida",
                        })}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            street: e.target.value,
                          })
                        }
                        onKeyDown={(e) => {
                          if (formData.street !== "") {
                            handleKeyDown(e);
                          }
                        }}
                      />
                      {errors.street && (
                        <p className="errors">{errors.street.message}</p>
                      )}
                    </div>
                  </div>

                  <span
                    onClick={() =>
                      nextSlide(anchoContenedor, valorinicial, anchoHijoEnPixel)
                    }
                    className={`cursor-pointer text-center btn hoverBtn btnGrabadora ${
                      formData.city !== "" && formData.street !== ""
                        ? "active"
                        : "disable"
                    }`}
                  >
                    <Texto title={"Continuar"} />
                  </span>
                </div>
              </div>
            </div>

            {/* Datos de Email y telephone  */}

            <div
              className="cardPadre"
              style={{ width: `${anchoHijoEnPixel}px` }}
            >
              <div
                className={`cardSingle ${
                  paso == 10 ? "opacity-100" : "opacity-40"
                }`}
              >
                <div className="cajaCard">
                  <Espaciado />
                  <div className="w-full">
                    <p className="titulosForm">
                      Dános tus datos para que estés enterado del estatus de tu
                      envío
                    </p>
                    <div className="flex flex-col w-full">
                      <input
                        className="email"
                        type="username"
                        placeholder="Correo"
                        value={formData.username}
                        {...register("username", {
                          required: "el Correo es requerido",
                        })}
                        onChange={(e) =>
                          setFormData({ ...formData, username: e.target.value })
                        }
                        onKeyDown={(e) => {
                          if (formData.nombreDestino !== "") {
                            if (e.key === "Enter" || e.key === "Tab") {
                              document.querySelector(".telefono").focus();
                            }
                          }
                        }}
                      />
                      {errors.username && (
                        <p className="errors">{errors.username.message}</p>
                      )}

                      <input
                        type="tel"
                        className="telefono"
                        placeholder="Teléfono"
                        value={formData.telephone}
                        {...register("telephone", {
                          required: "El teléfono es requerido",
                          minLength: 10,
                        })}
                        onChange={(e) => {
                          // Permitir solo números
                          const onlyNums = e.target.value.replace(
                            /[^0-9]/g,
                            ""
                          );
                          setFormData({ ...formData, telephone: onlyNums });
                        }}
                        onKeyDown={(e) => {
                          if (
                            formData.telephone !== "" &&
                            formData.username !== ""
                          ) {
                            handleKeyDown(e);
                          }
                        }}
                      />
                      {errors.telephone && (
                        <p className="errors">{errors.telephone.message}</p>
                      )}
                    </div>
                  </div>

                  <span
                    onClick={() =>
                      nextSlide(anchoContenedor, valorinicial, anchoHijoEnPixel)
                    }
                    className={`cursor-pointer text-center btn hoverBtn btnGrabadora ${
                      formData.username !== "" && formData.telephone !== ""
                        ? "active"
                        : "disable"
                    }`}
                  >
                    <Texto title={"Continuar"} />
                  </span>
                </div>
              </div>
            </div>

            {/* Autorizacion de datos */}

            <div
              className="cardPadre"
              style={{ width: `${anchoHijoEnPixel}px` }}
            >
              <div
                className={`cardSingle ${
                  paso == 11 ? "opacity-100" : "opacity-40"
                }`}
              >
                <div className="cajaCard">
                  <Espaciado />

                  <div className="w-full flexCenter flex-col">
                    <p className="titulosForm font-inter">
                      Un oso con tu mensaje dentro está a punto de llegar
                    </p>

                    <div className="checkbox-container">
                      <div className="caja">
                        <input
                          className="check checkbox-custom"
                          type="checkbox"
                          id="terminos"
                          {...register("terminos", { required: true })}
                        />
                        <label className="w-5/6" htmlFor="terminos">
                          <a
                            target="_blank"
                            className="max-lg:text-[0.65rem]"
                            href="https://interrapidisimo.com/wp-content/uploads/Proteccion-Datos-Personales-2024.pdf"
                          >
                            <span>Acepto </span>{" "}
                            <span className="border-b pb-[2px]">
                              términos y condiciones
                            </span>{" "}
                          </a>
                        </label>
                      </div>

                      {errors.terminos && (
                        <p className="errors">Debe Aceptar terminos</p>
                      )}
                    </div>
                    <div className="checkbox-container  ">
                      <div className="caja">
                        <input
                          className="checkbox-custom"
                          type="checkbox"
                          id="autorizar"
                          {...register("autorizar", { required: true })}
                        />
                        <label className="w-5/6" htmlFor="autorizar">
                          <a
                            target="_blank"
                            className="max-lg:text-[0.65rem]"
                            href="https://interrapidisimo.com/wp-content/uploads/Proteccion-Datos-Personales-2024.pdf"
                          >
                            <span> Autorizo tratamiento</span>{" "}
                            <span className="border-b pb-[2px]">
                              de datos personales
                            </span>{" "}
                          </a>
                        </label>
                      </div>
                      {errors.autorizar && (
                        <p className="errors">Debe autorizar el uso de datos</p>
                      )}
                    </div>
                  </div>
                  <Espaciado />
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
            {paso < 11 && (
              <span
                onClick={() =>
                  nextSlide(anchoContenedor, valorinicial, anchoHijoEnPixel)
                }
                className={`cursor-pointer absolute right-[-0.5rem] inline-block w-6 h-auto ${
                  paso === 1 ||
                  paso === 4 ||
                  (paso === 5 && irpaso6) ||
                  paso === 6
                    ? "activebtn"
                    : paso === 2 &&
                      formData.firstname !== "" &&
                      formData.lastname !== ""
                    ? "activebtn"
                    : paso === 3 &&
                      formData.tipo_identificacion_usuario !== "" &&
                      formData.numero_identificacion_usuario !== "" &&
                      formData.numero_identificacion_usuario.length > 5
                    ? "activebtn"
                    : paso === 7 &&
                      formData.nombreDestino !== "" &&
                      formData.apellidoDestino !== ""
                    ? "activebtn"
                    : paso === 8 &&
                      formData.pais !== "" &&
                      formData.region_id !== ""
                    ? "activebtn"
                    : paso === 9 &&
                      formData.city !== "" &&
                      formData.street !== ""
                    ? "activebtn"
                    : paso === 10 &&
                      formData.username !== "" &&
                      formData.telephone !== ""
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
            style={{ width: `${paso <= 1 ? 0 : (paso / 11) * 100}%` }}
            className=" rounded-e-3xl transition-all ease-out duration-1000 absolute z-50 top-0 left-0 inline-block h-full w-10 bg-[--yellow] "
          ></div>
        </div>

        {/* Boton de compra */}
        <div
          style={{ width: `${anchoHijoEnPixel}px` }}
          className="btnCompra flexCenter px-8 "
        >
          <Button
            type={true}
            title={"comprar"}
            custoMStyle={`${
              paso >= 11
                ? "opacity-100 pointer-events-all"
                : "opacity-30 pointer-events-none"
            } text-3xl w-full`}
          />
        </div>
      </div>
    </form>
  );
};

export default FormSteps;
