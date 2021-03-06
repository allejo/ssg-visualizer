import { TeamColor, Vector3F } from '../components/Tank';
import { IPositionable } from './IPositionable';

export interface ITank extends IPositionable {}

export class DefaultTank implements ITank {
  public type: string = 'tank';
  public name: string = '';
  public position: Vector3F = [0, 0, 0];
  public rotation: number = 0;
  public team: TeamColor = TeamColor.Red;
  public disabled: boolean = false;
}
