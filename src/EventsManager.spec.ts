import { EventsManager } from './EventsManager'
import { EventDefinition } from 'redux-beacon'

describe('EventsManager', () => {
  describe('getEventsMap', () => {
    it('returns an empty array by default', () => {
      const eventsManager = new EventsManager()
      expect(eventsManager.getEventsMap({ type: 'A' })).toEqual([])
    })

    it('returns matching eventDefinitions added via addEventsMap eventsMap', () => {
      const eventsManager = new EventsManager()
      const eventDefinition: EventDefinition = action => 'event'
      eventsManager.addEventsMap({
        A: eventDefinition
      })
      expect(eventsManager.getEventsMap({ type: 'A' })).toEqual([
        eventDefinition
      ])
    })

    it('returns matching eventDefinitions added via addEventsMap eventsMapper', () => {
      const eventsManager = new EventsManager()
      const eventDefinition: EventDefinition = action => 'event'
      eventsManager.addEventsMap(() => eventDefinition)
      expect(eventsManager.getEventsMap({ type: 'A' })).toEqual([
        eventDefinition
      ])
    })

    it('returns an empty array if all event definitions are removed ', () => {
      const eventsManager = new EventsManager()
      const eventDefinition: EventDefinition = action => 'event'
      const eventsMap = {
        A: eventDefinition
      }
      eventsManager.addEventsMap(eventsMap)
      eventsManager.removeEventsMap(eventsMap)
      expect(eventsManager.getEventsMap({ type: 'A' })).toEqual([])
    })
  })
})
