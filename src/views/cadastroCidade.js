import React from 'react'

import Card from '../components/card'
import FormGroup from '../components/form-group'

import {withRouter} from 'react-router-dom'
import * as messages from '../components/toastr'

import CidadeService from '../app/service/cidadeService'

class CadastroCidade extends React.Component {

    state = {
        name: '',
        country: ''
    }

    constructor(){
        super();
        this.service = new CidadeService();
    }

    submit = () => {

        const { name, country } = this.state;
        const cidade = {  name, country };

        try{
            this.service.validar(cidade)
        }catch(erro){
            const mensagens = erro.mensagens;
            mensagens.forEach(msg => messages.mensagemErro(msg));
            return false;
        }
        
        this.service
            .salvar(cidade)
            .then(response => {
                messages.mensagemSucesso('Cidade cadastrada com sucesso!');
            }).catch(error => {
                messages.mensagemErro(error.response.data);
            })
    }

    handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;

        this.setState({[name]: value});
    }

    render(){

        return (
            <Card title={'Cadastro de Cidade'}>
                <div className="row">
                    <div className="col-md-6">
                        <FormGroup id="inputName" label="Nome: *">
                            <input id="inputName" 
                                   type="text" 
                                   className="form-control"
                                   name="name"
                                   value={this.state.name}
                                   onChange={this.handleChange} />
                        </FormGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <FormGroup id="inputCountry" label="País: *">
                            <input id="inputCountry" 
                                   type="text" 
                                   className="form-control"
                                   name="country"
                                   value={this.state.country}
                                   onChange={this.handleChange} />
                        </FormGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <button className="btn btn-success" onClick={this.submit}><i className="pi pi-save"></i>Salvar</button>
                    </div>
                </div>
            </Card>
        )
    }
}

export default withRouter(CadastroCidade);