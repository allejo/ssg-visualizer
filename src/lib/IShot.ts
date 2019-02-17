import { TeamColor, Vector3F } from '../components/Tank';
import { IPositionable } from './IPositionable';

export interface IShot extends IPositionable {
  elevation: number;
  flag: string;
}

export class DefaultShot implements IShot {
  public type: string = 'shot';
  public name: string = '';
  public position: Vector3F = [0, 0, 0];
  public rotation: number = 0;
  public elevation: number = 0;
  public flag: string = 'US';
  public team: TeamColor = TeamColor.Red;
  public disabled: boolean = false;
}
