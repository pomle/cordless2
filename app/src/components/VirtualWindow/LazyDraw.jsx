import { PureComponent } from 'react';

class LazyDraw extends PureComponent {
  static defaultProps = {
    delay: 200,
  };

  constructor(props) {
    super(props);

    this.state = {
      ready: false,
    };
  }

  setReady = () => {
    this.setState({ready: true});
  };

  componentDidMount() {
    this.timer = setTimeout(this.setReady, this.props.delay);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  render() {
    return this.state.ready ? this.props.render : this.props.placeholder;
  }
}

export default LazyDraw;

