import Taro from '@tarojs/taro';
import { AtIcon } from 'taro-ui'
import { View, Text } from '@tarojs/components';
import './index.scss'
type IconProps = {
  prefixClass?: string;
  value?: string;
  size?: number;
  color?: string;
}
type IProps = {
  title?: string;
  arrow?: boolean;
  extraText?: string;
  iconInfo?: IconProps;
  extraColor?: string;
  onClick?: (any)=>void;
  hasBorder?: boolean;
}
const List: Taro.FC<IProps> = (props: IProps) => {
  const { title, onClick, arrow, extraText, iconInfo, extraColor, hasBorder } = props;
  const listClick =(e) => {
    if(onClick) onClick(e)
  }
  return (
    <View className={"list-components"} onClick={listClick}>
      {iconInfo&&iconInfo.value&&<View className="icon">
        <AtIcon
          value={iconInfo.value}
          size={iconInfo.size}
          color={iconInfo.color}
          prefixClass={iconInfo.prefixClass}
        />
      </View>}
      <Text className="title">{title}</Text>
      <View className="right">
        <Text style={{color: extraColor}}>{extraText}</Text>
        {arrow && <AtIcon value="chevron-right" size="20" color="#d0d3d9"></AtIcon>}
      </View>
    </View>
  )
}

export default List;