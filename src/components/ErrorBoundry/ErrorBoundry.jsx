import React, {Component} from 'react';

class ErrorBoundry extends Component {

  state = {
    hasError: false
  }

  static getDerivedStateFromError() {
    return {hasError: true}
  }

  render() {
    return(
      this.state.hasError ? <p>Error</p> : this.props.children
    );
  }

}

export default ErrorBoundry;