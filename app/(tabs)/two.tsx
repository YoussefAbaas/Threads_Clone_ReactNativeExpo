import { Platform, ScrollView, StyleSheet, TextInput } from "react-native";
import { View } from "@/components/Themed";
import { FontAwesome } from "@expo/vector-icons";
import { useContext, useState } from "react";
import { ThreadsContext } from "@/context/threads-context";
import ThreadsItem from "@/components/ThreadsItem";
import { Thread } from "@/types/threads";

export default function TabTwoScreen() {
  const { threads } = useContext(ThreadsContext);
  const [searchResults, setSearchResults] = useState<Thread[]>([]);

  const searchThreads = (searchTerm: string) => {
    if (searchTerm === "") setSearchResults([]);
    else {
      const newThreads = threads.filter(
        (thread) =>
          thread.content.includes(searchTerm) ||
          thread.author.name.includes(searchTerm) ||
          thread.author.userName.includes(searchTerm)
      );
      setSearchResults(newThreads);
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.textInputContainer}>
        <FontAwesome
          size={20}
          name="search"
          color={"black"}
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.TextInput}
          placeholder="Search by content or username"
          onChangeText={(text) => {
            searchThreads(text);
          }}
        />
      </View>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />

      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 10,
          paddingTop: Platform.select({ android: 30 }),
        }}
      >
        {searchResults.map((thread) => (
          <ThreadsItem key={thread.id} {...thread} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  textInputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  searchIcon: { position: "absolute", left: 20 },
  TextInput: {
    flexGrow: 1,
    backgroundColor: "#00000010",
    marginLeft: 10,
    padding: 10,
    marginRight: 30,
    borderRadius: 10,
    paddingLeft: 35,
    fontSize: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginTop: 30,
    height: 1,
    width: "90%",
    alignSelf: "center",
  },
});
