import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SCREENS } from "../Utils/SCREENS";
//* Screens
import HomeScreen from "../Screens/HomeScreen";
import AddTask from "../Screens/AddTask";
import TaskDetail from "../Screens/TaskDetail";

import { useStore } from "../store/store";

const Stack = createNativeStackNavigator();

const Router = () => {
  const { isDarkMode } = useStore();
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name={SCREENS.Home}
        component={HomeScreen}
      />
      <Stack.Screen
        options={{
          headerTitleAlign: "center",
          headerTintColor: isDarkMode ? "#FFFFFF" : "#000000",
          headerStyle: {
            backgroundColor: isDarkMode ? "#121212" : "#F5F5F5",
          },
        }}
        name={SCREENS.CreateTask}
        component={AddTask}
      />
      <Stack.Screen name={SCREENS.TaskDetail} component={TaskDetail} />
    </Stack.Navigator>
  );
};

export default Router;
