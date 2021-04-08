import React, {useEffect, useState} from 'react';
import { useForm } from "react-hook-form";
import { useHistory } from 'react-router-dom';
import axios from '../axios/axios';

const BodyCompra = () => {
    const history = useHistory();
    const [id, setId] = useState(0);
    const { register, handleSubmit } = useForm();

    const onSubmit = data => {
        axios.post('/compra', {id:id, nombre_comprador: data.nombre, total_pago: 0 })
            .then(response => {
                if(response.data.affectedRows===1){
                    history.push('/comprar-fase-2');
                }
            });
    }

    useEffect(()=>{
        axios.get('/compras')
        .then(res=>{
            setId(res.data[0]['id']+1)
        })
    }, [])
    return (
        <div className="container-compra">
            <form className="form-compra-incial" onSubmit={handleSubmit(onSubmit)}>
                <h2>Compras geek</h2>
                <div className="container-inputs">
                    <div>
                        <div>
                            <i className="fas fa-user"></i>
                        </div>
                        <div>
                            <input {...register("nombre")} required type="text" placeholder="nombre" />
                        </div>
                    </div>
                </div>
                <input type="submit" value="Comprar" className="btn-sbt-compra-fase-1" />
            </form>
        </div>
    )
}

export default BodyCompra;
