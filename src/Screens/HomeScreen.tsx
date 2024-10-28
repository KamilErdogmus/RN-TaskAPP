import React from "react";
import { View, SafeAreaView } from "react-native";

import FloatActionButton from "../components/ui/FloatActionButton";
import { useStore } from "../store/store";

const HomeScreen = () => {
  const { isDarkMode } = useStore();
  const { tasks } = useStore();
  console.log(tasks);
  return (
    <SafeAreaView
      className={`flex-1 ${isDarkMode ? "bg-dark" : "bg-light-surface"}`}
    >
      <FloatActionButton />
    </SafeAreaView>
  );
};

export default HomeScreen;
