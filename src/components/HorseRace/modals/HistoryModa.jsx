import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Divider,
} from "@nextui-org/react";
function HistoryModa({ history }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button onPress={onOpen} size="md" color="primary">
        Abrir Historial
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        backdrop="blur"
        size="3xl"
        scrollBehavior="inside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                HISTORIAL DE CARRERAS
              </ModalHeader>
              <ModalBody>
                <div>
                  <Divider className="my-4" />
                  <h2 className="text-center text-xl">
                    Historial de todas las Carreras
                  </h2>
                  {history.length < 1 ? (
                    <p>No hay carreras registradas.</p>
                  ) : (
                    history.map((race) => (
                      <div key={race.raceId}>
                        <Divider className="my-4" />
                        <h3>{race.raceId}</h3>
                        {/* <p className="text-yellow-400">Ganador: {race.winner}</p> */}
                        <div>
                          <span>Ganador: </span>
                          <span className="text-yellow-400 text-xl">
                            {race.winner}
                          </span>
                        </div>

                        <p>Tiempo de Carrera: {race.raceTime} segundos</p>
                        <h4>Avances:</h4>
                        <ul>
                          {race.advances.map((advance) => (
                            <li key={advance.timestamp}>
                              {advance.timestamp}s - Tu Caballo:{" "}
                              {advance.playerHorse}, Caballo El Matador:{" "}
                              {advance.horse1}, Caballo Whisky: {advance.horse2}
                            </li>
                          ))}
                        </ul>
                        <Divider className="my-4" />
                      </div>
                    ))
                  )}
                  <Divider className="my-4" />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cerrar Historial
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default HistoryModa;
