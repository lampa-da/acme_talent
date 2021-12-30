import React from 'react';
import { connect } from 'react-redux';
import faker from 'faker';

const Home = () => {
    const bio = faker.lorem.paragraphs(5, '\\').split('\\');

    return(
        <div className='home'>
            <div className='home-left'>
                <div className='home-image-box'>
                    <img src={ faker.image.nature(320, 240) } />
                    <img src={ faker.image.fashion(320, 240) } />
                    <img src={ faker.image.business(320, 240) } />
                    <img src={ faker.image.city(320, 240) } />
                </div>
            </div>
            
            <div className='home-right'>
                <div className='pretentious-logo'>
                    <div>A<span>cme</span></div>
                    <div>.</div>
                    <div>T<span>alent</span></div>
                    <div>.</div>
                    <div>A<span>gency</span></div>
                    <div>.</div>
                </div>
                { bio.map(paragraph => <p> { paragraph } </p>) }
            </div>
        </div>
    )
}

export default connect(state => state)(Home);