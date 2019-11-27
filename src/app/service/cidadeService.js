import ApiService from '../apiservice'

import ErroValidacao from '../exception/ErroValidacao'

export default class CidadeService extends ApiService {

    constructor(){
        super('api/cities')
    }

    obterPorId(id){
        return this.get(`/${id}`);
    }

    validar(cidade){
        const erros = [];

        if(!cidade.name){
            erros.push("Informe a Cidade.")
        }

        if(!cidade.country){
            erros.push("Informe o País.")
        }

        if(erros && erros.length > 0){
            throw new ErroValidacao(erros);
        }
    }

    salvar(cidade){
        return this.post('/', cidade);
    }

    consultar(cidadeFiltro){
        let params = '';

        if(cidadeFiltro.id){
            params = `?id=${cidadeFiltro.id}`;
        }

        if(cidadeFiltro.name){
            if(params){
                params = `?name=${cidadeFiltro.name}`;
            }else{
                params = `${params}&name=${cidadeFiltro.name}`;
            }
        }

        if(cidadeFiltro.country){
            if(params){
                params = `?country=${cidadeFiltro.country}`;
            }else {
                params = `${params}&country=${cidadeFiltro.country}`;
            }
        }

        return this.get(params);
    }

    detalhar(idCidade){
        return this.get(`${idCidade}/detalhar`);
    }

    deletar(id){
        return this.delete(`/${id}`)
    }
}