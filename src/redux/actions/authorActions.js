import * as authorApi from '../../api/authorApi';
import { beginApiCall, apiCallError } from './apiStatusActions';

export function loadAuthors(){
    return function(dispatch){
        dispatch(beginApiCall())
        return authorApi.getAuthors()
        .then(authors => {
            dispatch({
                type: 'LOAD_AUTHORS_SUCCESS',
                authors
            })
        }).catch(error => {
            dispatch(apiCallError(error));
            throw error;
        })
    }
}
