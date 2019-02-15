import React, { Component } from 'react';

import styles from './Popup.module.css';

interface Props {
  onClose: () => void;
  children?: JSX.Element;
}

export default class Popup extends Component<Props> {
  public render(): React.ReactNode {
    return <div className={styles.PopupEditor}>{this.props.children}</div>;
  }
}
