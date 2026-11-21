export function createPauseBridge(frame, gameUrl, onStatus, events = window, timers = {
  setTimeout: (fn, delay) => setTimeout(fn, delay), clearTimeout: id => clearTimeout(id),
}) {
  const origin = new URL(gameUrl).origin;
  let supported = false;
  let desired = false;
  let serial = 0;
  let helloId = '';
  let commandId = '';
  let timer;
  const send = payload => frame.contentWindow?.postMessage({ version: 1, ...payload }, origin);
  const request = () => {
    timers.clearTimeout(timer);
    if (!supported) { onStatus('unavailable'); return; }
    commandId = `state-${++serial}`;
    onStatus('requesting');
    send({ type: 'beegame:set-paused', requestId: commandId, paused: desired });
    timer = timers.setTimeout(() => { commandId = ''; onStatus('unavailable'); }, 1500);
  };
  const onMessage = event => {
    const data = event.data;
    if (event.source !== frame.contentWindow || event.origin !== origin || data?.version !== 1) return;
    if (data.type === 'beegame:capabilities' && data.requestId === helloId && data.pause === true) {
      supported = true;
      request();
    } else if (data.type === 'beegame:paused' && commandId !== '' && data.requestId === commandId && data.paused === desired) {
      timers.clearTimeout(timer);
      commandId = '';
      onStatus(desired ? 'paused' : 'playing');
    }
  };
  events.addEventListener('message', onMessage);
  return {
    connect: () => {
      timers.clearTimeout(timer);
      supported = false;
      commandId = '';
      helloId = `hello-${++serial}`;
      onStatus('unavailable');
      send({ type: 'beegame:hello', requestId: helloId });
    },
    setPaused: paused => { desired = paused; request(); },
    dispose: () => { timers.clearTimeout(timer); events.removeEventListener('message', onMessage); },
  };
}
