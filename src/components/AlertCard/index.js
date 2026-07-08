import React from "react";
import { View, Text } from "react-native";
import styles from "./style";

export default function AlertCard({
titulo,
descricao,
risco
}){

return(

<View style={styles.card}>

<Text style={styles.title}>
{titulo}
</Text>

<Text style={styles.description}>
{descricao}
</Text>

<Text style={styles.risk}>
{risco}
</Text>

</View>
);
}