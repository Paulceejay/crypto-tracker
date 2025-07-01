import { View, Text, TextInput, FlatList } from "react-native";
import React from "react";
import EvilIcons from "@expo/vector-icons/EvilIcons";

type searchProps = {
  value: string
  onChangeText: ((text: string) => void)
}

const SearchComponent = ({value, onChangeText}: searchProps) => {
  return (
    <View className="my-5 flex flex-row justify-between bg-white h-auto w-full rounded-full">
      <TextInput
        className="px-5 py-5 text-text text-base font-Grotesk font-semibold w-9/12"
        placeholder="Search Cryptocurrency"
        placeholderTextColor={"#babbc"}
        value={value}
        onChangeText={onChangeText}
      />
      <EvilIcons
        className="rounded-full bg-background flex justify-center items-center m-2 p-2"
        name="search"
        size={30}
        color="#010015"
      />
    </View>
  );
};

export default SearchComponent;
