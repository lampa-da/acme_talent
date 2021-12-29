import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import store from './store';
import { connect } from 'react-redux';

class SkillProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            skillId: window.location.hash.slice(window.location.hash.lastIndexOf('/') + 1) * 1,
            skillName: '',
        }
        this.onModify = this.onModify.bind(this);
        console.log(props)
    }

    onModify(ev) {
        this.setState({ skillName: ev.target.value});
    }

    render() {
        const { skills } = this.props;
        const { skillName } = this.state;

        return(
            <div className='skill-profile'>
                <form>
                <input type='text' value={ skillName } onChange={ this.onModify }></input>

                </form>
                <Link to='/'>Back to Main Page</Link>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { state }
}

export default connect(mapStateToProps)(SkillProfile);