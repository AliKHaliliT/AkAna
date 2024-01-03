import React from "react";
import { Modal, View, ActivityIndicator, Text, StyleSheet} from "react-native";

const LoadingIndicator = ({ visible, onClose, text, indicatorColor = "#4cbb17", indicatorSize = "large" }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <ActivityIndicator size={indicatorSize} color={indicatorColor} />
          <Text>{text}</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  closeButton: {
    marginTop: 20,
  }
});

export default LoadingIndicator;
