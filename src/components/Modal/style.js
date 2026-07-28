import { StyleSheet } from "react-native";

export default StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.6)",
        justifyContent: "center",
        alignItems: "center",
    },

    modal: {
        width: "80%",
        backgroundColor: "#FFF",
        borderRadius: 20,
        padding: 25,
        alignItems: "center",
    },

    text: {
        fontSize: 16,
        textAlign: "center",
        marginBottom: 20,
    },

    button: {
        backgroundColor: "#242424",
        paddingHorizontal: 30,
        paddingVertical: 10,
        borderRadius: 15,
    },

    buttonText: {
        color: "#FFF",
        fontWeight: "bold",
    }

});