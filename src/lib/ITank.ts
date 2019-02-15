import { TeamColor, Vector3F } from '../components/Tank';

export interface ITank {
  [key: string]: any;

  name: string;
  position: Vector3F;
  rotation: number;
  team: TeamColor;
  disabled: boolean;
}
