import { FlatList } from "react-native";

import FloatActionButton from "../components/ui/FloatActionButton";
import { useStore } from "../store/store";
import TaskCard from "../components/home/TaskCard";
import Header from "../components/home/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect } from "react";

const HomeScreen = () => {
  const { isDarkMode, tasks, updateTaskCounts } = useStore();

  useEffect(() => {
    updateTaskCounts();
  }, [tasks, updateTaskCounts, isDarkMode]);

  return (
    <SafeAreaView
      className={`flex-1 ${isDarkMode ? "bg-dark" : "bg-light-surface"}`}
    >
      <FlatList
        keyExtractor={(item) => item.id}
        data={tasks}
        ListHeaderComponent={<Header />}
        renderItem={({ item }) => <TaskCard item={item} />}
        contentContainerStyle={{ padding: 8, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      />

      <FloatActionButton />
    </SafeAreaView>
  );
};

export default HomeScreen;
