import Taro from '@tarojs/taro';
import { View, ScrollView } from '@tarojs/components';
type IProps = {
  height?: number;
  className?: string;
}
const ScrollBody: Taro.FC<IProps> = (props: IProps) => {
  const { height, className } = props;
  return (
    <ScrollView
      className={className}
      scrollY
      scrollWithAnimation
      style={{height: `${height}px`}}
    >
      <View>
        {this.props.children}
      </View>
    </ScrollView>
  )
}
export default ScrollBody