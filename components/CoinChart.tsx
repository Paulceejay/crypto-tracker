import { View, Text } from 'react-native';
import React, { useState } from 'react';
import { getCoinHistory } from "@/api/getCoinDetails";
import { CartesianChart, Line, useChartPressState } from 'victory-native';
import { useQuery } from "@tanstack/react-query";

const CoinChart = ({uuid, name}: any) => {
  const [timePeriod, setTimePeriod] = useState('24h');
  const { data: historyData, isLoading: historyLoading } = useQuery({
    queryKey: ['coin-history', uuid, timePeriod],
    queryFn: () => getCoinHistory(uuid, timePeriod),
    refetchInterval: 1000,
    refetchOnWindowFocus: false,
    staleTime: 10000, // Consider data stale after 10 seconds
    retry: 3,
  });

  if (historyLoading || !historyData || historyData.length === 0 ) {
   return <Text className="flex-1 justify-center items-center text-title text-base font-normal font-Grotesk">Loading {name} charts</Text>
   
   }

    return (
      <CartesianChart
      height={250}
      data={historyData}
      xKey="x"
      yKeys={['y']}
      domainPadding={{ top: 10, bottom: 20, left: 20, right: 20 }}
    >
      {({ points }) => (
        <>
          <Line points={points.y} color="#88bca6" strokeWidth={2} animate={{type: "timing", duration: 200}} />
          
        </>
      )}
    </CartesianChart>
      );
}

export default CoinChart