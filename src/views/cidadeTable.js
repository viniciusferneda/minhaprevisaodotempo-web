import React from 'react'

export default props => {

    const rows = props.cidades.map(cidade => {
        return (
            <tr key={cidade.id}>
                <td>{cidade.name}</td>
                <td>{cidade.country}</td>
                <td>{cidade.lon}</td>
                <td>{cidade.lat}</td>
                <td>
                    <button type="button" title="Detalhar"
                            className="btn btn-primary"
                            onClick={e => props.detailAction(cidade.id)}>
                        <i className="pi pi-pencil"></i>
                    </button>
                    <button type="button" title="Deletar"
                            className="btn btn-danger" 
                            onClick={e => props.deleteAction(cidade)}>
                        <i className="pi pi-trash"></i>
                    </button>
                </td>
            </tr>
        )
    })

    return(
        <table className="table table-hover">
            <thead>
                <tr>
                    <th scope="col">Cidade</th>
                    <th scope="col">País</th>
                    <th scope="col">Latitude</th>
                    <th scope="col">Longitude</th>
                    <th scope="col">Ações</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>            
        </table>
    )
}