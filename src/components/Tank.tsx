import React, { Component } from 'react';
import Popup from './Popup';
import TankEditor from './TankEditor';
import { ITank } from '../lib/ITank';

import styles from './Tank.module.css';

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
  onUpdate: (final: ITank) => void;

  tank: ITank;
}

interface State {
  hasEditor: boolean;

  preview: ITank;
}

export default class Tank extends Component<Props, State> {
  static defaultProps = {
    tank: {
      name: '',
      position: [0, 0, 0],
      rotation: 0,
      team: TeamColor.Rogue,
      disabled: false,
    },
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      hasEditor: false,
      preview: props.tank,
    };
  }

  public handleClick = () => {
    this.setState((prevState: State) => ({
      hasEditor: !prevState.hasEditor,
    }));
  };

  public handleEditorClose = () => {
    this.setState({
      hasEditor: false,
    });
  };

  public handlePreview = (preview: ITank) => {
    this.setState({
      preview,
    });
  };

  public handleCancel = () => {
    this.setState({
      hasEditor: false,
      preview: this.props.tank,
    });
  };

  public handleSave = (final: ITank) => {
    this.props.onUpdate(final);

    this.setState({
      hasEditor: false,
      preview: final,
    });
  };

  public render(): React.ReactNode {
    const style = {
      fill: Tank.getColorFromTeam(this.state.preview.team),
    };

    const moveTransform = {
      transform: `translate(
        ${+this.state.preview.position[0]}px,
        ${-1 * +this.state.preview.position[1]}px
      )`,
    };

    const tankTransform = {
      transform: `rotate(${this.state.preview.rotation}deg)`,
    };

    return (
      <div className={styles.TankWrapper} style={moveTransform}>
        <div style={tankTransform}>
          <svg
            version="1.1"
            x="0px"
            y="0px"
            width="35px"
            height="73px"
            viewBox="0 0 35 73"
            onClick={this.handleClick}
          >
            <rect y="18.2" width="6.9" height="54.8" style={style} />
            <rect x="28.2" y="18.2" width="6.8" height="54.8" style={style} />
            <polygon
              points="19,24 19,0 16,0 16,24 8.2,24 8.2,69 26.9,69 26.9,24 "
              style={style}
            />
          </svg>
        </div>

        {this.state.hasEditor && (
          <Popup onClose={this.handleEditorClose}>
            <TankEditor
              onPreviewChanges={this.handlePreview}
              onCancelChanges={this.handleCancel}
              onSaveChanges={this.handleSave}
              tankDef={this.state.preview}
            />
          </Popup>
        )}
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
