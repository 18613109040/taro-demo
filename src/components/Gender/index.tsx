import Taro, { useState } from '@tarojs/taro';
import { View, Picker } from '@tarojs/components';
import ListItem from '../ListItem'
import { RulesProps } from '../../interface/form'
import './index.scss'
type GenderProps = {
  onChange?:(value)=>void;
  label?: string;
  defaultValue?: any;
  error?: boolean;
  rules?: Array<RulesProps>;
}
const Gender: Taro.FC<GenderProps> = (props: GenderProps) => {
  const { label, defaultValue, error, rules, onChange } = props;
  const errorMsg = rules && rules[0].message
  const gender = [{name: '男'},{name: '女'}]
  const [title, setTitle] = useState(defaultValue)
  const onGengerChange = (e) => {
    setTitle(gender[e.detail.value].name)
    if(onChange) onChange({value: gender[e.detail.value].name, error: false})
  }
  return (
    <View className="gender">
      <Picker 
        mode='selector' 
        range={gender} 
        rangeKey="name"
        onChange={onGengerChange}>
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
export default Gender;