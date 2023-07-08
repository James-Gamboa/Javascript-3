import { getEventsByCategory } from "./api.js";

const eventCache = {};

const proxiedEventCache = new Proxy(eventCache, {
  get(target, prop) {
    if (prop === "getEventsFromCache") {
      return async (category) => {
        if (!target[category]) {
          target[category] = await getEventsByCategory(category);
        }
        return target[category];
      };
    }
    return target[prop];
  },
});

export const getEventsFromCache = proxiedEventCache.getEventsFromCache;
export const setEventsInCache = (category, events) => {
  proxiedEventCache[category] = events;
};
