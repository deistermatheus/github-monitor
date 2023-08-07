import { mapAxiosErrorToRedux, omitUndefined } from './helpers'

describe('Helper functions', () => {
    it('should omit undefined props from object', () => {
        const testPayload = { key: undefined, otherKey: 'defined'}
        const result = omitUndefined(testPayload)
        expect(result).toMatchObject({otherKey: 'defined'})
    })

    it('should map axios error to redux payload', () => {
        const action = jest.fn(data => data)
        const dispatch = jest.fn(data => data)
        const firstVariation = {response: {data: 'some error message'}}
        const secondVariation = {response: {data: {detail: 'some other error message'}}}

        mapAxiosErrorToRedux({ error: firstVariation, action, dispatch})
        expect(action).toHaveBeenCalledWith('errorMessage', 'some error message')
        expect(dispatch).toHaveBeenCalled()
        mapAxiosErrorToRedux({ error: secondVariation, action, dispatch})
        expect(action).toHaveBeenCalledWith('errorMessage', 'some other error message')
        expect(dispatch).toHaveBeenCalled()
    })
})