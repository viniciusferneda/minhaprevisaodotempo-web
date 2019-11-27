import React from 'react'

import {withRouter} from 'react-router-dom'

import Card from '../components/card'
import FormGroup from '../components/form-group'

import CidadeTable from './cidadeTable'

import CidadeService from '../app/service/cidadeService'

import * as messages from '../components/toastr'

class ConsultaCidade extends React.Component{

    state = {
        previsoes: []
    }

    constructor(){
        super();
        this.service = new CidadeService();
    }

    detalhar = (cidade) => {
        const cidadeFiltro = {
            id: cidade.id
        }

        this.service
            .detalhar(cidadeFiltro.id)
            .then(response => {
                const lista = response.data;
                if(lista.length < 1){
                    messages.mensagemAlerta("Nenhum resultado encontrado.");
                }
                this.setState({previsoes: lista});
            })
            .catch(error => {
                console.log(error);
            })
    }

    preparaFormularioCadastro = () => {
        this.props.history.push('/cadastro-cidade');
    }

    render(){
        return(
            <Card title="Previsão do Tempo Detalhada">
                <div className="row">
                    <div className="col-md-12">
                        <div className="bs-component">
                            
                        </div>
                    </div>
                </div>
            </Card>
        )
    }
}

export default withRouter(ConsultaCidade);