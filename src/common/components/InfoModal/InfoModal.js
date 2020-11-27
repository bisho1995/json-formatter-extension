import React from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import { HIDE_MODAL } from "@actions/InfoModalActions";
class InfoModal extends React.PureComponent {
  timeoutRef;
  componentDidMount() {
    if (this.props.showModal) this.autoHideModal();
  }

  componentDidUpdate(prevProp) {
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
      this.props.hideModal();
    }, 2000);
  };

  renderModalUI = () => (
    <View
      style={{
        position: "fixed",
        left: "50%",
        top: "10%",
        transform: "translate(-50%, -50%)",
        background: "#000",
        color: "#fff",
        paddingHorizontal: "20px",
        paddingVertical: "10px",
        width: "95%",
        maxWidth: "600px",
        zIndex: 1024
      }}
    >
      {this.props.message}
    </View>
  );
  render() {
    const { children, showModal } = this.props;
    console.log("props", this.props);
    return (
      <View>
        {showModal ? this.renderModalUI() : null}
        {children}
      </View>
    );
  }
}

const mapStateToProps = ({ InfoModalReducer }) => ({
  showModal: InfoModalReducer.showing,
  message: InfoModalReducer.message,
});

const mapDispatchToProps = (dispatch) => ({
  hideModal: () => dispatch({ type: HIDE_MODAL }),
});

export default connect(mapStateToProps, mapDispatchToProps)(InfoModal);
