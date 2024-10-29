import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
} from "react-native";
import Voice, { SpeechResultsEvent } from "@react-native-voice/voice";
import Toast from "react-native-toast-message";
import FontAwesome from "@expo/vector-icons/FontAwesome";

interface STTProps {
  onTextReceived?: (text: string) => void;
}

export default function STT({ onTextReceived }: STTProps) {
  const [isListening, setIsListening] = useState(false);
  const [recognizedText, setRecognizedText] = useState("");

  const checkPermission = useCallback(async () => {
    if (Platform.OS === "android") {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          {
            title: "Microphone Permission",
            message:
              "Microphone permission is required for speech recognition.",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK",
          }
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          Toast.show({
            type: "error",
            text1: "Permission Denied",
            text2: "Microphone permission is required",
            position: "bottom",
          });
          return false;
        }
        return true;
      } catch (err) {
        console.error("Permission check error:", err);
        return false;
      }
    }
    return true;
  }, []);

  useEffect(() => {
    const speechStartHandler = () => {
      Toast.show({
        type: "info",
        text1: "Listening...",
        position: "bottom",
      });
      setIsListening(true);
    };

    const speechEndHandler = () => {
      setIsListening(false);
      Toast.show({
        type: "info",
        text1: "Stopped listening",
        position: "bottom",
      });
    };

    const speechResultsHandler = (e: SpeechResultsEvent) => {
      if (e.value && e.value[0]) {
        const text = e.value[0];
        setRecognizedText(text);
        onTextReceived?.(text);
      }
    };

    const speechErrorHandler = (e: any) => {
      console.error("Speech recognition error:", e);
      setIsListening(false);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to recognize speech",
        position: "bottom",
      });
    };

    Voice.onSpeechStart = speechStartHandler;
    Voice.onSpeechEnd = speechEndHandler;
    Voice.onSpeechResults = speechResultsHandler;
    Voice.onSpeechError = speechErrorHandler;

    checkPermission();

    return () => {
      Voice.destroy().then(() => {
        Voice.removeAllListeners();
      });
    };
  }, [onTextReceived]);

  const startListening = async () => {
    try {
      const hasPermission = await checkPermission();
      if (!hasPermission) return;

      await Voice.start("en-US");
      setIsListening(true);
    } catch (error) {
      console.error("Start listening error:", error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to start listening",
        position: "bottom",
      });
    }
  };

  const stopListening = async () => {
    try {
      await Voice.stop();
      setIsListening(false);
    } catch (error) {
      console.error("Stop listening error:", error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to stop listening",
        position: "bottom",
      });
    }
  };

  return (
    <View>
      <TouchableOpacity
        className={`rounded-full h-8 w-8 items-center justify-center shadow-md ${
          isListening ? "bg-red-500" : "bg-green-500"
        }`}
        onPress={isListening ? stopListening : startListening}
        activeOpacity={0.7}
      >
        <FontAwesome
          name={isListening ? "microphone-slash" : "microphone"}
          size={20}
          color="white"
        />
      </TouchableOpacity>
    </View>
  );
}
