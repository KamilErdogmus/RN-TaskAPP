import { View } from "react-native";
import React from "react";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { Button, Divider, Text } from "@ui-kitten/components";
import moment from "moment";
import { setCategory } from "../../Utils/setCategory";
import { CardConstant, StatusType, Task } from "../../Utils/types";
import { useStore } from "../../store/store";
import Toast from "react-native-toast-message";

const Modal = ({
  currentTaskStatus,
  item,
}: {
  currentTaskStatus: CardConstant;
  item: Task;
}) => {
  const { updateTaskStatus, removeTask } = useStore();

  const handleStart = () => {
    updateTaskStatus(item.id, StatusType.PENDING);
    Toast.show({ type: "info", text1: "Status has been changed." });
  };

  const handleComplete = () => {
    updateTaskStatus(item.id, StatusType.COMPLETED);
    Toast.show({ type: "info", text1: "Status has been changed." });
  };

  const handleCancel = () => {
    updateTaskStatus(item.id, StatusType.CANCEL);
    Toast.show({ type: "info", text1: "Status has been changed." });
  };

  const handleDelete = () => {
    removeTask(item.id);
    Toast.show({ type: "error", text1: "Task has been deleted!." });
  };
  return (
    <View className="justify-between flex-1">
      <BottomSheetScrollView
        contentContainerStyle={{
          paddingVertical: 20,
          paddingHorizontal: 16,
          gap: 8,
        }}
      >
        <View className="flex-row items-center justify-between">
          <Text style={{ fontSize: 19, fontWeight: "bold" }}>Title:</Text>
          <Text>{item.title}</Text>
        </View>
        <Divider />
        <View className="flex-row items-center justify-between">
          <Text style={{ fontSize: 19, fontWeight: "bold" }}>Description:</Text>
          <Text>{item.description}</Text>
        </View>
        <Divider />
        <View className="flex-row items-center justify-between">
          <Text style={{ fontSize: 19, fontWeight: "bold" }}>Start Date:</Text>
          <Text>{moment(item.startDate).format("DD-MM-YYYY")}</Text>
        </View>
        <Divider />
        <View className="flex-row items-center justify-between">
          <Text style={{ fontSize: 19, fontWeight: "bold" }}>End Date:</Text>
          <Text>{moment(item.endDate).format("DD-MM-YYYY")}</Text>
        </View>
        <Divider />
        <View className="flex-row items-center justify-between">
          <Text style={{ fontSize: 19, fontWeight: "bold" }}>Category:</Text>
          <Text>{setCategory(item.category)}</Text>
        </View>
        <Divider />
        <View className="flex-row items-center justify-between">
          <Text style={{ fontSize: 19, fontWeight: "bold" }}>Status:</Text>
          <Text>{currentTaskStatus?.title}</Text>
        </View>
        <Divider />
      </BottomSheetScrollView>
      <View className=" m-4 gap-y-4">
        <Button onPress={handleStart} status="primary">
          START
        </Button>
        <Button onPress={handleComplete} status="success">
          COMPLETED
        </Button>
        <Button onPress={handleCancel} status="warning">
          CANCEL
        </Button>
        <Button onPress={handleDelete} status="danger">
          DELETE
        </Button>
      </View>
    </View>
  );
};

export default Modal;
