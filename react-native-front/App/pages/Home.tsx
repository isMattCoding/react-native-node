import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { RootStackParamList } from "../../App";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";

type HomeScreenNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'Home'
>;

export const HomeScreen = ({navigation}: HomeScreenNavigationProp) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  return (
    <ScrollView className="flex-shrink items-center bg-gray-100 max-w-full [&>*:first-child]:max-w-full">
      <View className="flex-grow items-center max-w-full">
      <View className="my-8 flex-grow max-w-[20rem] min-w-full">
        <View className="flex-row items-center bg-white rounded-full shadow-md p-2 max-w-full mx-4">
          <TextInput
            className="flex-1 ml-2"
            placeholder={'Search'}
            onChangeText={()=>console.log('search term changed')}
          />
          <TouchableOpacity
            className="bg-blue-500 rounded-full px-4 py-2 ml-2"
            onPress={()=>console.log('search term submitted')}
          >
            <Text className="text-white font-bold">Search</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View className="items-center mb-8">
        <Image
          source={{ uri: 'https://via.placeholder.com/300' }}
          className="w-4/5 h-64 mb-8 resize-contain"
        />
        <Text className="text-3xl font-bold text-center text-blue-700 mb-4">Welcome to Our App</Text>
        <Text className="text-lg text-center text-gray-700 mb-6">
          Explore the features and enjoy the experience!
        </Text>
      </View>

      <View className="max-w-full mb-8 flex">
        <Text className="text-2xl font-bold text-center mb-6 text-blue-700">Features</Text>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={(event) => {
            const contentOffsetX = event.nativeEvent.contentOffset.x;
            const newIndex = Math.floor(contentOffsetX / event.nativeEvent.layoutMeasurement.width);
            setCurrentIndex(newIndex);
          }}
          className="max-w-full flex items-start justify-start"
        >
          <View className="max-w-full flex-row">
            <TouchableOpacity className="bg-white rounded-lg shadow-md p-4 items-center mx-4" onPress={() => console.log('hi')}>
              <Image
                source={{ uri: 'https://via.placeholder.com/150' }}
                className="w-32 h-32 mb-4 resize-contain"
              />
              <Text className="text-xl font-bold mb-2 text-blue-700">Feature 1</Text>
              <Text className="text-base text-center text-gray-700">Description of Feature 1</Text>
            </TouchableOpacity>

            <TouchableOpacity className="bg-white rounded-lg shadow-md p-4 items-center mx-4" onPress={() => console.log('hi')}>
              <Image
                source={{ uri: 'https://via.placeholder.com/150' }}
                className="w-32 h-32 mb-4 resize-contain"
              />
              <Text className="text-xl font-bold mb-2 text-blue-700">Feature 2</Text>
              <Text className="text-base text-center text-gray-700">Description of Feature 2</Text>
            </TouchableOpacity>

            <TouchableOpacity className="bg-white rounded-lg shadow-md p-4 items-center mx-4" onPress={() => console.log('hi')}>
              <Image
                source={{ uri: 'https://via.placeholder.com/150' }}
                className="w-32 h-32 mb-4 resize-contain"
              />
              <Text className="text-xl font-bold mb-2 text-blue-700">Feature 3</Text>
              <Text className="text-base text-center text-gray-700">Description of Feature 3</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <View className="flex-row justify-center mt-4">
          {[0, 1, 2].map((index) => (
            <View
              key={index}
              className={`h-2 w-2 rounded-full mx-1 ${index === currentIndex ? 'bg-blue-500' : 'bg-gray-400'}`}
            />
          ))}
        </View>
      </View>

      <TouchableOpacity className="bg-blue-500 rounded-full px-8 py-3" onPress={() => console.log('hi')}>
        <Text className="text-white text-lg font-bold">Get Started</Text>
      </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
