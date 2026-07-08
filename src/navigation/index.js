import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Splash from "../pages/Splash";
import Login from "../pages/Login";
import Cadastro from "../pages/Cadastro";
import Dashboard from "../pages/Dashboard";
import Alerts from "../pages/Alerts";
import Profile from "../pages/Profile";
import Transactions from "../pages/Transactions";
import TransactionDetails from "../pages/TransactionDetails";

const Stack = createNativeStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="Splash"
          component={Splash}
        />

        <Stack.Screen
          name="Login"
          component={Login}
        />

        <Stack.Screen
          name="Cadastro"
          component={Cadastro}
        />

        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
        />

        <Stack.Screen
          name="Alerts"
          component={Alerts}
        />

        <Stack.Screen
          name="Profile"
          component={Profile}
        />

        <Stack.Screen
          name="Transactions"
          component={Transactions}
        />

        <Stack.Screen
          name="TransactionDetails"
          component={TransactionDetails}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}