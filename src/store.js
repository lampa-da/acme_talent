import { createStore, combineReducers } from 'redux';
// import thunk from 'redux-thunk';

const loadClients = (clients) => {
    return (dispatch) => {
        dispatch({type: 'LOAD_CLIENTS', clients});
    }
}

const reducer = (state = [], action) => {
    if(action.type === 'LOAD_CLIENTS') {
        state = action.clients
    }
    return state;
}

const store = createStore(state=>state);

export default store;