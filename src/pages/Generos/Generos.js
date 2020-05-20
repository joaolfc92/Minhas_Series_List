import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'




const Generos = () => {

    const [data , setData] = useState([])

    useEffect(()=>{
        axios.get('/api/genres').then(res => {
           setData(res.data.data)
        })
    }, [])


    const deleteGenero = id => {
        axios
        .delete('/api/genres/' + id)
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
                    onClick={()=>deleteGenero(record.id)}>Deletar
                    </button></td>

                <td><Link to={"/generos/" + record.id}>  <button type="button" 
                    className="btn btn-outline-warning" 
                    >Editar
                    </button> </Link>  </td>    
            </tr>
        )
    }

    if(data.length === 0){
        return(
            <div className="container mt-5 mb-5">
                <h1>Generos</h1>

                <Link to="/addgenero"><button type="button" className="btn btn-outline-info  mt-3 mb-5">Adicionar novo Genêro</button></Link>

               <div className="alert alert-warning" role="alert">
                        Você não possui generos criados.
                </div>
            </div>        
        )
    }


    


    return(
        <div className="container mt-5 mb-5">
            <h1>Generos</h1>
            <Link to="/addgenero"><button type="button" className="btn btn-outline-info  mt-3 mb-5">Adicionar novo Genêro</button></Link>

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


export default Generos