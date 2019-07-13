import React, {Component} from 'react';

class Timer extends Component {

  state = {
    time: +this.props.startTime / 1000
  };

  timerInterval = setInterval(() => {
    this.update();
  }, 1000);

  update = () => {
    this.setState({time: this.state.time - 1});

    if(this.state.time <= 0) {
      clearInterval(this.timerInterval);
      this.props.onEnd();
    }
  }

  componentWillUnmount() {
    clearInterval(this.timerInterval);
  }

  render() {
    const {className} = this.props;
    const {time} = this.state;

    let min = Math.floor(time / 60).toString();
    let sec = Math.floor(time % 60).toString();

    if(min.length == 1) {min = '0' + min};
    if(sec.length == 1) {sec = '0' + sec};

    return(
      <span className={`c-timer ${className}`}>
        {`${min}:${sec}`}
      </span>
    );
  }
}

export default Timer;