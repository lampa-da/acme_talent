import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { modifyClient } from './store';

const ClientProfile = (props) => {
    const { modifyClient, client } = props;
    const allPossibleSkills = props.skills;

    let newSkill = '';

    function handleChange(event) {
        newSkill = event.target.value * 1;
        event.preventDefault();
    }

    function addSkillButton(event) {
        event.preventDefault();
        modifyClient({ addRemove: 'addSkill', clientId: client.id, skillId: newSkill });
    }

    if (!client || !client.skills) {
        return(<div>Loading...</div>);
    } else {
        const { id: clientId, name, skills } = client;
        const additionalSkills = skills.length === 0 ? allPossibleSkills:allPossibleSkills.filter(({ id }) => skills.findIndex(skill => skill.id === id) < 0);
        
        return(
            <div>
                <h3>Client Profile: { name }</h3>
                {
                    skills.length === 0 ? 
                    <p> { name } has <u>no</u> skills.</p>:
                    <p>{ name } is highly talented at 
                    {
                        skills.map((skill, index) => (
                                <span className='client-profile skills-list' key={ skill.id }>
                                    { skill.name }
                                    <button className='client-profile remove-skill' onClick={ () => modifyClient({ addRemove: 'removeSkill', clientId, skillId: skill.id }) }>x</button>
                                    { index === skills.length - 2 ? 'and':'' }
                                    { index < skills.length - 2 ? ',':'' }
                                </span>
                            )
                        )
                    }
                    </p>
                }
                <form onSubmit={ addSkillButton }>
                    <select className='client-profile' onChange={ handleChange } >
                        <option> --- add a skill --- </option>
                        { 
                            additionalSkills.map(skill => <option key={ skill.id } value={ skill.id } >{ skill.name }</option>)
                        }
                    </select>
                    <button type='submit' className='client-profile add-skill'>+</button>
                </form>
                <br/>
                <Link to='/'><u>Back to Home Page</u></Link>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        modifyClient: ({addRemove, clientId, skillId}) => dispatch(modifyClient({addRemove, clientId, skillId})),
    }
}

export default connect(state => state, mapDispatchToProps)(ClientProfile);