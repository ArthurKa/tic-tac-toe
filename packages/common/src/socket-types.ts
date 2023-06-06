type CommonEvents = {
  sendCupPosition: (id: string, position: [number, number, number]) => void;
  shareCupPosition: (id: string) => void;
};

export interface ServerToClientEvents extends CommonEvents {
  mouseMove: (id: string, position: [number, number], names: string[]) => void;
  removeMousePointer: (id: string) => void;
}

export interface ClientToServerEvents extends CommonEvents {
  joinRoom: (roomId: string) => void;
  mouseMove: (position: [number, number]) => void;
}
