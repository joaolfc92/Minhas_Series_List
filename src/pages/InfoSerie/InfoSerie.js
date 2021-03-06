import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom';
import { Badge } from 'reactstrap'

const InfoSerie =  ({match}) => {

    const [form, setForm] = useState({
        name:''
    })
    const [success, setSuccess] = useState(false)

    
    const [mode, setMode] = useState('INFO')
    const [genres, setGenres] = useState([])
    const [genreId, setGenreid] = useState('')
    const [data, setData] = useState('')



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

            const  genres = res.data.data

            const encontrado = genres.find(value => data.genre == value.name)

           


            if(encontrado  ){
                setGenreid(encontrado.id)
            }

        })
    },[data])


    const onChangeGenre = event =>  {
        setGenreid(event.target.value)
    }







    const onChange = field =>  evento => {
        setForm({
            ...form,
            [field]:evento.target.value
        })
    }



    const seleciona = value => () => {
        setForm({
            ...form,
            status : value
        })
    }


    const save = () => {
        console.log(form, genreId)
        axios
        .put('/api/series/' + match.params.id, {
            ...form,
            genre_id: genreId

           
        })

        

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

                                     {data.status == 'ASSISTIDO' &&     <Badge color="success">Assistido</Badge> }
                                     {data.status == 'EM_ANDAMENTO' &&   <Badge color="warning">Em andamento</Badge> }
                                    {data.status == 'PARA_ASSISTIR' &&   <Badge color="danger">Para Assistir</Badge> }

                                           <div className="mt-4">     Genero:{data.genre}  </div>
                                        </div>
                            </div>
                        </div>
                    </div>
                </div>

        </header>

        <div className="container">
          
            <button onClick={()=> setMode('EDIT')} type="button" className="btn btn-warning mb-4">Editar</button>
        </div>


        {mode === 'EDIT'  &&
        <div className="container mb-5">
            <h3 className="mt-4 mb-4">Edite os dados de suas séries favoritas </h3>
    

                 
                 
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
                <select className="form-control" onChange={onChangeGenre} value={genreId}>
                    {genres.map(genre => 
                            <option key={genre.id} value={genre.id} >{genre.name}</option>
                   )}
                
                </select>
                 </div>


                 <div className="form-check">
                        <input className="form-check-input" type="radio" name="status" id="assistido" value="ASSITIDO"  onChange={seleciona('ASSISTIDO')}/>
                            <label className="form-check-label" htmlFor="assistido">
                                Assistido
                            </label>
                 </div>
                <div className="form-check">
                        <input className="form-check-input" type="radio" name="status" id="emAndamento" value="EM_ANDAMENTO" onChange={seleciona('EM_ANDAMENTO')}/>
                        <label className="form-check-label" htmlFor="emAndamento">
                            Em Andamento
                        </label>
                </div>

                <div className="form-check">
                        <input className="form-check-input" type="radio" name="status" id="paraAssistir" value="PARA_ASSISTIR" onChange={seleciona('PARA_ASSISTIR')}/>
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