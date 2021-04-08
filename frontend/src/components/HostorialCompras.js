import React, {useState, useEffect} from 'react';
import axios from '../axios/axios';

const HostorialCompras = () => {
    const [compra, setCompra] = useState([]);

    const getCompras= () => {
        axios.get('/compras-historial')
        .then(res=>{
            setCompra(res.data);
        })
    }

    const transformer = (data) => {
        const fecha = data.split("T");
        return fecha[0];
      }

    useEffect(()=>{
        getCompras();
    }, [])

    return (
        <div className="container-historial-compras">
            <table className="table-articulos">
                <thead>
                    <tr>
                        <td className="tittleTable">Factura</td>
                        <td className="tittleTable">Comprador</td>
                        <td className="tittleTable">Fecha</td>
                        <td className="tittleTable">Total</td>
                    </tr>
                </thead>
                <tbody>
                    {compra.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.nombre_comprador}</td>
                            <td>{transformer(item.fecha_compra)}</td>
                            <td>{item.total_pago} $</td>
                        </tr>
                    ))} 
                </tbody>
            </table>
        </div>
    )
}

export default HostorialCompras;