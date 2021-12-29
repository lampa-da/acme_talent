import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Skills = (props) => {
    const { skills } = props;
    skills.sort((a, b) => (b.clients.length - a.clients.length));

    return(
        <div>
            <h3>Skills</h3>
            <ul className='skills'>
                { skills.map(({ id, name, clients }) => 
                    <li key={ id }>
                        <Link to={ `/skills/${ id }` }>
                            { name } ({ clients.length })
                        </Link>
                    </li>)
                }
            </ul>
        </div>
    )
}

export default connect(state=>state)(Skills);