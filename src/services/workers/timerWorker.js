let counter = 0;
let intervalId = null;

self.onmessage = function(e) {
  if (e.data === 'start') {
    if (!intervalId) {
      console.log("Temporizador iniciado");
      intervalId = setInterval(() => {
        counter += 1;
        self.postMessage(counter);
      }, 1000);
    }
  } else if (e.data === 'stop') {
    if (intervalId) {
      console.log("Temporizador detenido");
      clearInterval(intervalId);
      intervalId = null;
    }
  } else if (e.data === 'reset') {
    console.log("Temporizador reiniciado");
    counter = 0;
    self.postMessage(counter);
  }
};