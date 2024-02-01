class EventEmitter {
  all

  constructor (events) {
    this.all = events || new Map()
  }

  on (eventName, cb) {
    if (this.all.has(eventName)) {
      const events = this.all.get(eventName)
      events && events.add(cb)
    } else {
      const events = new Set()
      events.add(cb)
      this.all.set(eventName, events)

    }
  }

  emit (eventName) {
    const events = this.all.get(eventName)
    const args = Array.prototype.slice.call(arguments, 1)
    events && events.forEach(cb => {
      cb.call(null, ...args)
    })
  }

  off (eventName, cb) {
    const events = this.all.get(eventName)
    if (cb) {
      events.delete(cb)
    } else {
      this.all.delete(eventName)
    }
  }
}

const eventEmitter = new EventEmitter()

eventEmitter.on('sayName', (name) => {
  console.log(`My name is :`, name);
})

setTimeout(() => {
  eventEmitter.emit('sayName', 'zhouxiahao')
}, 2000)