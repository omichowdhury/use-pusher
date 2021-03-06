import { useCallback } from 'react';
import invariant from 'invariant';
import { Channel, PresenceChannel } from 'pusher-js';

export function useClientTrigger(channel: Channel | PresenceChannel) {
  channel &&
    invariant(
      channel.name.match(/(private-|presence-)/gi),
      "Channel provided to useClientTrigger wasn't private or presence channel. Client events only work on these types of channels."
    );

  // memoize trigger so it's not being created every render
  const trigger = useCallback(
    (eventName: string, data: any = {}) => {
      invariant(eventName, 'Must pass event name to trigger a client event.');
      channel && channel.trigger(eventName, data);
    },
    [channel]
  );

  return trigger;
}
