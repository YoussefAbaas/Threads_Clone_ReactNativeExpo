import {
  Platform,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from "react-native";
import LottieView from "lottie-react-native";
import { useContext, useRef } from "react";
import { ThreadsContext } from "@/context/threads-context";
import ThreadsItem from "@/components/ThreadsItem";
import { generateThreads } from "@/utils/generateDummyData";

export default function TabOneScreen() {
  const animationRef = useRef<LottieView>(null);
  const { threads, setThreads } = useContext(ThreadsContext);
  return (
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 10,
          paddingTop: Platform.select({ android: 30 }),
        }}
        refreshControl={
          <RefreshControl
            refreshing={false}
            tintColor={"transparent"}
            onRefresh={() => {
              animationRef.current?.play();
            }}
          />
        }
      >
        <LottieView
          ref={animationRef}
          source={require("../../lottie-animations/threads.json")}
          loop={false}
          style={{ width: 90, height: 90, alignSelf: "center" }}
          autoPlay
          onAnimationFinish={() => {
            setThreads(generateThreads());
          }}
        />
        {threads.map((thread) => (
          <ThreadsItem key={thread.id} {...thread} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
