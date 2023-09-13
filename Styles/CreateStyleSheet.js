import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 70,
        padding: 15,
        backgroundColor: "#fff"
    },
    label: {
        fontSize: 18,
        fontFamily: "Roboto-Bold",
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
    containerimage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      previewImage: {
        width: 200,
        height: 200,
        marginVertical: 10,
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