import React from 'react'
function RaceHistory({history }) {
   

  return (
    <div >
    <h2>Historial de Carreras</h2>
    {history.length < 1 ? (
      <p>No hay carreras registradas.</p>
    ) : (
      history.map(race => (
        <div key={race.raceId} >
          <h3>{race.raceId}</h3>
          <p>Ganador: {race.winner}</p>
          <p>Tiempo de Carrera: {race.raceTime} segundos</p>
          <h4>Avances:</h4>
          <ul>
            {race.advances.map(advance => (
              <li key={advance.timestamp}>
                {advance.timestamp}s - Tu Caballo: {advance.playerHorse}, Caballo 1 (IA): {advance.horse1}, Caballo 2 (IA): {advance.horse2}
              </li>
            ))}
          </ul>
        </div>
      ))
    )}
  </div>
  )
}

export default RaceHistory
