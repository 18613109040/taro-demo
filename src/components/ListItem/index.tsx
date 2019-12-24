import Taro from '@tarojs/taro';
import { AtIcon } from 'taro-ui'
import { View, Text, Icon } from '@tarojs/components';
import classnames from "classnames";
import './index.scss'
type FrameProps = {
  label?: string;
  value?: string;
  error?: boolean;
  errorMsg?: string;
  onClick?: (any)=>void;
}
const ListItem: Taro.FC<FrameProps> = (props: FrameProps) => {
  const { label, value, onClick, error, errorMsg } = props;
  const listClass = classnames({
    'list-default': true,
    'list-error': error,
  })
  const lableClass = classnames({
    'material-design-lable': true,
    'material-design-lable-focus': value
  })
  const listClick =(e) => {
    if(onClick) onClick(e)
  }
  return (
    <View className="list-item-com">
      <View className={listClass} onClick={listClick}>
        <Text className={lableClass}>{label}</Text>
        {value&&<Text className="list-value">{value}</Text>}
        <View className="down-icon">
          <AtIcon prefixClass='iconfont' value='down' size='16' color='#BEC1D9'/>
        </View>
      </View>
      {
        error&&<View className="error-msg">
          <Icon size='12' type='warn' color='#FF7800' />
          <Text className="error-des">{errorMsg}</Text>
        </View>
      }
    </View>
  )
}

export default ListItem;