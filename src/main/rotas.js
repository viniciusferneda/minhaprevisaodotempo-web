import React from 'react'

import CadastroCidade from '../views/cadastroCidade'
import ConsultaCidade from '../views/consultaCidade'

import{ Route, Switch, HashRouter } from 'react-router-dom'

function Rotas(props){
    return(
        <HashRouter>
            <Switch>                
                <Route exact path="/cadastro-cidade" component={CadastroCidade}/>
                <Route exact path="/consulta-cidade" component={ConsultaCidade}/>                
            </Switch>
        </HashRouter>
    )
}

export default Rotas;
