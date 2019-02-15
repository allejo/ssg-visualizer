import React, { Component } from 'react';
import Tank, { TeamColor } from './components/Tank';
import './App.module.css';
import { DefaultTank, ITank } from './lib/ITank';
import { ConfigWriter } from './lib/ConfigWriter';

import styles from './App.module.css';

interface Props {}

interface State {
  tanks: ITank[];
}

export default class App extends Component<Props, State> {
  static MAP_SIZE = 500;

  constructor(props: Props) {
    super(props);

    this.state = {
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

  public handleTankEdit = (key: number, data: ITank) => {
    const tanks = this.state.tanks.slice();

    tanks[key] = data;

    this.setState({
      tanks,
    });
  };

  public render(): React.ReactNode {
    return (
      <div>
        <div style={{ display: 'flex' }}>
          <div className={styles.MapPreview}>
            {this.state.tanks.map((tank: ITank, i: number) => (
              <Tank
                key={i}
                tank={tank}
                onUpdate={(final: ITank) => {
                  this.handleTankEdit(i, final);
                }}
              />
            ))}
          </div>

          <div>
            <pre>{ConfigWriter.writeConfig([...this.state.tanks])}</pre>
            <button onClick={this.handleNewTank}>Add Tank</button>
          </div>
        </div>
      </div>
    );
  }
}
