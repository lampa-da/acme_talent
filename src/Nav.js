import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
    return(
        <nav>
            <div className='nav-left'>
                <Link to={'/'}>Home</Link>
                <Link to={'/clients/'}>Clients</Link>
            </div>
            <div id='nav-center'><h1>A . T . A</h1></div>
            <div id='nav-right'></div>
        </nav>
    )
}

export default Nav;