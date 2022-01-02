export default class EventEmitter {
  events = new Map()
  on(type, handler, once) {
    if (!this.events.has(type)) {
      this.events.set(type, [])
    }
    ;(this.events.get(type) || []).push({
      handler,
      once
    })
    return () => {
      this.off(type, handler)
    }
  }
  once(type, handler) {
    return this.on(type, handler, true)
  }
  emit(type, ...args) {
    let i = 0
    while (i < (this.events.get(type) || []).length) {
      const handlers = this.events.get(type) || []
      const { handler, once } = handlers[i]
      if (once) {
        handlers.splice(i--, 1)
      }
      i++
      handler(...args)
    }
  }
  off(type, handler) {
    if (!type) return
    if (!handler) {
      this.events.set(type, [])
      return
    }
    this.events.set(
      type,
      (this.events.get(type) || []).filter(item => item.handler !== handler)
    )
  }
}
