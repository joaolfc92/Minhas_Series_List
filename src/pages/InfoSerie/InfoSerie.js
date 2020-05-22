import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom';
import { Badge } from 'reactstrap'

const InfoSerie =  ({match}) => {

    const [form, setForm] = useState({})
    const [success, setSuccess] = useState(false)
    const onChange = field =>  evento => {
        setForm({
            ...form,
            [field]:evento.target.value
        })
    }



    const [mode, setMode] = useState('EDIT')
    const [genres, setGenres] = useState([])




    const [data, setData] = useState({})

    useEffect(()=>{
        axios
        .get('/api/series/' + match.params.id)
        .then( res => {
            setData(res.data)
            setForm(res.data)
        })  
    },[match.params.id])


    useEffect(()=>{
        axios
        .get('/api/genres')
        .then( res => {
            setGenres(res.data.data)
        })
    },[])


    const save = () => {
        axios
        .put('/api/series/' + match.params.id, form)

        

        .then(res => {
           setSuccess(true)
          
        })

    }

    if(success){
        return(
           <Redirect to="/series" />
        )
    }

    

    const masterHeader = {
        height:'50vh',
        minHeight:'500px',
        backgroundImage:`url('${data.background}')`,
        backgroundSize:'cover',
        backgroundPosition:'center',
        backgroundRepeat:'no-repeat'

    }

    const seleciona = value => () => {
        setForm({
            ...form,
            status : value
        })
    }

    return(

    <div>  

        <header style={masterHeader}>

                <div className="h-100 " style={{background:'rgba(0,0,0,0.7)'}}>
                    <div className='h-100 container'>

                        <div className="row h-100 align-items-center">
                            <div className="col-3">
                                <img alt={data.name} className="img-fluid img-thumbnail" src={data.poster}/>
                            </div>

                            <div className="col-8">
                                     <h1 className="font-weight-light text-light">{data.name}</h1>
                                        <div className="lead text-white">
                                                <Badge color="success">Assistido</Badge>
                                                <Badge color="warning">Em andamento</Badge>
                                                <Badge color="danger">Para Assistir</Badge>
                                                Genero:{data.genre}
                                        </div>
                            </div>
                        </div>
                    </div>
                </div>

        </header>

        <div>
          
            <button onClick={()=> setMode('EDIT')} type="button" className="btn btn-warning mb-4">Editar</button>
        </div>


        {mode === 'EDIT'  &&
        <div className="container mb-5">
            <h3 className="mt-4 mb-4">Adicione uma nova série a sua lista de favoritos </h3>
    <   pre>{JSON.stringify(form)}</pre>

                 
                 
                 <button onClick={()=> setMode('INFO')} type="button" className="btn btn-danger">Cancelar Edição</button>

            <form action="">

                <div className="form-group">

                    <label htmlFor="genero">Titulo :</label>
                    <input type="text" className="form-control" id="name" placeholder="Nome da Serie"  value={form.name} onChange={onChange('name')}  />
                   
                </div>

                <div className="form-group">

                    <label htmlFor="genero">Comentarios :</label>
                    <input type="text" className="form-control" id="name" placeholder="Nome da Serie"  value={form.comments} onChange={onChange('comments')}  />

                </div>


                <div className="form-group">
                <label htmlFor="genero">Generos :</label>
                <select className="form-control" onChange={onChange('genre_id')}>
                    {genres.map(genre => 
                            <option key={genre.id} value={genre.id} select={genre.id === form.genre}>{genre.name}</option>
                   )}
                
                </select>
                 </div>


                 <div className="form-check">
                        <input className="form-check-input" type="radio" name="status" id="assistido" value="ASSITIDO"  onClick={seleciona('ASSISTIDO')}/>
                            <label className="form-check-label" htmlFor="assistido">
                                Assistido
                            </label>
                 </div>
                <div className="form-check">
                        <input className="form-check-input" type="radio" name="status" id="emAndamento" value="EM_ANDAMENTO" onClick={seleciona('EM_ANDAMENTO')}/>
                        <label className="form-check-label" htmlFor="emAndamento">
                            Em Andamento
                        </label>
                </div>

                <div className="form-check">
                        <input className="form-check-input" type="radio" name="status" id="paraAssistir" value="PARA_ASSISTIR" onClick={seleciona('PARA_ASSISTIR')}/>
                        <label className="form-check-label" htmlFor="paraAssistir">
                            Para Asistir
                        </label>
                </div>




                <button type="button" className="btn btn-primary btn-success mt-5" onClick={save}>Salvar</button>
            </form>
        </div>
        }
    </div>      
    )
}


export default InfoSerie