import React from "react";
import { View, Text } from "react-native";
import styles from "./style";

export default function TransactionCard({
titulo,
valor,
data,
status
}){

return(

<View style={styles.card}>
<Text style={styles.title}>{titulo}</Text>
<Text style={styles.value}>
R$ {valor}
</Text>

<Text style={styles.date}>{data}</Text>
<Text style={styles.status}>{status}</Text>
</View>
);

}