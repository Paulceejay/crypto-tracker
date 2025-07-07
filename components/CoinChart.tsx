import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { getCoinHistory } from "@/api/getCoinDetails";
import { CartesianChart, Line, useChartPressState } from "victory-native";
import { useQuery } from "@tanstack/react-query";
import { Circle, useFont, Text as SkText } from "@shopify/react-native-skia";
import TimePeriodSelector from "./TimePeriodSelector";
import { SharedValue, useDerivedValue } from "react-native-reanimated";

const CoinChart = ({ uuid, name }: any) => {
   const { state, isActive } = useChartPressState({ x: 0, y: { highTmp: 0 } });
  const [timePeriod, setTimePeriod] = useState("24h");
  
  const grotesk = require("../assets/fonts/SpaceGrotesk-Regular.ttf");
  const font = useFont(grotesk, 12);

  const { data: historyData, isLoading: historyLoading, error:historyError, refetch: historyRefectch } = useQuery({
    queryKey: ["coin-history", uuid, timePeriod],
    queryFn: () => getCoinHistory(uuid, timePeriod),
    refetchInterval: 1000,
    refetchOnWindowFocus: true,
    staleTime: 10000,
    retry: 3,
  });

   // Calculate if price is trending up or down
let isPositive = false;
if (historyData?.length >= 2) {
  const firstPrice = historyData[0]?.y || 0;
  const lastPrice = historyData[historyData.length - 1]?.y || 0;
  
  isPositive = lastPrice >= firstPrice;
  
} else if (historyData?.length === 1) {
  isPositive = true;
}

  // Format time for display
  const formatTime = (label: unknown) => {
    const timestamp = Number(label);
    if (isNaN(timestamp)) return "";

    const date = new Date(timestamp);

    if (timePeriod === "1h" || timePeriod === "24h") {
      return date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
    } else {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    }
  };

  if (historyLoading) {
    return (
     <View className="flex justify-center items-center h-28">
      <TimePeriodSelector period={timePeriod} onPeriodChange={setTimePeriod} />
       <Text className="text-title text-base font-normal font-Grotesk">
        Loading {name} charts
      </Text>
     </View>
    );
  }

  if (historyError || !historyData || historyData.length === 0){
    return (
      <View className="flex justify-center items-center h-28">
        <Text className="text-base mb-4 text-dangerColor font-Grotesk">Unable to load {name} chart data</Text>
        <TouchableOpacity className="bg-title px-5 py-2 rounded-lg" onPress={() => historyRefectch()}>
          <Text className="text-white text-base font-semibold font-Grotesk">Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <>
      <TimePeriodSelector period={timePeriod} onPeriodChange={setTimePeriod} />
      <View className="h-80">
        <CartesianChart
          height={250}
          data={historyData}
          xKey="x"
          yKeys={["y"]}
          domainPadding={{ top: 20, bottom: 20, left: 5, right: 5 }}
          axisOptions={{
            font,
            tickCount: {
              x: 4,
              y: 5,
            },
            formatXLabel: formatTime,
            lineColor: "transparent",
            lineWidth: 0,
          }}
          chartPressState={state}
        >
          {({ points}) => (
            <>
              <Line
                points={points.y}
                color={isPositive ? '#88bca6' : '#df7c90'}
                strokeWidth={2}
                animate={{ type: "timing", duration: 200 }}
              />
              {isActive && (
              <ToolTip x={state.x.position} y={state.y.highTmp.position} />
            )}
            </>
          )}
        </CartesianChart>
      </View>
    </>
  );
};

const ToolTip = ({ x, y }:{ x: SharedValue<number>; y: SharedValue<number> }) => {
  return <Circle cx={x} cy={y} r={8} color="black" />;
}

export default CoinChart;
