import React from 'react'

import {withRouter} from 'react-router-dom'

import Card from '../components/card'
import FormGroup from '../components/form-group'

import CidadeTable from './cidadeTable'

import CidadeService from '../app/service/cidadeService'

import * as messages from '../components/toastr'

class ConsultaCidade extends React.Component{

    state = {
        name: '',
        country: '',
        cidades: []
    }

    constructor(){
        super();
        this.service = new CidadeService();
    }

    buscar = () => {

        if(!this.state.name){
            messages.mensagemErro('O preenchimento do campo Cidade é obrigatório');
            return false;
        }

        const cidadeFiltro = {
            name: this.state.name,
            country: this.state.country
        }

        this.service
            .consultar(cidadeFiltro)
            .then( response => {
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
    }

    preparaFormularioCadastro = () => {
        this.props.history.push('/cadastro-cidade');
    }

    render(){
        return(
            <Card title="Consulta de Cidades">
                <div className="row">
                    <div className="col-md-6">
                        <div className="bs-component">
                            <FormGroup htmlFor="inputName" label="Cidade *: ">
                                <input type="text" 
                                        className="form-control" 
                                        id="inputName"
                                        value={this.state.name}
                                        onChange={e => this.setState({name: e.target.value})}
                                        placeholder="Digite a Cidade"/>
                            </FormGroup>
                            <FormGroup htmlFor="inputCountry" label="País *: ">
                                <input type="text" 
                                        className="form-control" 
                                        id="inputCountry"
                                        value={this.state.country}
                                        onChange={e => this.setState({country: e.target.value})}
                                        placeholder="Digite o País"/>
                            </FormGroup>
                            <button type="button" 
                                    className="btn btn-success" 
                                    onClick={this.buscar}>
                                <i className="pi pi-search"></i> Buscar
                            </button>
                            <button type="button" 
                                    className="btn btn-danger" 
                                    onClick={this.preparaFormularioCadastro}>
                                <i className="pi pi-plus"></i> Cadastrar
                            </button>
                        </div>
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

export default withRouter(ConsultaCidade);