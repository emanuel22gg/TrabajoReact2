import React, { useState } from "react";
import Swal from "sweetalert2";


export default function Products({ id, title, price, description, image }) {
    const [count, setCount] = useState(0);
    const [statusBtn, setStatusBtn] = useState(false);

    const aumentar = () => {
        if (count < 10) setCount(count + 1);
    };

    const disminuir = () => {
        if (count > 0) setCount(count - 1);
    };

    const anular = () => {
        setCount(0);
    };

    const agregarAlCarrito = () => {
        if (count > 0) {
            setStatusBtn(true);
            Swal.fire({
                icon: "success",
                title: "¡Agregado al carrito!",
                text: `Agregaste ${count} "${title}" al carrito.`,
                confirmButtonText: "Confirmar",
                allowOutsideClick: false,
            }).then(() => {
                setStatusBtn(false);
                setCount(0);
            });
        }
    };

    return (
        <div className="card h-100">
            <img src={image} className="card-img-top" alt={title} style={{ height: 200, objectFit: "contain" }} />
            <div className="card-body d-flex flex-column">
                <h5 className="card-title text-center">{title}</h5>
                <p className="card-text text-center">{description.slice(0, 60)}...</p>
                <p className="fw-bold text-center">${price.toFixed(3)}</p>
                <div className="d-flex align-items-center mb-2 justify-content-center">
                    <button className="btn btn-outline-secondary btn-sm" onClick={disminuir} disabled={count === 0}>-</button>
                    <span className="mx-2">{count}</span>
                    <button className="btn btn-outline-secondary btn-sm" onClick={aumentar} disabled={count === 10}>+</button>
                </div>
                <button
                    className="btn btn-primary w-100 mt-auto"
                    onClick={agregarAlCarrito}
                    disabled={count === 0 || statusBtn}
                >
                    {statusBtn ? "Agregado!" : "Agregar al carrito"}
                </button>
            </div>
        </div>
    );
}