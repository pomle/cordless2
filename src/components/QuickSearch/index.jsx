import React, { Component } from 'react';

import './QuickSearch.css';

export class QuickSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
        visible: false,
    };
  }
  componentDidMount() {
    window.addEventListener('keydown', this.keyListener);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.keyListener);
  }

  keyListener = (event) => {
    if (event.code === 'KeyF' && event.ctrlKey) {
        event.preventDefault();
        this.setState(({visible}) => ({
            visible: !visible,
        }));
        this.input.focus();
    } else if (event.code === 'Escape') {
        if (this.props.onCancelled) {
            this.props.onCancelled();
        }

        this.setState({
            visible: false,
        });
    }
  }

  handleChange = (event) => {
    this.props.onChange(event.target.value);
  }

  render() {
    const {value} = this.props;
    const {visible} = this.state;

    const classes = ['QuickSearch'];
    if (visible) {
        classes.push('isVisible');
    }

    return (
      <div className={classes.join(' ')}>
        <input ref={node => this.input = node} type='text' value={value} onChange={this.handleChange}/>
      </div>
    );
  }
}
