import { ACTIONS } from './Actions'


const reducers = (state, action) => {
    switch(action.type){
        case ACTIONS.CONFIRMATION_KEY:
            return {
                ...state,
                confirmationKey: action.payload
            };
        default:
            return state;
    }
}

export default reducers