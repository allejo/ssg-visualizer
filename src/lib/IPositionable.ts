import { TeamColor, Vector3F } from '../components/Tank';

export interface IPositionable {
  [key: string]: any;

  type: string;
  name: string;
  position: Vector3F;
  rotation: number;
  team: TeamColor;
  disabled: boolean;
}
