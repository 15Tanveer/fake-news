import { StyleSheet, Text, View } from "react-native";

export default function BillingScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Billing</Text>
      <Text style={styles.text}>
        Subscription and payment management will be connected here.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0c1939",
    padding: 16,
    gap: 10,
  },
  title: {
    color: "#34d399",
    fontSize: 28,
    fontWeight: "900",
  },
  text: {
    color: "#dbe3ef",
    fontSize: 14,
  },
});
