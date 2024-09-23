export function initializeWorkers(setHorse1, setHorse2, setTimer) {
    // Crear Workers desde archivos
    const worker1 = new Worker(new URL('./workers/horseWorker.js', import.meta.url));
    const worker2 = new Worker(new URL('./workers/horseWorker.js', import.meta.url));
    const timerWorker = new Worker(new URL('./workers/timerWorker.js', import.meta.url));
  
    // Manejar mensajes de los workers de caballos
    worker1.onmessage = (e) => {
      setHorse1(prev => prev + e.data);
    };
  
    worker2.onmessage = (e) => {
      setHorse2(prev => prev + e.data);
    };
  
    // Manejar mensajes del worker del temporizador
    timerWorker.onmessage = (e) => {
      setTimer(e.data);
    };
  
    return { worker1, worker2, timerWorker };
  }
  
  export function startRaceInterval(worker1, worker2) {
    const raceIntervalId = setInterval(() => {
      worker1.postMessage("roll");
      worker2.postMessage("roll");
    }, 1000);
    return raceIntervalId;
  }
  
  export function stopRaceInterval(raceIntervalId) {
    if (raceIntervalId) {
      clearInterval(raceIntervalId);
      return null;
    }
    return raceIntervalId;
  }
  
  export function terminateWorkers(worker1, worker2, timerWorker) {
    if (worker1) {
      console.log("Terminando worker1");
      worker1.terminate();
    }
    if (worker2) {
      console.log("Terminando worker2");
      worker2.terminate();
    }
    if (timerWorker) {
      console.log("Terminando timerWorker");
      timerWorker.terminate();
    }
  }
  