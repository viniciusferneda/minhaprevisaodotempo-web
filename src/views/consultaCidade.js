import React from 'react'

import {withRouter} from 'react-router-dom'

import Card from '../components/card'

import {DataView} from 'primereact/dataview';
import {Panel} from 'primereact/panel';

import CidadeService from '../app/service/cidadeService'

import * as messages from '../components/toastr'

class ConsultaCidade extends React.Component{

    state = {
        previsoes: []
    }

    constructor(){
        super();
        this.service = new CidadeService();
        this.itemTemplate = this.itemTemplate.bind(this);
    }

    componentDidMount(){
        const params = this.props.match.params;

        if(params.id){
            this.service
            .detalhar(params.id)
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
    }

    renderGridItem(previsao) {
        const style = {
            minWidth: '250px',
            padding: '.5em'
        }
        return (
            <div style={style} className="p-col-12 p-md-3">
                <Panel header={previsao.dia} style={{ textAlign: 'center' }}>
                    <img src={`http://openweathermap.org/img/wn/${previsao.icon}@2x.png`} alt={previsao.tempo} />
                    <div className="previsao-detail">Tempo: <b>{previsao.tempo}</b></div>
                    <div className="previsao-detail">Temperatura: <b>{previsao.temperatura}</b></div>
                    <div className="previsao-detail">Temperatura Mínima: <b>{previsao.temperaturaMinima}</b></div>
                    <div className="previsao-detail">Temperatura Máxima: <b>{previsao.temperaturaMaxima}</b></div>
                    <div className="previsao-detail">Umidade: <b>{previsao.umidade}</b></div>
                    <div className="previsao-detail">Vento: <b>{previsao.vento}</b></div>
                </Panel>
            </div>
        );
    }

    itemTemplate(previsao) {
        if (!previsao) {
            return;
        }
        return this.renderGridItem(previsao);
    }

    voltar = () => {
        this.props.history.push('/cadastro-cidade');
    }

    render(){
        return(
            <Card title={'Previsão do tempo'}>
                <div className="row">
                    <div className="col-md-6">
                        <button className="btn btn-success" onClick={this.voltar}><i className="pi pi-undo"></i>Voltar</button>
                    </div>
                </div>
                <br/>
                <div className="content-section implementation">
                    <DataView value={this.state.previsoes} 
                              layout="grid" 
                              itemTemplate={this.itemTemplate}
                    />
                </div>
                <br/>
                <div className="row">
                    <div className="col-md-6">
                        <button className="btn btn-success" onClick={this.voltar}><i className="pi pi-undo"></i>Voltar</button>
                    </div>
                </div>
            </Card>
        )
    }
}

export default withRouter(ConsultaCidade);