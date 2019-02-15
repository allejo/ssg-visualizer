import React, { Component } from 'react';
import Tank, { TeamColor } from './components/Tank';
import './App.css';
import { DefaultTank, ITank } from './lib/ITank';
import { ConfigWriter } from './lib/ConfigWriter';

interface Props {

}

interface State {
  tanks: ITank[];
}

export default class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      tanks: [
        new DefaultTank(),
      ],
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
      <div className="App">
        <header className="App-header">
          {this.state.tanks.map((tank: ITank, i: number) => (
            <Tank key={i} tank={tank} onUpdate={(final: ITank) => { this.handleTankEdit(i, final) }} />
          ))}
        </header>
        <pre>{ConfigWriter.writeConfig([...this.state.tanks])}</pre>
        <button onClick={this.handleNewTank}>Add Tank</button>
      </div>
    );
  }
}
