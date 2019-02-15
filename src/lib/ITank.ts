import { TeamColor, Vector3F } from '../components/Tank';

export interface ITank {
  [key: string]: any;

  name: string;
  position: Vector3F;
  rotation: number;
  team: TeamColor;
  disabled: boolean;
}

export class DefaultTank implements ITank {
  public name: string = '';
  public position: Vector3F = [0, 0, 0];
  public rotation: number = 0;
  public team: TeamColor = TeamColor.Red;
  public disabled: boolean = false;
}
