import Taro from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { AtIcon } from "taro-ui"
import './index.scss';
type StepDataProprs = {
  title?: string;
}
type StepsProps = {
  steps: Array<StepDataProprs>;
  current: number;
}

const Steps: Taro.FC<StepsProps> = (props: StepsProps) => {
  const { steps, current } = props;
  return (
    <View className="stpes-list">
      {
        steps&&steps.map((item, index) =>
          <View className="item" key={item.title}>
            {
              current > index ? <AtIcon prefixClass='iconfont' value="sucess" size="15" color="#fff" /> : <AtIcon prefixClass='iconfont' value="point" size="10" color={current === index ? "#FFD915" : "#F5F5FA"} />
            }
            <Text className={current == index ? "active-text" : "text"}>{item.title}</Text>
          </View>
        )
      }
    </View>
  );
}
export default Steps;