import React, {useState, useEffect} from 'react'
import IMG from '../images/detalle.svg';
import axios from '../axios/axios';
import swal from 'sweetalert2';
import {getFromLocal} from '../functions/localStorage';
import { useHistory } from 'react-router-dom';

const BodyDetalle = () => {
    const history = useHistory();
    const id_compra=getFromLocal('id_compra');
    const [compra, setCompra] = useState({});
    const [articulos, setArticulos] = useState([]);

    useEffect(() => {
        getCompra();
        // eslint-disable-next-line
    }, [])

    const getCompra =() => {
        axios.get('/compra/'+id_compra)
        .then(res=>{
            setArticulos(res.data.result);
            setCompra(res.data.resultado[0]);
        })
    }

    return (
        <div className="container-ver-detalle">
            <div className="container-info-compra">
                <div className="title-info-compra">
                    <h1>{compra.nombre_comprador}</h1>
                    <br/>
                    <p># {compra.id}</p>
                    <br/>
                    <p>{compra.fecha_compra}</p>
                </div>
                <div className="container-img-compra">
                    <img src={IMG} alt="" />
                </div>
            </div>
            <table className="table-articulos">
                <thead>
                    <tr>
                        <td className="tittleTable">#</td>
                        <td className="tittleTable">Descripción</td>
                        <td className="tittleTable">Unidades</td>
                        <td className="tittleTable">Subtotal</td>
                        <td className="tittleTable">Eliminar</td>
                    </tr>
                </thead>
                <tbody>
                    {articulos.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id_articulo}</td>
                            <td>{item.nombre_articulo}</td>
                            <td>{item.cantidad}</td>
                            <td>{item.subtotal} $</td>
                            <td><button className="btn-delete-article" onClick={
                                ()=>{
                                    swal.fire({
                                        title: '¿Seguro que deseas eliminar el articulo?',
                                        showCancelButton: true,
                                        cancelButtonText: 'Cancelar',
                                        confirmButtonText: 'Eliminar',
                                        confirmButtonColor: '#89216B',
                                    }).then(result => {
                                        if (result.isConfirmed) {
                                            axios.delete('/articulo-compra/'+item.id).then(res => {
                                                console.log(res)
                                                if (res.data.affectedRows === 1) {
                                                    window.location.reload();
                                                }
                                            }).catch(() => {
                                                swal.fire({
                                                    title: "No se pudo eliminar el deseo",
                                                    footer: "Intente de nuevo",
                                                    icon: "error",
                                                    confirmButtonText: "¡Entendido!",
                                                    confirmButtonColor: "#89216B",
                                                });
                                            })
                                        }
                                    })
                                }
                            }><i className="fas fa-times"></i></button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <p className="btn-pagar-detalles" onClick={
                ()=>{
                    swal.fire({
                        title: 'Pago realizado con éxito',
                        confirmButtonText: 'Entendido',
                        confirmButtonColor: '#89216B',
                    }).then(result => {
                        if (result.isConfirmed) {
                            history.push('/');
                        }
                    })
                }
            }>Pagar</p>
        </div>
    )
}

export default BodyDetalle;