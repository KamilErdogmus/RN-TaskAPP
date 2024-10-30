import { FlatList } from "react-native";
import FloatActionButton from "../components/ui/FloatActionButton";
import { useStore } from "../store/store";
import TaskCard from "../components/home/TaskCard";
import Header from "../components/home/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect } from "react";

const HomeScreen = () => {
  const { isDarkMode, tasks, updateTaskCounts, updateTaskStatus } = useStore();

  useEffect(() => {
    updateTaskCounts();
  }, [updateTaskCounts, updateTaskStatus]);

  return (
    <SafeAreaView
      className={`flex-1 ${isDarkMode ? "bg-dark" : "bg-light-surface"}`}
    >
      <FlatList
        keyExtractor={(item) => item.id.toString()}
        data={tasks}
        ListHeaderComponent={() => <Header />}
        extraData={tasks}
        renderItem={({ item }) => <TaskCard item={item} />}
        contentContainerStyle={{
          marginHorizontal: 8,
          paddingBottom: 100,
          marginVertical: 12,
        }}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        windowSize={5}
        initialNumToRender={10}
      />

      <FloatActionButton />
    </SafeAreaView>
  );
};

export default HomeScreen;
