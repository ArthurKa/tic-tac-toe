type CommonEvents = {
  setCupPosition: (id: string, position: [number, number, number]) => void;
};

export interface ServerToClientEvents extends CommonEvents {}

export interface ClientToServerEvents extends CommonEvents {
  joinRoom: (roomId: string) => void;
}
