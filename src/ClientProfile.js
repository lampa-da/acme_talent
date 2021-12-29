import React from 'react';
import { useParams, Link } from 'react-router-dom';

const ClientProfile = (props) => {
    const { id } = useParams();
    const { clients, modifyClient, addSkill } = props;
    const allPossibleSkills = props.skills;
    const client = clients.find(c => c.id === id * 1);

    let newSkill = '';

    function handleChange(event) {
        newSkill = event.target.value * 1;
        event.preventDefault();
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
                                    <button className='client-profile remove-skill' onClick={ () => modifyClient({ action: 'destroy', clientId, skillId: skill.id }) }>x</button>
                                    { index === skills.length - 2 ? 'and':'' }
                                    { index < skills.length - 2 ? ',':'' }
                                </span>
                            )
                        )
                    }
                    </p>
                }
                <form onSubmit={ () => modifyClient({action: 'add', clientId, skillId: newSkill}) }>
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

export default ClientProfile;