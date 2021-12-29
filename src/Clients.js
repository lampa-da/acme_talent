import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { selectClient } from './store';

const Clients = (props) => {
    const { clients, selectClient } = props;
    return(
        <div>Clients
            <ul className='clients'>
                { clients.map( (client) =>
                    <li key={ client.id }>
                        <Link to={ `/clients/${ client.id }` } onClick={ () => selectClient(client) }>
                            { client.name } ({ client.skills.length })
                        </Link>
                    </li>
                ) }
            </ul>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        selectClient: (client) => dispatch(selectClient(client))
    }
}

export default connect(state => state, mapDispatchToProps)(Clients);
