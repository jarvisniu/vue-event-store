# vue-event-store

Simplified, typed, centralized event management for Vue

## Usage

Firstly, define your events.

> This is typed, centralized and organized.

```ts
// event-store.ts
import { createEvent } from "vue-event-store";

export default {
  user: {
    login: createEvent<string>(),
    logout: createEvent(),
  },
  otherModule: {
    foo: createEvent(),
    bar: createEvent(),
  },
};
```

Then, use `useEvent` composable to listen to the events.

> The listener will be automatically removed on unmount.

```ts
// send-page.vue
import { useEvent } from "vue-event-store";
import eventStore from "./event-store";

useEvent(eventStore.user.login, (username) => {
  alert(`${username} logged in`);
});
```

Finally, trigger the events.

> It's just like calling normal functions.

```ts
// receive-page.vue
import eventStore from "./event-store";

<button @click="eventStore.user.login('jarvis')">Login</button>
```

# License

MIT
