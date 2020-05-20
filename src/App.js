import React, {useState, useEffect} from 'react';
import Header from './components/Header/Header'
import {BrowserRouter as Router, Route}  from 'react-router-dom'
import Home from './pages/Home/Home'
import Generos from './pages/Generos/Generos'
import AddGenero from './pages/AddGenero/AddGenero'
import EditarGenero from './pages/EditarGenero/EditarGenero'

import axios from 'axios'

function App() {

    const [data , setData] = useState({})

    useEffect(()=>{
        axios.get('/api').then(res => {
            setData(res.data)
        })
    }, [])

    return(
      
        <Router>
            <div>

              <Header />
              <Route path="/" exact component={Home} />
              <Route path="/generos" exact component={Generos} />
              <Route path="/generos/:id" component={EditarGenero} />
              <Route path="/addgenero" exact component={AddGenero} />
                
            </div>
        </Router>
     
      
    )
  
}

export default App;
