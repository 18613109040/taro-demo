import Taro from '@tarojs/taro';
import { Input, View, Text } from '@tarojs/components'

const Cinput: Taro.FC = (props) => {
  console.dir(props)
  return (
    <View className="material-design-fill">
      <Input 
        className="material-design-input"
      />
      <Text className="material-design-lable">我是测试</Text>
    </View>
    
  )
};
export default Cinput;