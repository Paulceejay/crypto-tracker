import { Text, TouchableOpacity, View } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import LogoComponent from "../components/LogoComponent";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter()
  return (
    <View
     className="flex-1 justify-center items-center bg-background px-6 relative"
    >
      {/* Logo at hte top */}
      <LogoComponent />

      <Text className="text-xl text-title font-GroteskBold font-bold capitalize text-justify">Track Your Crypto Portfolio</Text>

      <Text className="text-base font-normal font-Grotesk text-text2 text-center my-5">Accurately tracking cryptocurrency investment performance and taxes can be hard, We make it easy and help you save money</Text>

{/* the started button the bottom */}
      <View className="w-full rounded-full overflow-hidden shadow-lg absolute bottom-20">
      <LinearGradient
        colors={['#A288FD', '#622ff6', '#A288FD']}
        className="w-full"
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <TouchableOpacity onPress={() => router.replace("/coins")} className="py-5 w-full">
          <Text className="text-white text-center text-base font-semibold font-GroteskBold">
            Get Started
          </Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>

    </View>
  );
}
