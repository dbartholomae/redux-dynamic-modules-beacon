import { createStore } from 'redux-dynamic-modules'
import { getBeaconExtension } from './getBeaconExtension'
import { IEventModule } from './Contracts'

function getTestModule (): IEventModule<undefined> {
  return {
    id: 'test-module',
    events: {
      actionType: () => 'event'
    }
  }
}

describe('getBeaconExtension', () => {
  it('registers module and starts passes through events', () => {
    const testTarget = jest.fn()
    const store = createStore(
      {},
      [],
      [getBeaconExtension(testTarget)],
      getTestModule()
    )
    store.dispatch({ type: 'actionType' })
    expect(testTarget).toHaveBeenCalledWith(['event'])
  })

  it('ignores events from removed modules', () => {
    const testTarget = jest.fn()
    const store = createStore(
      {},
      [],
      [getBeaconExtension(testTarget)],
      getTestModule()
    )

    function getSecondTestModule (): IEventModule<undefined> {
      return {
        id: 'second-test-module',
        events: {
          actionType2: () => 'event2'
        }
      }
    }

    const removeModule = store.addModule(getSecondTestModule())
    removeModule.remove()
    store.dispatch({ type: 'actionType2' })
    expect(testTarget).not.toHaveBeenCalled()
  })

  it('handles modules without events without errors', () => {
    const testTarget = jest.fn()
    const store = createStore(
      {},
      [],
      [getBeaconExtension(testTarget)],
      getTestModule()
    )
    function getModuleWithoutEvents (): IEventModule<undefined> {
      return {
        id: 'module-without-events'
      }
    }

    const removeModule = store.addModule(getModuleWithoutEvents())
    removeModule.remove()

    store.dispatch({ type: 'actionType' })
    expect(testTarget).toHaveBeenCalledWith(['event'])
  })
})
