import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Clients = (props) => {
    const { clients } = props;
    
    clients.sort((a ,b) => {
        if(a.name < b.name) return -1;
        if(b.name < a.name) return 1;
        else return 0;
    })

    return(
        <div>
            <h3>Clients</h3>
            <ul className='clients'>
                { clients.map( (client) =>
                    <li key={ client.id }>
                        <Link to={ `/clients/${ client.id }` } >
                            { client.name } ({ client.skills.length })
                        </Link>
                    </li>
                ) }
            </ul>
        </div>
    )
}

export default connect(state => state)(Clients);
