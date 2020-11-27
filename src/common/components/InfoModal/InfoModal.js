import React from "react";
import { View } from "react-native";
import { connect } from "react-redux";
class InfoModal extends React.PureComponent {
  timeoutRef;
  constructor(props) {
    super(props);

    this.state = {
      showModal: props.showModal,
    };
  }
  static getDerivedStateFromProps(props, state) {
    const newState = {
      showModal: props.showModal,
    };
    return newState;
  }
  componentDidMount() {
    if (this.props.showModal) this.autoHideModal();
  }

  componentDidUpdate(prevProp, prevState) {
    if (prevProp.showModal !== this.props.showModal) {
      this.autoHideModal();
    }
  }

  componentWillUnmount() {
    if (this.timeoutRef) clearTimeout(this.timeoutRef);
  }

  autoHideModal = () => {
    if (this.timeoutRef) clearTimeout(this.timeoutRef);
    this.timeoutRef = setTimeout(() => {
      this.setState({ showModal: false }, (...a) => {
        console.log(a);
      });
    }, 2000);
  };

  renderModalUI = () => (
    <View
      style={{
        position: "fixed",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        background: "#000",
        color: "#fff",
        paddingHorizontal: "20px",
        paddingVertical: "10px",
      }}
    >
      {this.props.message}
    </View>
  );
  render() {
    const { children } = this.props;
    const { showModal } = this.state;
    console.log("props", this.props, "state", this.state);
    return (
      <View>
        {showModal ? this.renderModalUI() : null}
        {children}
      </View>
    );
  }
}

const mapStateToProps = function mapReduxStateToComponentProps({
  InfoModalReducer,
}) {
  return {
    showModal: InfoModalReducer.showing,
    message: InfoModalReducer.message,
  };
};

export default connect(mapStateToProps)(InfoModal);
