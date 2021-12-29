import React, { Component } from 'react';
import axios from 'axios';
import Clients from './Clients';
import Skills from './Skills';
import ClientProfile from './ClientProfile';
import SkillProfile from './SkillProfile';

import { connect } from 'react-redux';
import store from './store';


import { HashRouter as Router, Route, Switch, Link } from 'react-router-dom';

class App extends Component {
    constructor () {
        super();
        this.state = { clients: [], skills: [] }
        this.modifyClient = this.modifyClient.bind(this);
        this.modifySkill = this.modifySkill.bind(this);
    }

    async componentDidMount() {
        const clients = (await axios.get('/api/clients')).data;
        const skills = (await axios.get('/api/skills')).data;
        this.setState({ clients, skills });
    }

    async modifyClient({ action, clientId, skillId }) {

        const result = await axios.put('/api/clientSkills/', { action, clientId, skillId });

        if(result.status === 200) {
            const { client, skill } = result.data;
            
            let oldClient = this.state.clients.find(client => client.id === clientId);
            oldClient.skills = client.skills;
            
            let oldSkill = this.state.skills.find(skill => skill.id === skillId);
            oldSkill.clients = skill.clients;
            
            this.setState(this.state);
        }
    }

    async modifySkill(...props) {
        console.log(props);
    }

    render() {
        const { clients, skills } = this.state;

        return(
            <Router>
                <h1>Lotsah Talent Agency</h1>
                <div id='app'>
                    <Switch>
                        <Route path='/clients/:id'> 
                            <ClientProfile clients={ clients } skills={ skills } modifyClient={ this.modifyClient } addSkill={ this.addSkill }/>
                        </Route>
                        <Route path='/skills/:id' component={ SkillProfile } skills >
                        </Route>
                        <Route path='/'>
                            <Clients clients={ clients }/>
                            <Skills skills={ skills }/>
                        </Route>
                    </Switch>
                </div>
            </Router>
        )
    }
}

export default App;