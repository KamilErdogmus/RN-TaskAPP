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
  }, [updateTaskCounts]);

  return (
    <SafeAreaView
      className={`flex-1 ${isDarkMode ? "bg-dark" : "bg-light-surface"}`}
    >
      <FlatList
        keyExtractor={(item) => item.id}
        data={tasks}
        ListHeaderComponent={<Header />}
        extraData={tasks.length}
        renderItem={({ item }) => <TaskCard item={item} />}
        contentContainerStyle={{ padding: 8, paddingBottom: 100 }}
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
