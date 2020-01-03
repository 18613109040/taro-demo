import Taro, { useState } from '@tarojs/taro';
import { View,  Picker } from '@tarojs/components';
import { RulesProps } from '../../interface/form'
import ListItem from '../ListItem'
import './index.scss'
type DatePickerProps = {
  onChange:(value)=>void;
  label?: string;
  defaultValue?: string;
  error?: boolean;
  rules?: Array<RulesProps>;
  end?: string;
  start?: string;
  disabled?: boolean;
}
const DatePicker: Taro.FC<DatePickerProps> = (props: DatePickerProps) => {
  const { label, defaultValue, error, rules, onChange, end, start, disabled } = props;
  const [title, setTitle] = useState(defaultValue)
  const errorMsg = rules && rules[0].message
  const onGengerChange = (e) => {
    setTitle(e.detail.value)
    if(onChange) onChange({value: e.detail.value, error: false})
  }
  return (
    <View className="date-picker">
      <Picker 
        mode='date'
        end={end}
        disabled={disabled}
        start={start}
        onChange={onGengerChange}>
        <ListItem
          label={label}
          value={title}
          error={error}
          errorMsg={errorMsg}
        />
      </Picker>
    </View>
  )
}
export default DatePicker;