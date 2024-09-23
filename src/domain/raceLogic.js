export function checkWinner(playerHorse, horse1, horse2, stopRace) {
    if (playerHorse >= 50) {
        stopRace();
        alert("¡Ganaste la carrera!");
    } else if (horse1 >= 50) {
        stopRace();
        alert("¡Caballo El Matador ganó!");
    } else if (horse2 >= 50) {
        stopRace();
        alert("¡El caballo Whisky ganó!");
    }
  }