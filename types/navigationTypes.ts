import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Thread } from "./threads";

type MainStackParamList = {
  "(tabs)": undefined;
  ThreadDetails: Thread;
  modal: undefined;
};

export type HomeScreenNavigationProp = NativeStackNavigationProp<
  MainStackParamList,
  "(tabs)"
>;
export type ThreadDetailsScreenRouteProp = RouteProp<
  MainStackParamList,
  "ThreadDetails"
>;
