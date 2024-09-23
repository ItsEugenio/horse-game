self.onmessage = function(e) {
    if (e.data === "roll") {
      const steps = Math.floor(Math.random() * 6) + 1;
      self.postMessage(steps);
    }
  };