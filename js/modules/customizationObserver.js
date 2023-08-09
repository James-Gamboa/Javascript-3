class CustomizationObserver {
  constructor() {
    this.subscribers = [];
  }

  subscribe(subscriber) {
    this.subscribers.push(subscriber);
  }

  unsubscribe(subscriber) {
    this.subscribers = this.subscribers.filter((sub) => sub !== subscriber);
  }

  notify() {
    this.subscribers.forEach((subscriber) => {
      if (typeof subscriber.update === "function") {
        subscriber.update();
      }
    });
  }
}

export { CustomizationObserver };
