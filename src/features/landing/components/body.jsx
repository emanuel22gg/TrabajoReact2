import React from "react";
import InformacionProductos from "../hooks/informacionProductos.jsx";
import CarruselProductos from "./carrusel.jsx";
import * as scroll from 'react-scroll';
const { Element } = scroll;


export default function Body() {
  return (
    <main className="container py-5">
      <Element name="inicio" className="mb-5">
      <section className="mb-5">
        <h2 className="mb-4 text-center">Bienvenido a EmaO</h2>
        <p className="mb-0 text-center">
          En EmaO nos preocupamos por ofrecer productos de alta calidad al mejor precio. Nuestros artículos son seleccionados cuidadosamente para satisfacer a nuestros clientes.
        </p>
      </section>
      </Element>

      <section className="mb-5">
        <CarruselProductos />
      </section>

      <hr className="my-5" />
      <Element name="productos" className="mb-5"> 
      <section className="mb-5">
        <h3 className="mb-4 text-center">Nuestros Productos</h3>
        <InformacionProductos />
      </section>
      </Element>

      <hr className="my-5" />

      <Element name="dudas" className="mb-5">
      <section className="my-5">
        <h3 className="mb-4 text-center">Preguntas Frecuentes</h3>
        <div className="accordion" id="faqAccordion">
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingOne">
              <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne">
                ¿Cuánto tarda el envío?
              </button>
            </h2>
            <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#faqAccordion">
              <div className="accordion-body">
                El envío tarda entre 2 y 5 días hábiles dependiendo de tu ubicación.
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingTwo">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo">
                ¿Puedo devolver un producto?
              </button>
            </h2>
            <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
              <div className="accordion-body">
                si, tienes 15 dias para poder hacer tus devoluciones.
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingThree">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree">
                ¿Qué métodos de pago aceptan?
              </button>
            </h2>
            <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
              <div className="accordion-body">
                se aceptan todo tipo de tarjetas o si es pedido pago contra entrega.
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingFour">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour">
                ¿Cómo puedo contactar al soporte?
              </button>
            </h2>
            <div id="collapseFour" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
              <div className="accordion-body">
                por ahora no hay numero, solo este correo johanemanuel987@gmail.com
              </div>
            </div>
          </div>
        </div>
      </section>
      </Element>

      <hr className="my-5" />

      <section className="mt-5 p-4 bg-light rounded shadow-sm text-center">
        <h3 className="mb-3">¿Quieres trabajar con nosotros?</h3>
        <p>
          En EmaO estamos buscando personas talentosas y apasionadas para unirse a nuestro equipo.
          Si te interesa formar parte de nuestra familia, envíanos tu CV o contáctanos para más información.
        </p>
        <a href="#" className="btn btn-primary">
          Enviar CV
        </a>
      </section>
    </main>
  );
}