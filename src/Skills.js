import React from 'react';
import { Link } from 'react-router-dom';

const Skills = (props) => {
    const { skills } = props;

    return(
        <div>Skills
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

export default Skills;