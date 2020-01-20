import initialState from './initialState';

export default function authorReducer(state=initialState.authors, action){
    switch(action.type){
        case 'LOAD_AUTHORS_SUCCESS':
            return action.authors
            // return{
            //     ...state,
            //     authors: action.authors
            // };
        default: 
            return state;
    }
}