import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ReactElement } from "react";
import {
  FontAwesome,
  MaterialIcons,
  AntDesign,
  Ionicons,
} from "@expo/vector-icons";

export type RootStackParamList = {
  Home: undefined;
  CreateTask: undefined;
};

export type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export interface Task {
  id: string;
  title: string;
  description: string;
  status: StatusType;
  startDate: Date;
  endDate: Date;
  category: number;
  createdAt: Date;
}

export interface CardConstant {
  id: number;
  title: string;
  bgColor: string;
  icon: ReactElement<
    | typeof FontAwesome
    | typeof MaterialIcons
    | typeof AntDesign
    | typeof Ionicons
  >;
  count?: number;
}

export interface HeaderProps {
  item: CardConstant[];
  ongoing: number;
  pending: number;
  completed: number;
  cancelled: number;
}

export interface FormValues {
  title: string;
  description: string;
  startDate: Date | null;
  endDate: Date | null;
  category: number;
  status: StatusType;
}
export enum StatusType {
  ONGOING = 1,
  PENDING = 2,
  COMPLETED = 3,
  CANCEL = 4,
}
