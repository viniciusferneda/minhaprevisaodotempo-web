import React from 'react'

import Home from '../views/home'
import CadastroCidade from '../views/cadastroCidade'
import ConsultaCidade from '../views/consultaCidade'

import{ Route, Switch, HashRouter, Redirect } from 'react-router-dom'

function RouteRedirect( { component: Component, ...props } ){
    return (
        <Route {...props} render={(componentProps) => {
            return (
                <Redirect to={{pathname: '/cadastro-cidade', state: {from: componentProps.location} }}/>
            )
        }}/>
    )
}

function Rotas(props){
    return(
        <HashRouter>
            <Switch>                
                <RouteRedirect exact path="/" component={Home}/>
                <Route exact path="/cadastro-cidade" component={CadastroCidade}/>
                <Route exact path="/consulta-cidade/:id?" component={ConsultaCidade}/>                
            </Switch>
        </HashRouter>
    )
}

export default Rotas;
