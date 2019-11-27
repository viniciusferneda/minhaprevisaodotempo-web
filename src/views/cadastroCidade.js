import React from 'react'

import Card from '../components/card'
import FormGroup from '../components/form-group'
import CidadeTable from './cidadeTable'

import {withRouter} from 'react-router-dom'
import * as messages from '../components/toastr'

import CidadeService from '../app/service/cidadeService'

class CadastroCidade extends React.Component {

    state = {
        name: '',
        country: '',
        cidades: []
    }

    constructor(){
        super();
        this.service = new CidadeService();
        this.buscar();
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
            });
        
        this.buscar();
    }

    handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        this.setState({[name]: value});
    }

    buscar = () => {
        const cidadeFiltro = {};

        this.service
            .consultar(cidadeFiltro)
            .then(response => {
                const lista = response.data;
                if(lista.length < 1){
                    messages.mensagemAlerta("Nenhum resultado encontrado.");
                }
                this.setState({cidades: lista});
            })
            .catch(error => {
                console.log(error);
            })
    }

    deletar = (cidade) => {
        this.service
            .deletar(cidade.id)
            .then(response => {
                const cidades = this.state.cidades;
                const index = cidades.indexOf(cidade);
                cidades.splice(index, 1);
                this.setState({cidades});
                messages.mensagemSucesso('Cidade excluída com sucesso!');
            }).catch(erro => {
                messages.mensagemErro('Ocorreu um erro ao tentar excluir a cidade!');
            });
    }

    detalhar = (cidade) => {
        this.props.history.push('/consulta-cidade');
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
                <br/>
                <div className="row">
                    <div className="col-md-12">
                        <div className="bs-component">
                            <CidadeTable cidades={this.state.cidades}
                                         deleteAction={this.deletar}
                                         detailAction={this.detalhar}/>
                        </div>
                    </div>
                </div>
            </Card>
        )
    }
}

export default withRouter(CadastroCidade);