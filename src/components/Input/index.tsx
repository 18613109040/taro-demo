import Taro, { useState, useContext } from '@tarojs/taro';
import { Input, View, Text } from '@tarojs/components'
import classnames from "classnames";
import { FromContext } from '../Form/context'
import './index.scss'
type InputProps = {
  defaultValue?: string,
  label?: string,
}
const Cinput: Taro.FC<InputProps> = (props: InputProps) => {
  const [focus, setFocus] = useState(false);
  const [value, setValue] = useState(props.defaultValue)
  const { onChange, trigger, error, label } = useContext(FromContext)
  const fillClass = classnames({
    'material-design-fill': true,
    'material-design-fill-error': error
  })
  const inputClass = classnames({
    'material-design-input': true
  })
  const lableClass = classnames({
    'material-design-lable': true,
    'material-design-lable-focus': value || focus
  })
  const onfocus = () => {
    if(!value) setFocus(true)
  }
  const onblur = (e) => {
    setFocus(false)
    if(onChange && trigger==="onBlur") {
      onChange(e.currentTarget.value)
    }
  }
  const oninput = (e) => {
    setValue(e.currentTarget.value)
    if(onChange && (trigger==="onChange" || !trigger)) {
      onChange(e.currentTarget.value)
    }
  }
  return (
    <View className={fillClass}>
      <Input
        className={inputClass}
        value={value}
        onFocus={onfocus}
        onBlur={onblur}
        onInput={oninput}
      />
      <Text className={lableClass}>{label||props.label}</Text>
    </View>
  )
};
export default Cinput;