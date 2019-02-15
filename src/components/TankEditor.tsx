import React, { Component, SyntheticEvent } from 'react';
import { ITank } from '../lib/ITank';
import { TeamColor, Vector3F } from './Tank';

import styles from './TankEditor.module.css';

interface Props {
  tankDef: ITank;

  onPreviewChanges: (preview: ITank) => void;
  onCancelChanges: () => void;
  onSaveChanges: (final: ITank) => void;
}

interface State {
  tankDef: ITank;
}

export default class TankEditor extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      tankDef: props.tankDef,
    };
  }

  public handleChange = (
    change: SyntheticEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const target = change.currentTarget;
    const name: string = target.name;
    const pos: { [key: string]: number } = {
      'x-pos': 0,
      'y-pos': 1,
      'z-pos': 2,
    };

    const tankDef = Object.assign({}, this.state.tankDef);

    if (Object.keys(pos).indexOf(name) >= 0) {
      const newPos = tankDef.position.slice() as Vector3F;
      newPos[pos[name]] = target.value.length ? +target.value : '';

      tankDef.position = newPos;
    } else {
      tankDef[name] = target.value;
    }

    this.props.onPreviewChanges(tankDef);

    this.setState({
      tankDef,
    });
  };

  public handleCancel = () => {
    this.props.onCancelChanges();
  };

  public handleSave = () => {
    this.props.onSaveChanges(this.state.tankDef);
  };

  public render(): React.ReactNode {
    const teams: JSX.Element[] = [];
    let i: number = 0;

    for (let team in TeamColor) {
      teams.push(
        <option key={i} value={TeamColor[team]}>
          {team}
        </option>,
      );
      i++;
    }

    return (
      <div className={styles.TankEditor}>
        <div className={styles.FieldGroup}>
          <label className={styles.FieldLabel} htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={this.handleChange}
            value={this.state.tankDef.name}
          />
        </div>
        <fieldset className={styles.FieldGroup}>
          <legend>Position</legend>

          <div style={{ display: 'flex' }}>
            <div>
              <label className={styles.FieldLabel} htmlFor="xpos">
                X-Pos
              </label>
              <input
                type="number"
                id="xpos"
                name="x-pos"
                onChange={this.handleChange}
                value={this.state.tankDef.position[0]}
              />
            </div>

            <div>
              <label className={styles.FieldLabel} htmlFor="ypos">
                Y-Pos
              </label>
              <input
                type="number"
                id="ypos"
                name="y-pos"
                onChange={this.handleChange}
                value={this.state.tankDef.position[1]}
              />
            </div>

            <div>
              <label className={styles.FieldLabel} htmlFor="zpos">
                Z-Pos
              </label>
              <input
                type="number"
                id="zpos"
                name="z-pos"
                onChange={this.handleChange}
                value={this.state.tankDef.position[2]}
              />
            </div>
          </div>
        </fieldset>

        <div className={styles.FieldGroup} style={{ display: 'flex' }}>
          <div>
            <label className={styles.FieldLabel} htmlFor="rotation">
              Rotation
            </label>
            <input
              type="number"
              id="rotation"
              name="rotation"
              onChange={this.handleChange}
              value={this.state.tankDef.rotation}
            />
          </div>

          <div>
            <label className={styles.FieldLabel} htmlFor="team">
              Team
            </label>
            <select
              name="team"
              id="team"
              onChange={this.handleChange}
              value={this.state.tankDef.team}
            >
              {teams}
            </select>
          </div>
        </div>

        <div className={styles.FieldGroup}>
          <button onClick={this.handleCancel}>Cancel</button>
          <button onClick={this.handleSave}>Save</button>
        </div>
      </div>
    );
  }
}
