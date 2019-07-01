import { createMiddleware, Target } from 'redux-beacon'
import { IExtension } from 'redux-dynamic-modules'
import { IEventModule } from './Contracts'
import { EventsManager } from './EventsManager'

/**
 * Get an extension that integrates redux-beacon events with the store
 * @param target - The redux beacon target to send events to
 */
export function getBeaconExtension (target: Target): IExtension {
  const eventsManager = new EventsManager()

  // Setup the event middleware
  const eventMiddleware = createMiddleware(eventsManager.getEventsMap, target)

  return {
    middleware: [eventMiddleware],

    onModuleAdded: (module: IEventModule<any>): void => {
      if (module.events) {
        eventsManager.addEventsMap(module.events)
      }
    },

    onModuleRemoved: (module: IEventModule<any>): void => {
      if (module.events) {
        eventsManager.removeEventsMap(module.events)
      }
    }
  }
}
