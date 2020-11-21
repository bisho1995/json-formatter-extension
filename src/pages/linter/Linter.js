import React, { createRef } from "react";
import copy from "copy-to-clipboard";
import { isChromeExtension } from "@utils/utils";
import { View, StyleSheet, TextInput, Pressable } from "react-native";
import { Button, Tooltip, Text } from "react-native-elements";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import Modal from "modal-react-native-web";
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

  state = {
    isValidJson: JSON_VALIDITY.UNINITIALIZED,
    errorMessage: "",
  };

  constructor(props) {
    super(props);
    this.textAreaRef = createRef();
    this.toolTopRef = createRef();
  }
  handleFormatJsonClick = () => {
    const rawJson = this.textAreaRef.current.value;

    try {
      const formattedJSON = JSON.stringify(JSON.parse(rawJson), null, 2);
      this.textAreaRef.current.value = formattedJSON;

      this.setState({ isValidJson: JSON_VALIDITY.VALID });
    } catch (error) {
      !!this.textAreaRef.current.value &&
        this.setState({
          isValidJson: JSON_VALIDITY.INVALID,
          errorMessage: "This is not a valid JSON text",
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
        paddingTop: "4px",
        paddingBottom: "12px",
        paddingHorizontal: "12px",
        minHeight: isChromeExtension() ? EXTENSION_WINDOW_HEIGHT : "100vh",
        minWidth: isChromeExtension() ? EXTENSION_WINDOW_WIDTH : "100vw",
      },
    });
  };
  render() {
    const { isValidJson, errorMessage } = this.state;

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
          <Tooltip
            ref={this.toolTopRef}
            withOverlay={false}
            onOpen={() => {
              setTimeout(this.toolTopRef.current.toggleTooltip, 200);
            }}
            backgroundColor='#060606'
            // ModalComponent={Modal}
            popover={
              <Text style={{ color: "#fff" }}>Copied to clipboard!</Text>
            }
          >
            <Pressable onPress={this.handleCopyClick}>
              <View style={{ padding: 8 }}>
                <FontAwesomeIcon icon={faCopy} size='lg' color='#2b2b2b' />
              </View>
            </Pressable>
          </Tooltip>
          <Button onPress={this.handleFormatJsonClick} title='Format' />
        </View>
        <View style={{ color: "red", height: 16 }}>{errorMessage}</View>
        <Text>{`\n`}</Text>
        <div
          style={{
            justifyContent: "center",
            display: "flex",
          }}
        >
          <TextInput
            editable
            multiline
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
          ></TextInput>
        </div>
      </View>
    );
  }
}

export default App;
