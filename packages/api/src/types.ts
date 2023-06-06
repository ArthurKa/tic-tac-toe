// eslint-disable-next-line @typescript-eslint/ban-types
export type InterServerEvents = {};

// eslint-disable-next-line @typescript-eslint/ban-types
export type SocketData = {};

export type IPLookup = {
  asn: `${number}` | '' | null;
  city: string | null;
  region: string | null;
  country: string | null;
  postal_code: string | null;
  isp: string | null;
  time_zone: string | null;
};
