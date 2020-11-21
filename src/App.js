import React, { createRef } from "react";
import copy from "copy-to-clipboard";
import { isChromeExtension } from "@utils/utils";
import { View, StyleSheet } from "react-native";
// import { Button } from 'react-native-elements';

// const debug = require("debug")("App.js");

const JSON_VALIDITY = {
  UNINITIALIZED: 0,
  VALID: 1,
  INVALID: 2,
};

class App extends React.PureComponent {
  textAreaRef = null;
  state = {
    isValidJson: JSON_VALIDITY.UNINITIALIZED,
    errorMessage: "",
  };
  constructor(props) {
    super(props);
    this.textAreaRef = createRef();

    console.log(isChromeExtension());
  }
  handleFormatJsonClick = (e) => {
    const rawJson = this.textAreaRef.current.value;

    try {
      const formattedJSON = JSON.stringify(JSON.parse(rawJson), null, 2);
      this.textAreaRef.current.value = formattedJSON;

      this.setState({ isValidJson: JSON_VALIDITY.VALID });
    } catch (error) {
      this.setState({
        isValidJson: JSON_VALIDITY.INVALID,
        errorMessage: "The text is not a valid json object",
      });
    }
  };
  handleCopyClick = () => {
    this.textAreaRef.current && copy(this.textAreaRef.current.value);
  };

  getStyles = () => {
    return StyleSheet.create({
      container: {
        display: "flex",
        flexDirection: "column",
        padding: "4px 12px",
        minHeight: isChromeExtension() ? 600 : "100vh",
        minWidth: isChromeExtension() ? 500 : "100vw",
      },
    });
  };
  render() {
    const { isValidJson, errorMessage } = this.state;

    const styles = this.getStyles();

    return (
      <View style={styles.container}>
        <div
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <button onClick={this.handleCopyClick}>Copy</button>
          <button
            style={{ padding: 14, fontSize: 16 }}
            onClick={this.handleFormatJsonClick}
          >
            Format
          </button>
        </div>
        <div style={{ color: "red", height: 16 }}>{errorMessage}</div>
        <br />
        <div
          style={{
            justifyContent: "center",
            display: "flex",
          }}
        >
          <textarea
            ref={this.textAreaRef}
            placeholder='Paste json here...'
            style={{
              width: "100%",
              height: "85vh",
              justifyContent: "center",
              borderRadius: 4,
              border:
                isValidJson === JSON_VALIDITY.INVALID
                  ? "2px solid red"
                  : "1px solid black",
            }}
          ></textarea>
        </div>
      </View>
    );
  }
}

export default App;
