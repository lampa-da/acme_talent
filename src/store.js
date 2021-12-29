import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';
import logger from 'redux-logger';

const clientsReducer = (state = [], action) => {
    if(action.type === 'LOAD_CLIENTS') {
        state = action.clients
    }
    else if (action.type === 'UPDATE_CLIENT') {
        const client = action.clients.find(client => client);
        const existingClients = state.filter(existingClient => existingClient.id !== client.id)
        state = [...existingClients, client];
    }
    return state;
}

const skillsReducer = (state = [], action) => {
    if(action.type === 'LOAD_SKILLS') {
        state = action.skills
    }
    else if (action.type === 'UPDATE_SKILL') {
        const skill = action.skills.find(ele=>ele);
        const existingSkills = state.filter(existingSkill => existingSkill.id !== skill.id);
        state = [...existingSkills, skill];
    }
    return state;
}

const clientReducer = (state = {}, action) => {
    if(action.type === 'SELECT_CLIENT') {
        state = action.client
    }
    else if(action.type === 'ADD_SKILL') {
        state = action.client
    }
    else if(action.type === 'REMOVE_SKILL') {
        state = action.client
    }
    return state;
}

const reducer = combineReducers({
    clients: clientsReducer,
    skills: skillsReducer,
    client: clientReducer
});

const _loadSkills = (skills) => {
    return(
        {
            type: 'LOAD_SKILLS',
            skills
        }
    )
}

export const loadSkills = () => {
    return async(dispatch) => {
        const skills = (await axios.get('/api/skills')).data;
        dispatch(_loadSkills(skills))
    }
}

const _loadClients = (clients) => {
    return (
        {
            type: 'LOAD_CLIENTS',
            clients
        }
    )
}

export const loadClients = () => {
    return async(dispatch) => {
        const clients = (await axios.get('/api/clients')).data;
        dispatch(_loadClients(clients));
    }
}

const _selectClient = (client) => {
    return {
        type: 'SELECT_CLIENT',
        client
    }
}

export const selectClient = (client) => {
    return (dispatch) => {
        dispatch(_selectClient(client))
    }
}

const _removeSkill = (client) => {
    return {
        type: 'REMOVE_SKILL',
        client
    }
}

const _addSkill = (client) => {
    return {
        type: 'ADD_SKILL',
        client
    }
}

const _updateSkill = (skill) => {
    return {
        type: 'UPDATE_SKILL',
        skills: [ skill ]
    }
}

const _updateClient = (client) => {
    return {
        type: 'UPDATE_CLIENT',
        clients: [ client ]
    }
}

export const modifyClient = ({ addRemove, clientId, skillId }) => {
    // console.log({addRemove, clientId, skillId});
    return async (dispatch) => {
        const result = await axios.put('/api/clientSkills/', { addRemove, clientId, skillId });
        
        if(result.status === 200) {
            const { client, skill } = result.data;
            if(addRemove === 'addSkill') {
                dispatch(_addSkill(client));
                dispatch(_updateClient(client));
                dispatch(_updateSkill(skill));
            } else if (addRemove === 'removeSkill') {
                dispatch(_removeSkill(client));
                dispatch(_updateClient(client));
                dispatch(_updateSkill(skill));
            }
        }

    }
}

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;