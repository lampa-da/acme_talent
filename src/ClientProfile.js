import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { modifyClient } from './store';

class ClientProfile extends Component {
    constructor() {
        super();
        this.state = {
            newSkill: 0
        }
        this.changeOption = this.changeOption.bind(this);
        this.addRemoveSkill = this.addRemoveSkill.bind(this);
    }

    addRemoveSkill(event) {
        event.preventDefault();
        const addRemove = event.target.name;
        const clientId = this.props.client.id;
        
        if (addRemove === 'removeSkill') {
            var skillId = event.nativeEvent.target.attributes.skillid.value * 1;
        } else if (addRemove === 'addSkill') {
            var skillId = this.state.newSkill;
            //newSkill will disappear from select
            //so we need to updated DOM state
            this.setState({ newSkill: 0 });
        } else {
            return;
        }

        this.props.modifyClient({ addRemove, clientId, skillId });     
        console.log(this.state);
    }

    changeOption(event) {
        this.setState({ newSkill: event.target.value * 1});
    }

    render() {
        if (!this.props.client) {
            return(
                <div>
                    Loading...
                    <br/><br/>
                    <Link to='/'><u>Back to Home Page</u></Link>
                </div>
            );
        } else {
            console.log(this.props.client);
            const { name, skills, image, address, email, phone } = this.props.client;
            const allSkills = this.props.skills;
            const clientSkills = skills.map(skill => skill.id);
            const otherSkills = allSkills.filter(possibleSkill => clientSkills.indexOf(possibleSkill.id) < 0);

            return(
                <div className='client-profile'>
                    <h3>Client Profile</h3>
                    <div className='client-profile-vitals'>
                        <div className='client-profile left'>
                            <img className='client-profile-image' src={ image }></img>
                        </div>

                        <div className='client-profile right'>
                            <h3>{ name }</h3>
                            <p className='client-profile-contact'>
                                <a className='client-profile-email' href=''>{ email.toLowerCase() }</a><br/>
                                { phone }
                            </p>

                            <p className='client-profile-address'>
                                {address.street}<br/>
                                {address.city}, {address.state} {address.zipcode.slice(0,5)} <br/>
                            </p>
                        </div>
                    </div>

                    <div className='client-profile-skills'>
                        {
                            skills.length === 0 ? 
                            <p> { name } has <u>no</u> skills.</p>:
                            <p> { name } is highly talented at 
                            {
                                skills.map((skill, index) => (
                                        <span className='client-profile skills-list' key={ skill.id }>
                                        { index === skills.length - 1 ? 'and':'' } { skill.name }
                                            <button name='removeSkill' className='client-profile remove-skill' onClick={ this.addRemoveSkill } skillid={ skill.id } >x</button>
                                            { index < skills.length - 2 ? ',':'' }
                                        </span>
                                    )
                                )
                            }
                            </p>
                        }
                        <form onSubmit={ this.addRemoveSkill } name='addSkill'>
                            <select className='client-profile' onChange={ this.changeOption } >
                                <option value='0'> --- add a skill --- </option>
                                { 
                                    otherSkills.map(skill => <option key={ skill.id } value={ skill.id } >{ skill.name }</option>)
                                }
                            </select>
                            <button type='submit' className='client-profile add-skill' disabled={ this.state.newSkill===0 }>+</button>
                        </form>
                    </div>
                    <Link to='/'><u>Back to Home Page</u></Link>
                </div>
            )
        }
    }
}

const mapStateToProps = (state, otherProps) => {
    const clientId = otherProps.match.params.id * 1;
    return {
        ...state,
        client: state.clients.find(client => client.id === clientId)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        modifyClient: ({addRemove, clientId, skillId}) => dispatch(modifyClient({ addRemove, clientId, skillId })),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientProfile);