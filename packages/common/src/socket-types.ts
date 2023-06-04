type CommonEvents = {
  sendCupPosition: (id: string, position: [number, number, number]) => void;
  shareCupPosition: (id: string) => void;
};

export interface ServerToClientEvents extends CommonEvents {}

export interface ClientToServerEvents extends CommonEvents {
  joinRoom: (roomId: string) => void;
}
