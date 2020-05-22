import React, {useState, useEffect} from 'react';
import Header from './components/Header/Header'
import {BrowserRouter as Router, Route, Switch}  from 'react-router-dom'
import Home from './pages/Home/Home'
import Generos from './pages/Generos/Generos'
import AddGenero from './pages/AddGenero/AddGenero'
import EditarGenero from './pages/EditarGenero/EditarGenero'
import Series from './pages/Series/Series'
import NovaSerie from './pages/AddSerie/AddSerie'
import InfoSerie from './pages/InfoSerie/InfoSerie'

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
              <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/generos" exact component={Generos} />
                <Route path="/addgenero" exact component={AddGenero} />
                <Route path="/generos/:id" component={EditarGenero} />
                <Route path="/series" exact component={Series} />
                <Route path="/series/novo" exact component={NovaSerie} />
                <Route path="/series/:id" component={InfoSerie} />
              </Switch>
                
            </div>
        </Router>
     
      
    )
  
}

export default App;
