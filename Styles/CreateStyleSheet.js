import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#fff"
    },
    label: {
        fontSize: 18,
        marginBottom: 8,
    },
    input: {
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        padding: 8,
        marginBottom: 16,
    },
    detailLabel: {
        fontSize: 18,
        marginBottom: 10,
        fontFamily: 'Roboto-Bold',
    },
    // cardButton: {
    //     backgroundColor: "#e9b4f0",
    //     padding: 20,
    //     borderRadius: 10,
    //     marginBottom: 30,
    // },
    // labelStyle: {
    //     fontSize: 14,
    //     paddingTop: 0,
    //     color: "#fff",
    //     fontFamily: 'Roboto-Regular',
    //     textAlign: "center",
    //     alignSelf: 'center'
    // },
});

export { styles }