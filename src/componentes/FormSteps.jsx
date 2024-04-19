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
  const [anchoHijoEnPixel, setAnchoHijoEnPixel] = useState(0);
  const [valorinicial, setValorInicial] = useState(0);
  const [irpaso6, setIrpaso6] = useState(false);
  const [translate, setTranslate] = useState(0);
  const cards = useRef(null);
  const padre = useRef(null);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [audiourl, setAudiourl] = useState("");
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    tipoDeDocumento: "",
    numero: "",
    email: "",
    telefono: "",
    nombreDestino: "",
    apellidoDestino: "",
    pais: "Colombia",
    departamento: "",
    ciudad: "",
    direccion: "",
  });

  //console.log(formData);
  //console.log(paso);
  // console.log(status);

  /*****Mostrar paises en select */
  const handleDepartmentChange = (e) => {
    setFormData({
      ...formData,
      departamento: e.target.value,
    });
    const departmentName = e.target.value;
    setSelectedDepartment(departmentName);
    const department = data.find(
      (dept) => dept.departamento === departmentName
    );
    if (department) {
      setCities(department.ciudades);
    } else {
      setCities([]);
    }
  };
  useEffect(() => {
    if (cards.current) {
      const contenedorWidth = cards.current.offsetWidth;
      const contenedorWidthPadre = padre.current.offsetWidth;
      setAnchoContenedor(contenedorWidth);

      // Calcula el ancho en píxeles para cada hijo
      const hijosDirectos = cards.current.children.length;
      const anchoHijo = contenedorWidth / hijosDirectos;
      setAnchoHijoEnPixel(mobile || tablet ? anchoHijo : anchoHijo);
      setTranslate(mobile || tablet ? anchoHijo / 2 : anchoHijo / 2);
      setValorInicial(anchoHijo);
    }
  }, [cards, padre]);

  const nextSlide = (valorFinal, valorinicial, anchoHijoEnPixel) => {
    const incial = valorinicial * 2;
    const division = valorinicial / 4;
    const valor = valorFinal - incial + division;

    setTranslate((prevIndex) =>
      prevIndex >= valor ? valor : prevIndex + anchoHijoEnPixel
    );
    setTimeout(() => {
      setpaso((prevIndex) => (prevIndex >= 11 ? 11 : prevIndex + 1));
    }, 400); // Retraso de 100 milisegundos
  };

  const prevSlide = (valorinicial, anchoHijoEnPixel) => {
    const valor = valorinicial / 4;
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

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevenir la acción por defecto
    }
  };

  return (
    <form
      onKeyDown={handleKeyDown}
      onSubmit={handleSubmit(handleNextStep)}
      className="w-full h-full overflow-hidden"
    >
      <div
        ref={padre}
        className="slidecards w-full h-full lg:relative items-center flex flex-col  justify-evenly  "
      >
        {/* navbar menu hamburgesa*/}

        <div className="lg:h-[32rem] w-full relative">
          {/* Cards formulario */}
          <div
            ref={cards}
            style={{ transform: `translateX(-${translate}px)` }}
            className=" font-inter cards h-full lg:w-[291vw] xs:w-[600vw] relative text-white flex justify-between items-center"
          >
            <div
              className="cardPadre"
              style={{ width: `${anchoHijoEnPixel}px` }}
            >
              <div className={`cardSingle `}></div>
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
                    <p className=" font-normal w-full mt-6 px-6">
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
                        value={formData.nombre}
                        {...register("nombre", {
                          required: "Nombre es requerido",
                        })}
                        onChange={(e) =>
                          setFormData({ ...formData, nombre: e.target.value })
                        }
                      />
                      {errors.nombre && (
                        <p className="errors">{errors.nombre.message}</p>
                      )}

                      <input
                        type="text"
                        placeholder="Apellido"
                        value={formData.apellido}
                        {...register("apellido", {
                          required: "Apellido es requerido",
                        })}
                        onChange={(e) =>
                          setFormData({ ...formData, apellido: e.target.value })
                        }
                      />
                      {errors.apellido && (
                        <p className="errors">{errors.apellido.message}</p>
                      )}
                    </div>
                  </div>

                  <span
                    onClick={() =>
                      nextSlide(anchoContenedor, valorinicial, anchoHijoEnPixel)
                    }
                    className={`cursor-pointer text-center btn hoverBtn btnGrabadora ${
                      formData.nombre !== "" && formData.apellido !== ""
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
                        {...register("tipoDeDocumento", {
                          required: "Selecciona tu tipo de documento",
                        })}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            tipoDeDocumento: e.target.value,
                          })
                        }
                      >
                        <option value="">Tipo de documento</option>
                        <option value="cedula">Cédula de Identidad</option>
                        <option value="pasaporte">Pasaporte</option>
                        <option value="dni">Tarjeta de identidad</option>
                      </select>
                      {errors.tipoDeDocumento && (
                        <p className="errors">
                          {errors.tipoDeDocumento.message}
                        </p>
                      )}

                      <input
                        type="number"
                        placeholder="Numero"
                        style={{ appearance: "textfield" }} // Agrega esta línea
                        value={formData.numero}
                        {...register("numero", {
                          required: "Número es requerido",
                          minLength: {
                            value: 5,
                            message: "Mínimo 5 caracteres",
                          },
                        })}
                        onChange={(e) =>
                          setFormData({ ...formData, numero: e.target.value })
                        }
                        inputMode="numeric" // Agrega esta línea
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
                      formData.tipoDeDocumento !== "" &&
                      formData.numero !== "" &&
                      formData.numero.length > 5
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
                        {formData.nombre}, <br />
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
                    className={`cursor-pointer text-center btn hoverBtn btnGrabadora ${
                      formData.nombre !== "" && formData.apellido !== ""
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
              <div
                className={`cardSingle   ${
                  paso == 5 ? "opacity-100" : "opacity-40"
                }`}
              >
                <div className="cajaCard">
                  <Espaciado />
                  <div className="w-full flexCenter flex-col">
                    <div className="w-full">
                      <p className="titulosForm">
                        Dile en 20 segundos todo lo que sientes
                      </p>

                      <AudioPlayer
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
                      />
                      {errors.nombre && (
                        <p className="errors">{errors.nombreDestino.message}</p>
                      )}

                      <input
                        type="text"
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

            {/* pais y departamento */}

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
                        {...register("departamento", {
                          required: "Selecciona departamento de residencia",
                        })}
                        value={selectedDepartment}
                        onChange={handleDepartmentChange}
                      >
                        <option value="">Seleccione un departamento</option>
                        {data.map((department) => (
                          <option
                            key={department.id}
                            value={department.departamento}
                          >
                            {department.departamento}
                          </option>
                        ))}
                      </select>
                      {errors.departamento && (
                        <p className="errors">{errors.departamento.message}</p>
                      )}
                    </div>
                  </div>

                  <span
                    onClick={() =>
                      nextSlide(anchoContenedor, valorinicial, anchoHijoEnPixel)
                    }
                    className={`cursor-pointer text-center btn hoverBtn btnGrabadora ${
                      formData.pais !== "" && formData.departamento !== ""
                        ? "active"
                        : "disable"
                    }`}
                  >
                    <Texto title={"Continuar"} />
                  </span>
                </div>
              </div>
            </div>

            {/* Ciudad y direccion de envio  */}

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
                        {...register("ciudad", {
                          required: "Selecciona ciudad de residencia",
                        })}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            ciudad: e.target.value,
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
                      {errors.ciudad && (
                        <p className="errors">{errors.ciudad.message}</p>
                      )}

                      <input
                        type="text"
                        placeholder="Direccion"
                        value={formData.direccion}
                        {...register("direccion", {
                          required: "direccion es requerida",
                        })}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            direccion: e.target.value,
                          })
                        }
                      />
                      {errors.direccion && (
                        <p className="errors">{errors.direccion.message}</p>
                      )}
                    </div>
                  </div>

                  <span
                    onClick={() =>
                      nextSlide(anchoContenedor, valorinicial, anchoHijoEnPixel)
                    }
                    className={`cursor-pointer text-center btn hoverBtn btnGrabadora ${
                      formData.ciudad !== "" && formData.direccion !== ""
                        ? "active"
                        : "disable"
                    }`}
                  >
                    <Texto title={"Continuar"} />
                  </span>
                </div>
              </div>
            </div>

            {/* Datos de email y telefono  */}

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
                        name="username"
                        type="email"
                        placeholder="Correo"
                        value={formData.email}
                        {...register("email", {
                          required: "el correo es requerido",
                        })}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                      />
                      {errors.email && (
                        <p className="errors">{errors.email.message}</p>
                      )}

                      <input
                        type="tel"
                        placeholder="Teléfono"
                        value={formData.telefono}
                        {...register("telefono", {
                          required: "El teléfono es requerido",
                          minLength: 10,
                        })}
                        onChange={(e) => {
                          // Permitir solo números
                          const onlyNums = e.target.value.replace(
                            /[^0-9]/g,
                            ""
                          );
                          setFormData({ ...formData, telefono: onlyNums });
                        }}
                      />
                      {errors.telefono && (
                        <p className="errors">{errors.telefono.message}</p>
                      )}
                    </div>
                  </div>

                  <span
                    onClick={() =>
                      nextSlide(anchoContenedor, valorinicial, anchoHijoEnPixel)
                    }
                    className={`cursor-pointer text-center btn hoverBtn btnGrabadora ${
                      formData.email !== "" && formData.telefono !== ""
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
                    <div className="cajaTExto">
                      Gracias para continuar con la compra seras redireccionado
                      alCarrito.com
                    </div>

                    {/* <div className="checkbox-container">
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
                    </div> */}
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
                      formData.nombre !== "" &&
                      formData.apellido !== ""
                    ? "activebtn"
                    : paso === 3 &&
                      formData.tipoDeDocumento !== "" &&
                      formData.numero !== "" &&
                      formData.numero.length > 5
                    ? "activebtn"
                    : paso === 7 &&
                      formData.nombreDestino !== "" &&
                      formData.apellidoDestino !== ""
                    ? "activebtn"
                    : paso === 8 &&
                      formData.pais !== "" &&
                      formData.departamento !== ""
                    ? "activebtn"
                    : paso === 9 &&
                      formData.ciudad !== "" &&
                      formData.direccion !== ""
                    ? "activebtn"
                    : paso === 10 &&
                      formData.email !== "" &&
                      formData.telefono !== ""
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

        <div className="overflow-hidden rounded-3xl xs:w-2/5 lg:w-1/3 h-[8px] relative max-lg:my-12">
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
