import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom';

const EditarGenero =  ({match}) => {

    const [name, setName] = useState('')
    const [success, setSuccess] = useState(false)
    const onChange = evento => {
        setName(evento.target.value)
    }

    useEffect(()=>{
        axios.get('/api/genres/'+ match.params.id)
        .then(res=>{
            setName(res.data.name)
        })
    },[ match.params.id])

    


    const save = () => {
        axios
        .put('/api/genres/' +  match.params.id , {
            name
        })

        

        .then(res => {
           setSuccess(true)
          
        })

    }

    if(success){
        return(
            <Redirect to="/generos" />
        )
    }

    return(
        <div className="container">
            <h3 className="mt-4 mb-4">Adicione um novo genêro a sua lista de favoritos </h3>


            <form action="">

                <div className="form-group">

                    <label htmlFor="genero">Editar Genêro :</label>
                    <input type="text" className="form-control" id="name" placeholder="Nome do genêro"  value={name} onChange={onChange}  />
                   
                </div>


                <button type="button" className="btn btn-primary btn-success" onClick={save}>Salvar</button>
            </form>
        </div>
    )
}


export default EditarGenero