import { getEventsByCategory } from "./api.js";
const eventCache = {};

const cacheHandler = {
  get(target, prop) {
    if (prop === 'getEventsFromCache') {
      return (category) => {
        if (!target[category]) {
          target[category] = getEventsByCategory(category);
        }
        return target[category];
      };
    }
    return target[prop];
  },
};

const proxiedEventCache = new Proxy(eventCache, cacheHandler);

export const getEventsFromCache = proxiedEventCache.getEventsFromCache;
export const setEventsInCache = (category, events) => {
  proxiedEventCache[category] = events;
};