import React, { createRef } from "react";
import copy from "copy-to-clipboard";
import { isChromeExtension } from "@utils/utils";
import { View, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { Button } from "react-native-elements";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faDownload } from "@fortawesome/free-solid-svg-icons";
import JsonService from "@services/JsonService";

import {
  EXTENSION_WINDOW_HEIGHT,
  EXTENSION_WINDOW_WIDTH,
} from "@/APP_CONSTANTS";

const JSON_VALIDITY = {
  UNINITIALIZED: 0,
  VALID: 1,
  INVALID: 2,
};

class App extends React.PureComponent {
  textAreaRef = null;
  jsonService = null;

  state = {
    isValidJson: JSON_VALIDITY.UNINITIALIZED,
    errorMessage: "",
    text: "",
  };

  constructor(props) {
    super(props);
    this.toolTopRef = createRef();

    this.jsonService = new JsonService();
  }
  handleFormatJsonClick = async () => {
    const rawJson = this.state.text;

    this.jsonService
      .formatJsonAsync(rawJson)
      .then((formattedJSON) => {
        this.setState({
          isValidJson: JSON_VALIDITY.VALID,
          text: formattedJSON,
        });
      })
      .catch((msg) => {
        this.isTextPresent() &&
          this.setState({
            isValidJson: JSON_VALIDITY.INVALID,
            errorMessage: msg,
          });
      });
  };
  handleCopyClick = () => {
    this.isTextPresent() && copy(this.state.text);
  };

  getStyles = () => {
    return StyleSheet.create({
      container: {
        display: "flex",
        flexDirection: "column",
        paddingTop: "4px",
        paddingBottom: "12px",
        paddingHorizontal: "12px",
        height: "100vh",
        maxHeight: "100vh",
        minHeight: isChromeExtension() ? EXTENSION_WINDOW_HEIGHT : "100vh",
        minWidth: isChromeExtension() ? EXTENSION_WINDOW_WIDTH : "100vw",
      },
    });
  };
  onSaveFilePressed = () => {
    this.jsonService.saveToDiskAsync(this.state.text);
  };
  isTextPresent = () => !!this.state.text;
  render() {
    const { isValidJson, errorMessage } = this.state;
    console.log(
      "this.textAreaRef.current?.value",
      this.state.text,
      this.isTextPresent()
    );
    const styles = this.getStyles();

    return (
      <View style={styles.container}>
        <View
          style={{
            display: "flex",
            justifyContent: "flex-end",
            flexDirection: "row",
          }}
        >
          <TouchableOpacity onPress={this.handleCopyClick}>
            <View style={{ padding: 8 }}>
              <FontAwesomeIcon icon={faCopy} size='lg' color='#2b2b2b' />
            </View>
          </TouchableOpacity>

          <Button
            onPress={this.handleFormatJsonClick}
            title='Format'
            disabled={!this.isTextPresent()}
          />
        </View>
        <View style={{ color: "red", height: 16 }}>{errorMessage}</View>
        {/** The main editor section */}
        <View
          style={{
            justifyContent: "center",
            display: "flex",
            marginBottom: 10,
          }}
        >
          <TextInput
            editable
            multiline
            placeholder='Paste json here...'
            onChange={(e) => {
              console.log(e.target.value);
              this.setState({ text: e.target.value });
            }}
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
          ></TextInput>
        </View>
        <View style={{ display: "flex", flexDirection: "row-reverse" }}>
          <Button
            icon={
              <FontAwesomeIcon
                style={{ marginRight: 8 }}
                icon={faDownload}
                size='lg'
                color='#fbfbfb'
              />
            }
            title='Save'
            onPress={this.onSaveFilePressed}
            disabled={!this.isTextPresent()}
          ></Button>
        </View>
      </View>
    );
  }
}

export default App;
