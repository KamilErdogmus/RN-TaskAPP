import React, { useRef } from "react";
import { Task } from "../../Utils/types";
import { useStore } from "../../store/store";
import { Text } from "@ui-kitten/components";
import { Pressable } from "react-native";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { View } from "react-native";
import {
  AntDesign,
  FontAwesome,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { COLORS } from "../../Utils/COLORS";
import moment from "moment";
import { setCategory } from "../../Utils/setCategory";
import Modal from "../ui/Modal";

const TaskCard = ({ item }: { item: Task }) => {
  const { isDarkMode } = useStore();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const handleOpenBottomSheet = () => {
    bottomSheetModalRef.current?.present();
  };
  const iconColor = isDarkMode ? "white" : "black";
  const taskValues = [
    {
      status: 1,
      title: "Ongoing",
      bgColor: COLORS.ONGOING,
      icon: <FontAwesome name="play" size={24} color={iconColor} />,
    },
    {
      status: 2,
      title: "Pending",
      bgColor: COLORS.PENDING,
      icon: <MaterialIcons name="pending" size={24} color={iconColor} />,
    },
    {
      status: 3,
      title: "Completed",
      bgColor: COLORS.COMPLETED,
      icon: <Ionicons name="checkmark-done" size={24} color={iconColor} />,
    },
    {
      status: 4,
      title: "Cancel",
      bgColor: COLORS.CANCELLED,
      icon: <AntDesign name="closecircle" size={24} color={iconColor} />,
    },
  ];
  const currentTaskStatus = taskValues.find(
    (task) => task.status === item?.status
  )!;
  return (
    <View className="flex-1">
      <Pressable
        onPress={handleOpenBottomSheet}
        className={`${
          isDarkMode ? "bg-dark-surface" : "bg-gray-200"
        } p-6 my-4 flex-row items-center rounded-lg`}
      >
        <View
          className="w-12 h-12 items-center justify-center rounded-full"
          style={{
            backgroundColor: currentTaskStatus?.bgColor,
          }}
        >
          {currentTaskStatus?.icon}
        </View>
        <View className="ml-4 flex-1 gap-y-6">
          <Text style={{ fontSize: 18, fontWeight: "600" }}>{item.title}</Text>
          <Text style={{ fontSize: 14 }}>{item.description}</Text>
          <View className="flex-row items-center justify-between w-full">
            <View>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "600",
                  marginBottom: 8,
                  textDecorationLine: "underline",
                }}
              >
                Start Date
              </Text>
              <Text>{moment(item.startDate).format("DD-MM-YYYY")}</Text>
            </View>
            <View>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "600",
                  marginBottom: 8,
                  textDecorationLine: "underline",
                }}
              >
                End Date
              </Text>
              <Text>{moment(item.endDate).format("DD-MM-YYYY")}</Text>
            </View>
          </View>
        </View>
        <View className="flex-end ml-2 h-full">
          <Text style={{ fontSize: 14, color: "gray" }}>
            {setCategory(item.category)}
          </Text>
        </View>
      </Pressable>

      <BottomSheetModal
        ref={bottomSheetModalRef}
        containerStyle={{ paddingVertical: 20, paddingHorizontal: 16 }}
        index={0}
        snapPoints={["93%"]}
        enablePanDownToClose
        backgroundStyle={{
          backgroundColor: isDarkMode ? "#121212" : "#FFFFFF",
        }}
        handleIndicatorStyle={{
          backgroundColor: isDarkMode ? "#FFFFFF" : "#000000",
        }}
      >
        <Modal currentTaskStatus={currentTaskStatus} item={item} />
      </BottomSheetModal>
    </View>
  );
};

export default TaskCard;
