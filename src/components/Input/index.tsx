import Taro, { useState } from '@tarojs/taro';
import { Input, View, Text } from '@tarojs/components';
import { RulesProps } from '../../interface/form'
import classnames from "classnames";
import './index.scss'
type InputProps = {
  value?: string,
  label?: string,
  name?: string,
  rules: Array<RulesProps>;
  trigger?: string;
  type?: any;
  onChange?: (obj:object)=>void;
}
const Cinput: Taro.FC<InputProps> = (props: InputProps) => {
  const [focus, setFocus] = useState(false);
  const [errorIndex, setErrorIndex] = useState<number>(-1);
  const [value, setValue] = useState(props.value);
  const { trigger, rules, label, name, onChange, type } = props;
  const error = errorIndex >= 0 ? true : false;
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
    if (!value) setFocus(true)
  }
  const onblur = (e) => {
    setFocus(false)
    if (trigger === "onBlur") {
      const findIndex = rules.findIndex(rule => {
        return rule.required && !e.currentTarget.value.match(rule.pattern)
      })
      setErrorIndex(findIndex)
    }
    onChange && onChange({
      value: e.currentTarget.value,
      error: error
    })
  }
  const oninput = (e) => {
    setValue(e.currentTarget.value)
    if (trigger === "onChange" || !trigger) {
      const findIndex = rules.findIndex(rule => {
        return rule.required && !e.currentTarget.value.match(rule.pattern)
      })
      setErrorIndex(findIndex)
    }
  }
  return (
    <View>
      <View className={fillClass}>
        <Input
          name={name}
          className={inputClass}
          value={value}
          onFocus={onfocus}
          onBlur={onblur}
          onInput={oninput}
          type={type||'text'}
        />
        <Text className={lableClass}>{label || props.label}</Text>
      </View>
      <View className="error-des">
        <Text className={error?"error-msg":"error-msg-disable"}>{rules[errorIndex].message}</Text>
      </View>
      
    </View>
  )
};
export default Cinput;