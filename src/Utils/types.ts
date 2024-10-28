import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Home: undefined;
  CreateTask: undefined;
};

export type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export interface Task {
  id: string;
  title: string;
  description: string;
  startDate: Date | null;
  endDate: Date | null;
  category: number;
  completed: boolean;
  createdAt: Date;
}
