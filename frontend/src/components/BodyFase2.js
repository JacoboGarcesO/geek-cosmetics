import React, { useEffect, useState } from 'react'
import axios from '../axios/axios';
import swal from 'sweetalert2';
import { useHistory } from 'react-router-dom';

const BodyFase2 = () => {
    const history = useHistory();
    const [lastId, setLastId] = useState(0);
    const [articulos, setArticulos] = useState([]);

    const getArticles = () => {
        axios.get('/articulos')
            .then(res => {
                setArticulos(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }

    useEffect(() => {
        getArticles();
        axios.get('/compras')
        .then(res=>{
            setLastId(res.data[0]['id'])
        })
    }, [])

    return (
        <div className="container-form-fase-2">
            <table className="table-articulos">
                <thead>
                    <tr>
                        <td className="tittleTable">#</td>
                        <td className="tittleTable">Descripción</td>
                        <td className="tittleTable">Precio</td>
                        <td className="tittleTable">Unidades</td>
                        <td className="tittleTable">Añadir a la compra</td>
                    </tr>
                </thead>
                <tbody>
                    {articulos.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.descripcion}</td>
                            <td>{item.precio}$</td>
                            <td>{item.cantidad}</td>
                            <td><button onClick={() => {
                                swal.fire({
                                    title: `Añadir el producto ${item.descripcion}`,
                                    text: "Ingresa la cantidad de unidades que deseas comprar",
                                    input: 'number',
                                    inputAttributes: {
                                        autocapitalize: 'off'
                                    },
                                    showCancelButton: true,
                                    confirmButtonText: 'Añadir',
                                    cancelButtonText: 'Cancelar',
                                    showLoaderOnConfirm: true,
                                    preConfirm: (number) => {
                                        if(number==="" || number==="0"){
                                            swal.fire({
                                                title: 'La cantidad debe contener un valor'
                                            });
                                        }else{
                                            return axios.post('/articulo-compra',{
                                                id_articulo: item.id,
                                                id_compra:lastId, 
                                                nombre_articulo: item.descripcion, 
                                                precio: item.precio,
                                                unidades_compradas:number, 
                                                subtotal: number*item.precio,
                                                cantidad: item.cantidad
                                            })
                                                .then(response => {
                                                    if(response.data.message==="No hay suficientes unidades."){
                                                        swal.fire({
                                                            title: 'No hay suficientes unidades de este articulo'
                                                        });
                                                    }
                                                })
                                                .catch(error => {
                                                    swal.showValidationMessage(
                                                        `Request failed: ${error}`
                                                    )
                                                })
                                        }
                                    },
                                    allowOutsideClick: () => !swal.isLoading()
                                })
                            }} className="btn-add-article"><i className="fas fa-check-square"></i></button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <p to="detalle-compra" className="btn-ver-detalles" onClick={
                ()=>{
                    axios.get('/actualizar-pago/'+lastId)
                    .then(res=>{
                        if(res.data.affectedRows===1){
                            history.push('/ver-detalle');
                        }
                    })
                }
            }>Ver detalles</p>
        </div>
    )
}

export default BodyFase2;