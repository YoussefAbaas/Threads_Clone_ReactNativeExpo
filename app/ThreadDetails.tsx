import {
  Button,
  Platform,
  SafeAreaView,
  ScrollView,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import { ThreadDetailsScreenRouteProp } from "@/types/navigationTypes";
import { useRoute } from "@react-navigation/native";
import ThreadsItem, { blurhash } from "@/components/ThreadsItem";
import ReplyItem from "@/components/ReplyItem";
import { Image } from "expo-image";
import { Reply } from "@/types/threads";
import { createRandomFollower } from "@/utils/generateDummyData";

const ThreadDetails = () => {
  const { params } = useRoute<ThreadDetailsScreenRouteProp>();
  const [thread, setThread] = useState(params);
  const [replyContent, setReplyContent] = useState("");

  function handleReply() {
    const newReply: Reply = {
      author: createRandomFollower(),
      content: replyContent,
      createdAt: new Date().toISOString(),
      id: Math.random().toString(),
      likes: 0,
    };
    setThread((prevState) => ({
      ...prevState,
      replies: [newReply, ...prevState.replies!],
      repliesCount: prevState.repliesCount + 1,
    }));
    setReplyContent("");
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 10,
          paddingTop: Platform.select({ android: 40 }),
        }}
      >
        <ThreadsItem {...thread} />
        <View style={{ gap: 15 }}>
          {thread.replies?.map((reply) => (
            <ReplyItem {...reply} />
          ))}
        </View>
      </ScrollView>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 15,
          padding: 10,
        }}
      >
        <Image
          style={{}}
          placeholder={blurhash}
          contentFit="cover"
          transition={500}
        />
        <TextInput
          placeholder="Add reply"
          value={replyContent}
          onChangeText={setReplyContent}
          style={{
            flexGrow: 1,
            backgroundColor: "#00000010",
            marginLeft: 10,
            padding: 10,
            marginRight: 30,
            borderRadius: 10,
          }}
        />
        <Button title="Reply" disabled={!replyContent} onPress={handleReply} />
      </View>
    </SafeAreaView>
  );
};

export default ThreadDetails;
