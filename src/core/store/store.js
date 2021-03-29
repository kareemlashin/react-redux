import {
    createStore,
    applyMiddleware,
    compose,
     combineReducers
} from 'redux';

import thunk from 'redux-thunk';
import {
    initialState
} from './../state/state.js'

const reducers = (state = initialState, action) => {
     if (action.type == 'GET_DATA') {
        return {
            ...state,
            toDo: action.toDo
        }

    }
    else if (action.type == 'spinner') {

        return {
            ...state,
            spinner:action.spinner
        }

    }
    
    else if (action.type == 'loadingPage') {

        return {
            ...state,
            loadingPage:action.loadingPage
        }

    }
    
    else if (action.type == 'message') {

        return {
            ...state,
            message:action.message
        }

    }
    
    else if (action.type == 'REMOVE_DATA') {

        let index = state.toDo.findIndex(x => action.users == x.id)
        state.toDo.splice(index, 1);
        return {
            ...state,
            toDo: [...state.toDo]
        }

    }
    else if (action.type == 'CREATE_DATA') {

        return {
            ...state,
            toDo: [...state.toDo,action.toDo]
        }

    } else if (action.type == 'UPDATE_DATA') {

        let index = state.toDo.findIndex(x => action.toDo == x.id)
        state.toDo.splice(index, 1, action.news);
        return {
            ...state,
            toDo: [...state.toDo]
        }

    } else if (action.type == 'SINGLE_DATA') {
        return {
            ...state,
            update:{...action.update}
        
        }

    } else {
        return state
    }

}


const root=combineReducers({
    reducers:reducers,
});
export default createStore(root, compose(applyMiddleware(thunk)))