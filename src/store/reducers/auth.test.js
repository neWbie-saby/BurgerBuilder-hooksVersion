import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('Auth reducer function', () => {
    
    let initState = null;
    beforeEach(() => {
        initState = {
            token: null,
            userId: null,
            error: null,
            loading: false,
            redirectPath: '/'
        }
    })

    it('should return initial State', () => {
        expect(reducer(undefined, {})).toEqual(initState);
    });

    it('should store token upon login', () => {
        expect(reducer(initState, {
            type: actionTypes.AUTH_SUCCESS,
            token: 'a-token',
            userId: 'an-user'
        })).toEqual({
            ...initState,
            token: 'a-token',
            userId: 'an-user'
        });
    })
})