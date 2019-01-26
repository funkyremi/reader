import React, { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);
    const text = "You can read up to 1000 words by minutes with this reader but I recommand starting at 300 and increasing according to your brain speed :-)";
    this.state = {
      reading: false,
      textContent: text,
      textContentArray: text.split(' '),
      wpm: '300',
      intervalId: null,
      currentWord: null,
    }
  }
  getIntervalMsFromWPM(wpm) {
    return 1000 / (Number(wpm) / 60);
  }
  startReading() {
    const textSelector = document.querySelector(".text-content");
    if (textSelector && textSelector.value && textSelector.value.length > 0) {
      this.setState({
        reading: true,
        textContentArray: textSelector.value.split(" ")
      });
    }
    const intervalId = setInterval(() => {
      const textArray = this.state.textContentArray;
      if (textArray.length === 0) {
        clearInterval(this.state.intervalId);
        this.setState({
          reading: false,
        })
      } else {
        this.setState({
          textContentArray: textArray,
        })
      }
      this.setState({
        currentWord: textArray[0],
      })
      textArray.shift();
    }, this.getIntervalMsFromWPM(Number(this.state.wpm)));
    this.setState({
      intervalId,
    });
  }
  handleWpmKeyUp(event) {
    this.setState({
      wpm: event.target.value
    });
  }
  handleTextKeyUp(event) {
    this.setState({
      textContent: event.target.value
    });
  }
  render() {
    if (this.state.reading) {
      return (
        <div className="box">
          <span className="text text-center">{this.state.currentWord}</span>
        </div>
      );
    } else {
      return (
        <div>
          <h1 className="text-center">Fast reader</h1>
          <br />
          <br />
          <br />
          <textarea
            className="form-control text-content"
            onKeyUp={e => this.handleTextKeyUp(e)}
            autoFocus
            rows="8"
            placeholder="Paste your text here"
            defaultValue={this.state.textContent}
          >
          </textarea>
          <br />
          <div className="text-center">
            <input
              type="text"
              className="form-control"
              onKeyUp={e => this.handleWpmKeyUp(e)}
              placeholder="Number of words/minute"
              defaultValue={this.state.wpm}
            />
            <br />
            <button
              className="btn btn-default"
              onClick={() => this.startReading()}
            >
              Start reading
            </button>
          </div>
        </div>
      );
    }
  }
}

export default App;
