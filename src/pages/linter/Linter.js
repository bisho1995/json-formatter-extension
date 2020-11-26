import React, { createRef } from "react";
import copy from "copy-to-clipboard";
import { isChromeExtension, Environment } from "@utils/utils";
import { View, StyleSheet, TextInput, Text } from "react-native";
import { Button } from "react-native-elements";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCopy,
  faDownload,
  faRecycle,
  faLink,
} from "@fortawesome/free-solid-svg-icons";
import JsonService from "@services/JsonService";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";

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
    showPrettyOutput: false,
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
        console.log(formattedJSON);
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
  onGetLinkPressed = () => {
    this.jsonService.getLinkAsync(this.state.text);
  };
  onClearPressed = () => {
    this.setState({ text: "", showPrettyOutput: false });
  };
  isTextPresent = () => !!this.state.text;
  render() {
    const { isValidJson, errorMessage, showPrettyOutput, text } = this.state;
    const styles = this.getStyles();
    const titleStyles = { fontSize: "14px" };

    console.log(titleStyles);

    return (
      <View style={styles.container}>
        <View
          style={{
            display: "flex",
            justifyContent: "flex-end",
            flexDirection: "row",
          }}
        >
          <Button
            icon={
              <FontAwesomeIcon
                icon={faCopy}
                size='lg'
                color='#fff'
                style={{ marginRight: "8px", fontSize: "14px" }}
              />
            }
            buttonStyle={{ marginRight: "8px" }}
            titleStyle={titleStyles}
            disabled={!this.isTextPresent()}
            title='Copy'
            onPress={this.handleCopyClick}
          />

          <Button
            icon={<Text style={{ fontSize: "12px" }}>🙍‍♀️ </Text>}
            buttonStyle={{ marginRight: "8px" }}
            titleStyle={titleStyles}
            disabled={!this.isTextPresent()}
            title='Pretty'
            onPress={() => {
              this.setState(({ showPrettyOutput }) => ({
                showPrettyOutput: !showPrettyOutput,
              }));
            }}
          />

          <Button
            onPress={this.handleFormatJsonClick}
            title='Format'
            titleStyle={titleStyles}
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
            flex: 1,
          }}
        >
          {showPrettyOutput ? (
            <SyntaxHighlighter
              showLineNumbers
              language='javascript'
              style={dark}
            >
              {text}
            </SyntaxHighlighter>
          ) : (
            <TextInput
              editable
              multiline
              placeholder='Paste json here...'
              value={text}
              onChange={(e) => {
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
          )}
        </View>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Button
            buttonStyle={{ backgroundColor: "#d32f2f" }}
            icon={
              <FontAwesomeIcon
                style={{ marginRight: 8 }}
                icon={faRecycle}
                size='lg'
                color='#fbfbfb'
              />
            }
            title='Clear'
            onPress={this.onClearPressed}
            disabled={!this.isTextPresent()}
            titleStyle={titleStyles}
          ></Button>
          <Button
            icon={
              <FontAwesomeIcon
                style={{ marginRight: 8 }}
                icon={faLink}
                size='lg'
                color='#fbfbfb'
              />
            }
            title='Get Link'
            onPress={this.onGetLinkPressed}
            disabled={!this.isTextPresent()}
            titleStyle={titleStyles}
          ></Button>
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
            titleStyle={titleStyles}
          ></Button>
        </View>
      </View>
    );
  }
}

export default App;
