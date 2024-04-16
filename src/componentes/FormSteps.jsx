import React, { useEffect, useRef, useState } from "react";
import Button from "./Button";
import { Form } from "react-router-dom";
import { useForm } from "react-hook-form";
import Texto from "./Texto";
import AudioPlayer from "./AudioPlayer";
import data from "../data/colombia.json";
import Navbar from "./Navbar";

const FormSteps = ({ startRecording, stopRecording, status, mediaBlobUrl }) => {
  const [paso, setpaso] = useState(1);
  const [anchoContenedor, setAnchoContenedor] = useState(0);
  const [anchoHijoEnPixel, setAnchoHijoEnPixel] = useState(0);
  const [valorinicial, setValorInicial] = useState(0);
  const [irpaso6, setIrpaso6] = useState(false);
  const [translate, setTranslate] = useState(0);
  const cards = useRef(null);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [cities, setCities] = useState([]);
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
      setAnchoContenedor(contenedorWidth);

      // Calcula el ancho en píxeles para cada hijo
      const hijosDirectos = cards.current.children.length;
      const anchoHijo = contenedorWidth / hijosDirectos;
      setAnchoHijoEnPixel(anchoHijo);
      setTranslate(anchoHijo / 4);
      setValorInicial(anchoHijo);
    }
  }, [cards]);

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

  const submitHandler = (data) => {
    console.log(data);
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
      <div className="slidecards w-full h-full relative flex flex-col justify-center">
        {/* navbar menu hamburgesa*/}
        <div className="hamburger text-white inter">
          <Navbar />
        </div>

        <div className="h-[32rem] w-full relative">
          {/* Cards formulario */}

          {/* Botones de siguiente y atras*/}
          <div
            style={{ width: `${anchoHijoEnPixel}px` }}
            className="btns  mx-auto absolute floatcenter"
          >
            {paso > 1 && (
              <span
                onClick={() => prevSlide(valorinicial, anchoHijoEnPixel)}
                className="cursor-pointer absolute left-0 rotate-180 inline-block w-6 h-auto"
              >
                <img src="/svg/next.svg" alt="" />
              </span>
            )}
            {paso < 11 && (
              <span
                onClick={() =>
                  nextSlide(anchoContenedor, valorinicial, anchoHijoEnPixel)
                }
                className={`cursor-pointer absolute right-[-23px] inline-block w-6 h-auto ${
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
        {/* DOTS*/}
        <div
          style={{ width: `${anchoHijoEnPixel}px` }}
          className="flex items-center justify-between mx-auto p-8 pl-10"
        >
          {cards.current &&
            Array.from(cards.current.children)
              .slice(0, -1)
              .map((hijo, index) => (
                <div
                  key={index}
                  className={`${
                    paso >= index + 1 ? "bg-[var(--yellow)]" : ""
                  } w-2 h-2 rounded-full border border-[var(--yellow)]`}
                ></div>
              ))}
        </div>

        {/* Boton de compra */}
        <div
          style={{ width: `${anchoHijoEnPixel}px` }}
          className="btnCompra flexCenter mx-auto px-8 pl-10"
        >
          <Button
            type={true}
            title={"comprar"}
            custoMStyle={`${
              paso >= 11
                ? "opacity-100 pointer-events-all"
                : "opacity-30 pointer-events-none"
            } text-3xl w-full CustomPadi`}
          />
        </div>
      </div>
    </form>
  );
};

export default FormSteps;
