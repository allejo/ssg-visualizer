import React, { Component } from 'react';
import Tank from './components/Tank';
import TankEditor from './components/TankEditor';
import { ConfigWriter } from './lib/ConfigWriter';
import { DefaultTank, ITank } from './lib/ITank';
import { IShot } from './lib/IShot';

import styles from './App.module.css';

interface Props {}

interface State {
  preview: IShot | ITank | null;
  selection: IShot | ITank | null;
  selectionID: number;
  tanks: ITank[];
}

export default class App extends Component<Props, State> {
  static MAP_SIZE = 500;

  constructor(props: Props) {
    super(props);

    this.state = {
      preview: null,
      selection: null,
      selectionID: -1,
      tanks: [new DefaultTank()],
    };
  }

  public handleNewTank = () => {
    const tanks = this.state.tanks.slice();

    tanks.push(new DefaultTank());

    this.setState({
      tanks,
    });
  };

  public handleTankClick = (key: number) => {
    this.setState({
      selection: this.state.tanks[key],
      selectionID: key,
    });
  };

  public handleTankEdit = (final: ITank) => {
    const editKey = this.state.selectionID;
    const tanks = this.state.tanks.slice();

    tanks[editKey] = final;

    this.handleEditorCancel();
    this.setState({
      tanks,
    });
  };

  public handleTankPreview = (preview: ITank) => {
    this.setState({
      preview: preview,
    });
  };

  public handleEditorCancel = () => {
    this.setState({
      preview: null,
      selection: null,
      selectionID: -1,
    });
  };

  public render(): React.ReactNode {
    const { preview, selection, selectionID } = this.state;
    const isTank = selection !== null && selection.type === 'tank';
    const isShot = selection !== null && selection.type === 'shot';

    return (
      <div>
        <div style={{ display: 'flex' }}>
          <div className={styles.MapPreview}>
            {this.state.tanks.map((tank: ITank, i: number) => {
              const tankDef = (isTank && selectionID === i && preview !== null) ? preview : tank;
              const isSelected = isTank && i === selectionID;

              return (
                <Tank
                  key={i}
                  tank={tankDef}
                  selected={isSelected}
                  onClick={() => this.handleTankClick(i)}
                />
              );
            })}
          </div>

          <div>
            <div>
              {selection === null && <p>No editable item selected</p>}
              {selection !== null && selection.type === 'tank' && (
                <TankEditor
                  tankDef={selection}
                  onPreviewChanges={this.handleTankPreview}
                  onCancelChanges={this.handleEditorCancel}
                  onSaveChanges={this.handleTankEdit}
                />
              )}
            </div>
            <pre>{ConfigWriter.writeConfig([...this.state.tanks])}</pre>
            <button onClick={this.handleNewTank}>Add Tank</button>
          </div>
        </div>
      </div>
    );
  }
}
