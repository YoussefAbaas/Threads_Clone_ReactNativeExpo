import { Thread } from "@/types/threads";
import { generateThreads } from "@/utils/generateDummyData";
import { PropsWithChildren, createContext, useEffect, useState } from "react";

export interface threadsContextType {
  threads: Thread[];
  setThreads: Function;
}
export const ThreadsContext = createContext<threadsContextType>({
  threads: [],
  setThreads: () => {},
});

export const ThreadsProvider = ({
  children,
}: PropsWithChildren): JSX.Element => {
  const [threads, setThreads] = useState<Thread[]>([]);
  useEffect(() => {
    setThreads(generateThreads());
  }, []);
  return (
    <ThreadsContext.Provider
      value={{ threads: threads, setThreads: setThreads }}
    >
      {children}
    </ThreadsContext.Provider>
  );
};
