import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'




const Series = () => {

    const [data , setData] = useState([])

    useEffect(()=>{
        axios.get('/api/series').then(res => {
           setData(res.data.data)
        })
    }, [])


    const deleteSerie = id => {
        axios
        .delete('/api/series/' + id)
        .then(res => {
            const filtrado = data.filter(item => item.id !== id)
            setData(filtrado)
        })
    }


    const renderizaLinha = record => {
        return(
            <tr key={record.id}>
                <th scope="row">{record.id}</th>
                <td>{record.name}</td>
                <td><button type="button" 
                    className="btn btn-outline-danger" 
                    onClick={()=>deleteSerie(record.id)}>Deletar
                    </button></td>

                <td><Link to={"/series/" + record.id}>  <button type="button" 
                    className="btn btn-outline-warning" 
                    >Editar
                    </button> </Link>  </td>    
            </tr>
        )
    }

    if(data.length === 0){
        return(
            <div className="container mt-5 mb-5">
                <h1>Séries</h1>

                <Link to="/series/novo"><button type="button" className="btn btn-outline-info  mt-3 mb-5">Adicionar nova série</button></Link>

               <div className="alert alert-warning" role="alert">
                        Você não possui séries criados.
                </div>
            </div>        
        )
    }


    


    return(
        <div className="container mt-5 mb-5">
            <h1>Séries</h1>
            <Link to="/series/novo"><button type="button" className="btn btn-outline-info  mt-3 mb-5">Adicionar Nova Série</button></Link>

            <table className="table table-dark">
                    <thead>
                        <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Nome</th>
                        <th scope="col">Ações</th>
                        </tr>
                    </thead>
                    
                <tbody>
                     
                     {data.map(renderizaLinha)}
                       
                </tbody>
              </table>
         
        </div>
    )
}


export default Series