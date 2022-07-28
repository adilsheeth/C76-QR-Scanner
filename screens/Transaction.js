import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";
import * as Permissions from "expo-permissions";
import { BarCodeScanner } from "expo-barcode-scanner";

class Transaction extends React.Component {
  constructor() {
    super();
    this.state = {
      domState: "",
      hasCameraPermissions: null,
      scanned: false,
      scannedData: "",
    };
  }
  render() {
    const { domState, hasCameraPermissions, scannedData, scanned } = this.state;
    if (domState == "scanner") {
      return (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarcodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      );
    }
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          {hasCameraPermissions
            ? scannedData
            : "Request for Camera Permissions"}
        </Text>
        <TouchableOpacity
          onPress={() => {
            this.getCamPerms("scanner");
          }}
          style={[styles.button, { marginTop: 25 }]}
        >
          <Text style={styles.buttonText}>Scan QR Code</Text>
        </TouchableOpacity>
      </View>
    );
  }
  getCamPerms = async (domState) => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermissions: status === "granted",
      domState: domState,
      scanned: false,
    });
  };
  handleBarcodeScanned = async ({ type, data }) => {
    this.setState({
      scannedData: data,
      domState: "normal",
      scanned: true,
    });
  };
}

export default Transaction;

const styles = {
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#5653D4",
  },
  text: {
    color: "white",
    fontSize: 30,
  },
  button: {
    width: "43%",
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F48D20",
    borderRadius: 15,
  },
  buttonText: {
    fontSize: 20,
    color: "white",
  },
};
