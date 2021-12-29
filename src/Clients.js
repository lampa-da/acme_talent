import React from 'react';
import { Link } from 'react-router-dom';

const Clients = (props) => {
    const { clients } = props;
    return(
        <div>Clients
            <ul className='clients'>
                { clients.map( ({ id, name, skills }) =>
                    <li key={ id }>
                        <Link to={ `/clients/${ id }` }>
                            { name } ({ skills.length })
                        </Link>
                    </li>
                ) }
            </ul>
        </div>
    )
}

export default Clients;
