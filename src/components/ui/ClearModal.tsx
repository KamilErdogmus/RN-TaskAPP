import { View } from "react-native";
import React from "react";
import { Modal, Text, Button } from "@ui-kitten/components";
import { useStore } from "../../store/store";
import Toast from "react-native-toast-message";

interface ClearModalProps {
  showConfirmModal: boolean;
  setShowConfirmModal: (show: boolean) => void;
  clearTask: () => void;
}

const ClearModal: React.FC<ClearModalProps> = ({
  showConfirmModal,
  setShowConfirmModal,
  clearTask,
}) => {
  const { isDarkMode } = useStore();

  const handleClear = () => {
    clearTask();
    setShowConfirmModal(false);
    Toast.show({
      type: "success",
      text1: "Tasks cleared successfully",
    });
  };

  return (
    <Modal
      visible={showConfirmModal}
      backdropStyle={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      onBackdropPress={() => setShowConfirmModal(false)}
    >
      <View
        className={`${
          isDarkMode ? "bg-dark-surface" : "bg-white"
        } p-6 rounded-2xl w-[90%] max-w-sm mx-auto`}
      >
        <Text
          category="h6"
          className={`text-center mb-4 ${
            isDarkMode ? "text-white" : "text-black"
          }`}
        >
          Clear All Tasks
        </Text>

        <Text
          category="p1"
          className={`text-center mb-6 ${
            isDarkMode ? "text-gray-300" : "text-gray-600"
          }`}
        >
          Are you sure you want to delete all tasks? This action cannot be
          undone.
        </Text>

        <View className="flex-row justify-end items-center space-x-4">
          <Button
            size="medium"
            appearance="outline"
            status="basic"
            onPress={() => setShowConfirmModal(false)}
            className="flex-1"
          >
            Cancel
          </Button>

          <Button
            size="medium"
            status="danger"
            onPress={handleClear}
            className="flex-1"
          >
            Clear
          </Button>
        </View>
      </View>
    </Modal>
  );
};

export default ClearModal;
