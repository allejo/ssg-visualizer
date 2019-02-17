import React, { Component } from 'react';
import { ITank } from '../lib/ITank';

import styles from './Tank.module.css';
import App from '../App';

export enum TeamColor {
  Rogue = 'rogue',
  Red = 'red',
  Green = 'green',
  Blue = 'blue',
  Purple = 'purple',
  Rabbit = 'rabbit',
  Hunter = 'hunter',
}

type NullableNum = number | string;

export type Vector3F = [NullableNum, NullableNum, NullableNum];

interface Props {
  selected: boolean;
  tank: ITank;

  onClick: () => void;
}

export default class Tank extends Component<Props> {
  static TANK_WIDTH = 35;
  static TANK_HEIGHT = 70;

  static defaultProps = {
    tank: {
      name: '',
      position: [0, 0, 0],
      rotation: 0,
      team: TeamColor.Rogue,
      disabled: false,
    },
  };

  public render(): React.ReactNode {
    const style = {
      fill: Tank.getColorFromTeam(this.props.tank.team),
    };

    const xOffset: number = App.MAP_SIZE / 2 - Tank.TANK_WIDTH / 2;
    const yOffset: number = App.MAP_SIZE / 2 - Tank.TANK_HEIGHT / 2;
    const moveTransform = {
      transform: `translate(
        ${xOffset - -1 * +this.props.tank.position[0]}px,
        ${yOffset - +this.props.tank.position[1]}px
      )`,
    };

    const tankTransform = {
      transform: `rotate(${this.props.tank.rotation}deg)`,
    };

    return (
      <div className={styles.TankWrapper} style={moveTransform}>
        <div
          className={this.props.selected ? styles.TankSelected : undefined}
          style={tankTransform}
        >
          <svg
            version="1.1"
            x="0px"
            y="0px"
            width="35px"
            height="73px"
            viewBox="0 0 35 73"
            onClick={this.props.onClick}
          >
            <rect y="18.2" width="6.9" height="54.8" style={style} />
            <rect x="28.2" y="18.2" width="6.8" height="54.8" style={style} />
            <polygon
              points="19,24 19,0 16,0 16,24 8.2,24 8.2,69 26.9,69 26.9,24 "
              style={style}
            />
          </svg>
        </div>
      </div>
    );
  }

  private static getColorFromTeam(team: TeamColor): string {
    const colors: { [key in TeamColor]: string } = {
      [TeamColor.Rogue]: '#efe7b1',
      [TeamColor.Red]: '#af0005',
      [TeamColor.Green]: '#00bf2b',
      [TeamColor.Blue]: '#005eff',
      [TeamColor.Purple]: '#8100ef',
      [TeamColor.Rabbit]: '#aaaba3',
      [TeamColor.Hunter]: '#cd9700',
    };

    return colors[team];
  }
}
