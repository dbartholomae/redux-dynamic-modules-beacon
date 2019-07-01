import flatten from 'array-flatten'
import { Action } from 'redux'
import { EventDefinition, EventsMap, EventsMapper } from 'redux-beacon'

export class EventsManager {
  private eventsMaps: (EventsMap | EventsMapper)[] = []

  private getEventsMaps (): EventsMapper[] {
    return this.eventsMaps.map(eventMapOrMapper => {
      if (typeof eventMapOrMapper === 'function') {
        return eventMapOrMapper
      }
      return (action: Action) => eventMapOrMapper[action.type]
    })
  }

  public getEventsMap = (action: Action) => {
    return flatten<EventDefinition>(
      this.getEventsMaps().map(mapper => mapper(action))
    )
  }

  public addEventsMap (eventMap: EventsMap | EventsMapper) {
    this.eventsMaps.push(eventMap)
  }

  public removeEventsMap (eventMap: EventsMap | EventsMapper) {
    this.eventsMaps = this.eventsMaps.filter(map => map !== eventMap)
  }
}
