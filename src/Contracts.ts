import { IModule } from 'redux-dynamic-modules'
import { EventsMap, EventsMapper } from 'redux-beacon'

export type IEventRegistration = EventsMap | EventsMapper

export interface IEventModule<T> extends IModule<T> {
  events?: IEventRegistration
}
