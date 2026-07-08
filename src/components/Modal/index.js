import React from "react";
import { Modal, View, Text, Pressable } from "react-native";
import styles from "./style";

export default function CustomModal({
    visible,
    message,
    onClose
}){

return(
<Modal
transparent
animationType="fade"
visible={visible}
>

<View style={styles.overlay}>
<View style={styles.modal}>
<Text style={styles.text}>
{message}
</Text>

<Pressable
style={styles.button}
onPress={onClose}
>

<Text style={styles.buttonText}>
OK
</Text>
</Pressable>
</View>
</View>
</Modal>
);
}