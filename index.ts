import { EventEmitter } from 'events'
import { onMounted, onUnmounted } from 'vue'

// The event bus
const eventBus = new EventEmitter()

// Generate event ids
let lastId = -1
function nextId() {
  lastId += 1
  return `event-${lastId}`
}

// Event type
export type EventType<T> = {
  (params: T): void
  on: (callback: (params: T) => void) => void
  off: (callback: (params: T) => void) => void
}

// Create event objects
export function createEvent<T = void>(): EventType<T> {
  const id = nextId()
  const eventEmit: EventType<T> = (arg: T) => eventBus.emit(id, arg)
  eventEmit.on = (fn: (arg: T) => void) => eventBus.on(id, fn)
  eventEmit.off = (fn: (arg: T) => void) => eventBus.off(id, fn)
  return eventEmit
}

// useEvent composable for Vue
export function useEvent<T>(event: EventType<T>, handler: (params: T) => void) {
  onMounted(() => {
    event.on(handler)
  })
  onUnmounted(() => {
    event.off(handler)
  })
}
