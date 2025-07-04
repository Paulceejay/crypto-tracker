import { View, Text } from "react-native";
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

  const value = useDerivedValue(() => {
    return "$" + state.y.highTmp.value.value.toFixed(2)
  },[state])


  const { data: historyData, isLoading: historyLoading } = useQuery({
    queryKey: ["coin-history", uuid, timePeriod],
    queryFn: () => getCoinHistory(uuid, timePeriod),
    refetchInterval: 1000,
    refetchOnWindowFocus: false,
    staleTime: 10000,
    retry: 3,
  });

  // Format price for display
  const formatPrice = (label: unknown) => {
    const price = Number(label);
    if (isNaN(price)) return "";

    if (price >= 1000) {
      return `$${(price / 1000).toFixed(1)}K`;
    } else if (price >= 1) {
      return `$${price.toFixed(2)}`;
    } else {
      return `$${price.toFixed(4)}`;
    }
  };

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

  if (historyLoading || !historyData || historyData.length === 0) {
    return (
      <Text className="flex justify-self-center self-center text-title text-base font-normal font-Grotesk">
        Loading {name} charts
      </Text>
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
          domainPadding={{ top: 10, bottom: 20, left: 20, right: 20 }}
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
          {({ points, chartBounds }) => (
            <>
            <SkText
            x={chartBounds.left + 10}
            y={40}
            font={font}
            text={value}
            color={isPositive ? '#88bca6' : '#df7c90'}
            style={"fill"}
             />
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
