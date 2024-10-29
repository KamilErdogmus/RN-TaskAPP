import { FlatList, Pressable, View } from "react-native";
import React from "react";
import {
  Ionicons,
  AntDesign,
  MaterialIcons,
  FontAwesome,
} from "@expo/vector-icons";

import { CardConstant } from "../../Utils/types";
import { Text } from "@ui-kitten/components";
import { useStore } from "../../store/store";
import { COLORS } from "../../Utils/COLORS";

const RenderItem = ({ item }: CardConstant[]) => {
  const { isDarkMode } = useStore();
  return (
    <Pressable
      className="flex-1 m-2 p-4 rounded-lg"
      style={{
        backgroundColor: item.bgColor,
      }}
    >
      {item.icon}
      <View className="flex-row justify-between mt-10 items-center">
        <View>
          <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 10 }}>
            {item.title}
          </Text>
          <Text style={{ fontSize: 18 }}>{item.count} Tasks</Text>
        </View>
        <AntDesign
          name="arrowright"
          size={24}
          color={isDarkMode ? "white" : "black"}
        />
      </View>
    </Pressable>
  );
};

const Header = () => {
  const { isDarkMode, ongoing, pending, completed, cancelled } = useStore();
  const cardConstants: CardConstant[] = [
    {
      id: 1,
      title: "ONGOING",
      bgColor: COLORS.ONGOING,
      count: ongoing,
      icon: (
        <FontAwesome
          name="play"
          size={24}
          color={isDarkMode ? "white" : "black"}
        />
      ),
    },
    {
      id: 2,
      title: "PENDING",
      bgColor: COLORS.PENDING,
      count: pending,
      icon: (
        <MaterialIcons
          name="pending"
          size={24}
          color={isDarkMode ? "white" : "black"}
        />
      ),
    },
    {
      id: 3,
      title: "COMPLETED",
      bgColor: COLORS.COMPLETED,
      count: completed,
      icon: (
        <Ionicons
          name="checkmark-done"
          size={24}
          color={isDarkMode ? "white" : "black"}
        />
      ),
    },
    {
      id: 4,
      title: "CANCEL",
      bgColor: COLORS.CANCELLED,
      count: cancelled,
      icon: (
        <AntDesign
          name="closecircle"
          size={24}
          color={isDarkMode ? "white" : "black"}
        />
      ),
    },
  ];

  return (
    <View>
      <FlatList
        contentContainerStyle={{ paddingBottom: 20 }}
        numColumns={2}
        data={cardConstants}
        renderItem={({ item }) => <RenderItem item={item} />}
      />
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>All Tasks</Text>
    </View>
  );
};

export default Header;
