// Naive Event Observer Pattern object

export type EventCallback = (event: Event) => void;
export type EventCallbacksByEventType = {
  [key: string]: EventCallback[];
};
export class Events {
  private listeners = {} as EventCallbacksByEventType;
  addEventListener(eventType: string, callback: EventCallback) {
    if (!eventType || !callback || typeof callback !== 'function') {
      return;
    }
    this.listeners[eventType] = this.listeners[eventType] || ([] as EventCallback[]);
    this.listeners[eventType].push(callback);
  }
  removeEventListener(eventType: string, callback: EventCallback) {
    const targets = this.listeners[eventType] || [];
    let i = targets.length;
    while (i--) {
      if (targets[i] === callback) {
        targets.splice(i, 1);
      }
    }
  }
  dispatchEvent(eventType: string, eventData: any) {
    const event = new Event(eventType);
    Object.defineProperty(event, 'target', { writable: false, value: this });
    Object.defineProperty(event, 'data', { writable: false, value: eventData });

    const targets = this.listeners[eventType] || [];
    for (let i = 0; i < targets.length; i++) {
      if (typeof targets[i] == 'function') {
        targets[i].apply(targets[i], [event]);
      }
    }
  }
  on(eventType: string, callback: EventCallback) {
    const events = eventType.split(' ');
    for (let i in events) {
      this.addEventListener(events[i], callback);
    }
  }
  off(eventType: string, callback: EventCallback) {
    const events = eventType.split(' ');
    for (let i in events) {
      this.removeEventListener(events[i], callback);
    }
  }
  trigger(eventType: string, eventData: any) {
    const events = eventType.split(' ');
    for (let i in events) {
      this.dispatchEvent(events[i], eventData);
    }
  }
}

export default Events;
