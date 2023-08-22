import "react-native-gesture-handler";
import { SafeAreaView, StyleSheet } from "react-native";
import Sidebar from "./navigation/Sidebar";
const App = () => {
  return (
    <>
      <SafeAreaView style={styles.container}>
        <Sidebar />
      </SafeAreaView>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 25,
    fontWeight: '500',
  },
});

export default App
