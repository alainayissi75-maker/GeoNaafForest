export type BaseMapType = 'standard' | 'satellite' | 'hybrid' | 'terrain';

export type OperationalMapLayer =
  | 'forest'
  | 'agriculture'
  | 'incidents'
  | 'drones'
  | 'iot';

export interface GeoMapProps {
  baseMap: BaseMapType;
  layers: OperationalMapLayer[];
}
