import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    maincontainer: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: 10,
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: "flex-start",
        alignItems: "flex-start", padding: 5
    },
    Titile: {
        fontFamily: 'Roboto-Bold',
        padding: 5
    },
    text: {
        fontFamily: 'Roboto-Regular'
    },
    loginbtn: {
        backgroundColor: "#9303a3",
        fontFamily: 'Roboto-Bold',
        padding: 5,
        borderRadius: 10,
        width: "25%"
    }, cards: {
        margin: 1,
        borderWidth: 0.5,
        borderColor: 'grey',
        width: "100%",
        borderRadius: 5,
        padding: 15,
        backgroundColor: "white"

    },
     cardstyle: {
        display: "flex",
        flexDirection: "row"
    },
    TopCardsContainer: {
        marginTop: 5,
        // borderWidth: 1,
        borderColor: 'black',
        width: "100%",
        borderRadius: 5,
        marginBottom: 10
    }, MiddleCardsContainer: {
        marginTop: 30,
        // borderWidth: 1,
        borderColor: 'black',
        width: "100%",
        borderRadius: 5,
    }, BottomCardsContainer: {
        marginTop: 20,
        //borderWidth: 1,
        borderColor: 'black',
        width: "100%",
        borderRadius: 5,
    }
    , cardicon: {
        alignSelf: "center",
        marginRight: 5
    },

});
export { styles }