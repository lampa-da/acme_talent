import React, { Component } from 'react';
import Clients from './Clients';
import Skills from './Skills';
import ClientProfile from './ClientProfile';
import SkillProfile from './SkillProfile';
import Nav from './Nav';
import Home from './Home';

import { connect } from 'react-redux';
import { loadClients, loadSkills } from './store';

import { HashRouter as Router, Route, Switch } from 'react-router-dom';

class App extends Component {

    async componentDidMount() {
        this.props.loadClients();
        this.props.loadSkills();
    }

    render() {
        return(
            <Router>
                <div id='app'>
                    <Nav/>
                    <Switch>
                        <Route path='/' component={ Home } exact/>
                        <Route path='/clients/:id' component={ ClientProfile }/>
                        <Route path='/skills/:id' component={ SkillProfile }/>
                        <Route path='/clients/'>
                            <Clients/>
                            <Skills/>
                        </Route>
                    </Switch>
                </div>
            </Router>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadClients: () => dispatch(loadClients()),
        loadSkills: () => dispatch(loadSkills())
    }
}

export default connect(state => state, mapDispatchToProps)(App);