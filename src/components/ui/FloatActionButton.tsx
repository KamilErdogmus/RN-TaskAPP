import { Animated, Pressable, Text, View } from "react-native";
import React, { useRef } from "react";
import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useStore } from "../../store/store";
import { SCREENS } from "../../Utils/SCREENS";
import { useNavigation } from "@react-navigation/native";

const DURATION = 400;
const RADIUS = 80;

const FloatActionButton = () => {
  const navigation = useNavigation();
  const isOpened = useRef(false);
  const animation = useRef(new Animated.Value(0)).current;
  const rotateAnimation = useRef(new Animated.Value(0)).current;
  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

  const handlePress = () => {
    const toValue = isOpened.current ? 0 : 1;

    Animated.parallel([
      Animated.timing(animation, {
        toValue,
        duration: DURATION,
        useNativeDriver: true,
      }),
      Animated.timing(rotateAnimation, {
        toValue: isOpened.current ? 0 : 1,
        duration: DURATION,
        useNativeDriver: true,
      }),
    ]).start();

    isOpened.current = !isOpened.current;
  };

  const rotate = rotateAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  const positions = [
    { x: -RADIUS, y: 15 }, // Sol (0 derece)
    { x: -RADIUS * Math.cos(Math.PI / 4), y: -RADIUS * Math.sin(Math.PI / 4) }, // Sol üst (45 derece)
    { x: 15, y: -RADIUS }, // Üst (90 derece)
  ];

  const createAnimatedStyle = (index: number) => {
    const translateX = animation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, positions[index].x],
    });
    const translateY = animation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, positions[index].y],
    });
    const scale = animation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    });
    const opacity = animation.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 0, 1],
    });

    return {
      transform: [{ translateX }, { translateY }, { scale }],
      opacity,
    };
  };

  const { isDarkMode, toggleDarkMode } = useStore();

  const AddTask = () => {
    navigation.navigate(SCREENS.CreateTask);
  };
  const handleClear = () => {};

  return (
    <View className="absolute bottom-10 right-10">
      {/* Üst buton (90 derece) */}
      <AnimatedPressable
        onPress={AddTask}
        style={[createAnimatedStyle(2)]}
        className="w-14 h-14 bg-[#e63030] rounded-full justify-center items-center absolute"
      >
        <Entypo name="plus" size={32} color={isDarkMode ? "black" : "white"} />
      </AnimatedPressable>

      {/* Sol üst buton (45 derece) */}
      <AnimatedPressable
        onPress={handleClear}
        style={[createAnimatedStyle(1)]}
        className="w-14 h-14 bg-[#e63030] rounded-full justify-center items-center absolute"
      >
        <FontAwesome6
          name="trash-can"
          size={32}
          color={isDarkMode ? "black" : "white"}
        />
      </AnimatedPressable>
      {/* Sol buton (0 derece) */}
      <AnimatedPressable
        style={[createAnimatedStyle(0)]}
        onPress={toggleDarkMode}
        className="w-14 h-14 bg-[#e63030] rounded-full justify-center items-center absolute"
      >
        <MaterialIcons
          name={isDarkMode ? "light-mode" : "dark-mode"}
          size={32}
          color={isDarkMode ? "white" : "black"}
        />
      </AnimatedPressable>

      {/* Ana buton */}
      <Pressable
        onPress={handlePress}
        style={({ pressed }) => [
          pressed ? { transform: [{ scale: 0.9 }] } : null,
        ]}
        className="justify-center items-center w-20 h-20 rounded-full bg-[#e63030]"
      >
        <Animated.View style={{ transform: [{ rotate }] }}>
          <Feather
            name="settings"
            size={40}
            color={isDarkMode ? "black" : "white"}
          />
        </Animated.View>
      </Pressable>
    </View>
  );
};

export default FloatActionButton;
