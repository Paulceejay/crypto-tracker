import { View, Text, FlatList, Image } from "react-native";
import { useEffect, useState } from "react";
import { getAllCoins } from "@/api/getAllCoins";
import CoinsItemComponent from "@/components/CoinsItemComponent";

const CoinsScreen = () => {
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const allcoins = async () => {
      const coindatas = await getAllCoins();
      
      setCoins(coindatas.coins);
    };

    allcoins();
  }, [coins]);

  return (
    <View>
      <FlatList
        className=""
        data={coins}
        keyExtractor={(item) => item.uuid}
        renderItem={({ item }) => (
          <CoinsItemComponent rank={item.rank} src={item.iconUrl} name={item.name} symbol={item.symbol} price={parseFloat(item.price).toFixed(2)} change={parseFloat(item.change).toFixed(2)} />
        )}
      />
    </View>
  )
}

export default CoinsScreen