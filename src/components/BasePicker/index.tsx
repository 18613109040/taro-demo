import Taro, { useState, useEffect } from '@tarojs/taro';
import { View, Picker } from '@tarojs/components';
import ListItem from '../ListItem'
import { RulesProps } from '../../interface/form'
import './index.scss'
type Range = {
  name: string;
  [key:string]: string;
}
type BasePickerProps = {
  onChange?:(value)=>void;
  label?: string;
  defaultValue?: any;
  error?: boolean;
  range?: Array<Range>;
  rules?: Array<RulesProps>;
  disabled?: boolean;
}
const BasePicker: Taro.FC<BasePickerProps> = (props: BasePickerProps) => {
  const { label, defaultValue, error, rules, onChange, range, disabled } = props;
  const errorMsg = rules && rules[0].message
  const [title, setTitle] = useState(defaultValue)
  const onPickerChange = (e) => {
    setTitle(range&&range[e.detail.value].name)
    if(onChange) onChange({value: range&&range[e.detail.value].name, error: false})
  }
  useEffect(()=>{
    setTitle(props.defaultValue)
  },[props.defaultValue])
  return (
    <View className="education">
      <Picker 
        mode='selector' 
        range={range} 
        rangeKey="name"
        disabled={disabled}
        onChange={onPickerChange}>
        <ListItem
          label={label}
          value={title}
          error={error}
          errorMsg={errorMsg}
          onClick={()=>{}}
        />
      </Picker>
    </View>

  )

}
export default BasePicker;