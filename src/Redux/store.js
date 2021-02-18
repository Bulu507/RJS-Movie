import {createStore} from 'redux';

const initialState = {
    api_key: '3a5f9096f90b10cf6a5223dd20e06429',
    language: 'en-US',
    page: 1,
    query: '',
    year: ''
};

const reducer = (state = initialState, action) => {

    switch(action.type){
        case 'SET_SEARCH_VALUE':
            return{
                ...state,
                query: action.value,
            }
        case 'SET_PAGE':
            return{
                ...state,
                page: action.value,
            }
        case 'SET_YEAR':
            return{
                ...state,
                year: action.value,
            }
        default:
            return state;
    }
}

const store = createStore(reducer);

export default store;