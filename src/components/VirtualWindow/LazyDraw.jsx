import { PureComponent } from 'react';
import PropTypes from 'prop-types';

class LazyDraw extends PureComponent {
  static propTypes = {
    render: PropTypes.func.isRequired,
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
    this.timer = setTimeout(this.setReady, 200);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  render() {
    return this.state.ready ? this.props.render : this.props.placeholder();
  }
}

export default LazyDraw;

