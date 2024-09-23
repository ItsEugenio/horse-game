import React, { useState, useEffect, useRef } from "react";
import Horse from "./Horse";
import Timer from "./Timer";
import RaceHistory from "./RaceHistory"; 
import {
  initializeWorkers,
  startRaceInterval,
  stopRaceInterval,
  terminateWorkers,
} from "../../services/workerService";
import { checkWinner } from "../../domain/raceLogic";
import "../../styles/horserace.css";
import { Button } from "@nextui-org/react";
import HistoryModa from "./modals/HistoryModa";

function HorseRace() {
  const maxSteps = 50; 
  const [playerHorse, setPlayerHorse] = useState(0);
  const [horse1, setHorse1] = useState(0);
  const [horse2, setHorse2] = useState(0);
  const [raceStarted, setRaceStarted] = useState(false);
  const [canRollDice, setCanRollDice] = useState(true);
  const [timer, setTimer] = useState(0);
  const [raceHistory, setRaceHistory] = useState([]); 
  const [currentAdvances, setCurrentAdvances] = useState([]); 

  
  const worker1 = useRef(null);
  const worker2 = useRef(null);
  const timerWorker = useRef(null);
  const raceIntervalId = useRef(null);

 
  const playerRollDice = () => {
    if (canRollDice && raceStarted) {
      const steps = Math.floor(Math.random() * 6) + 1;
      setPlayerHorse((prev) => prev + steps);
      setCanRollDice(false);

      setTimeout(() => {
        setCanRollDice(true);
      }, 1000);
    }
  };

 
  const resetRace = () => {
    setPlayerHorse(0);
    setHorse1(0);
    setHorse2(0);
    setTimer(0);
    setCurrentAdvances([]);
    if (timerWorker.current) {
      timerWorker.current.postMessage("reset");
    }
  };

 
  const startRace = () => {
    resetRace();
    setRaceStarted(true);
    raceIntervalId.current = startRaceInterval(
      worker1.current,
      worker2.current
    );
    if (timerWorker.current) {
      timerWorker.current.postMessage("start");
    }
  };


  const stopRace = () => {
    console.log("Deteniendo la carrera...");
    setRaceStarted(false);
    raceIntervalId.current = stopRaceInterval(raceIntervalId.current);
    
    if (timerWorker.current) {
      timerWorker.current.postMessage("stop");
    }

    let winner;
    if (playerHorse >= maxSteps) {
      winner = "Tu Caballo";
    } else if (horse1 >= maxSteps) {
      winner = "Caballo El Matador";
    } else if (horse2 >= maxSteps) {
      winner = "Caballo Whisky";
    }

    const raceRecord = {
      raceId: `race_${raceHistory.length + 1}`,
      winner: winner,
      raceTime: timer,
      advances: currentAdvances,
    };

    setRaceHistory((prev) => [...prev, raceRecord]);

    setCurrentAdvances([]);
  };


  useEffect(() => {
    checkWinner(playerHorse, horse1, horse2, stopRace);
   
  }, [playerHorse, horse1, horse2]);

  
  useEffect(() => {
    if (raceStarted) {
      const newAdvance = {
        timestamp: timer,
        playerHorse: playerHorse,
        horse1: horse1,
        horse2: horse2,
      };
      setCurrentAdvances((prev) => [...prev, newAdvance]);
    }

  }, [timer]);


  useEffect(() => {
    const storedHistory = localStorage.getItem("raceHistory");
    if (storedHistory) {
      try {
        const parsedHistory = JSON.parse(storedHistory);
        setRaceHistory(parsedHistory);
      } catch (error) {
        console.error(
          "Error al parsear el historial de carreras desde localStorage:",
          error
        );
        // Si hay un error al parsear
        localStorage.removeItem("raceHistory");
      }
    }
  }, []);


  useEffect(() => {
    localStorage.setItem("raceHistory", JSON.stringify(raceHistory));
  }, [raceHistory]);

  
  useEffect(() => {
    
    const workers = initializeWorkers(setHorse1, setHorse2, setTimer);
    worker1.current = workers.worker1;
    worker2.current = workers.worker2;
    timerWorker.current = workers.timerWorker;

   
    return () => {
      console.log("Component unmounting, terminating workers...");
      stopRace(); 
      terminateWorkers(worker1.current, worker2.current, timerWorker.current); 
    };
   
  }, []); 

  const resetCounters = () => {
    setPlayerHorse(0);
    setHorse1(0);
    setHorse2(0);
    setTimer(0);
    setCurrentAdvances([]);

  };

  return (
    <div className="horse-race">
      <div className="imageBack">
        <h1>Carrera de Caballos</h1>
      </div>

      <Timer timer={timer} />
      <Horse name="Tu Caballo" position={playerHorse} maxSteps={maxSteps} />
      <Horse name="Caballo El Matador" position={horse1} maxSteps={maxSteps} />
      <Horse name="Caballo Whisky" position={horse2} maxSteps={maxSteps} />
      <div className="container-grass"></div>

      <div className="container-grass">
        <Button
          onClick={playerRollDice}
          disabled={!canRollDice || !raceStarted}
          color="success"
          size="lg"
        >
          Lanzar dado
        </Button>
        {!raceStarted && (
          <Button onClick={startRace} color="primary" className="m-2" size="lg">
            Comenzar Carrera IA
          </Button>
        )}
        <Button onClick={resetCounters} disabled={raceStarted} color="danger">
          Reiniciar Contadores
        </Button>
      </div>
      <div className="container-floor">
        <HistoryModa history={raceHistory} />
      </div>
      <div className="container-street"></div>
      <div className="street-aux">

      </div>
      <div className="container-street"></div>
    </div>
  );
}

export default HorseRace;
