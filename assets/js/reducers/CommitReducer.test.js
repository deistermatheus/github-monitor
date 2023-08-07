import commitReducer from "./CommitReducer";
import { getCommitsSuccess, getRepositoriesSuccess , setSuccessMessage, setErrorMessage, updateLoadingState, updateCommitQuery } from '../actions'

const initialState = {
    commits: [],
    repositories: [],
    fetchCommitState: {
      pagination: {
        next: null,
        previous: null,
        count: 0,
      },
      query: {
        page: 1,
      },
    },
    successMessage: false,
    errorMessage: null,
    isLoading: false,
  }


describe('Reducer logic', () => {
    it('should store get commits response', () => {
        const action = getCommitsSuccess({
            results: [{name: 'dummy-commit'}],
            next: 'some-url',
            previous: null,
            count: 1
        })

        const nextState = commitReducer(initialState, action);
        expect(nextState.commits).toMatchObject(action.payload.results);
    });

    it('should store pagination data from commits response', () => {
        const action = getCommitsSuccess({
            results: [{name: 'dummy-commit'}],
            next: 'some-url',
            previous: null,
            count: 1
        })

        const nextState = commitReducer(initialState, action);
        expect(nextState.fetchCommitState.pagination).toMatchObject({next: 'some-url',
        previous: null,
        count: 1
        });
    })

    it('should store get repositories response', () => {
        const action = getRepositoriesSuccess(
           [{name: 'dummy-repository'}]
        )

        const nextState = commitReducer(initialState, action);
        expect(nextState.repositories).toMatchObject(action.payload);
    });

    it('should set succes message', () => {
        const action = setSuccessMessage(
            true
         )
       
         const nextState = commitReducer(initialState, action);
         expect(nextState.successMessage).toBe(true);
    })

    it('should set error message', () => {
        const action = setErrorMessage(
            'Something went wrong!'
         )
       
         const nextState = commitReducer(initialState, action);
         expect(nextState.errorMessage).toBe('Something went wrong!');
    })

    it('should update loading state', () => {
        const loadingStateAction = updateLoadingState(true)
        const nextStateLoading = commitReducer(initialState, loadingStateAction);
        expect(nextStateLoading.isLoading).toBe(true);
        const notLoadingStateAction = updateLoadingState(false)
        const nextStateNotLoading = commitReducer(initialState, notLoadingStateAction);
        expect(nextStateNotLoading.isLoading).toBe(false);
    })

    it('should update commit query params and omit undefined props', () => {
        const action = updateCommitQuery({
           repository: undefined,
           author: 'Jest Commiter',
           page: 2
        })
       
         const nextState = commitReducer(initialState, action);
         expect(nextState.fetchCommitState.query).toMatchObject({ author:  'Jest Commiter', page:  2})
    })
})