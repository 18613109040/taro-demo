import Taro, { useState } from '@tarojs/taro';
import { View, Text, PickerView, PickerViewColumn } from '@tarojs/components';
import { getProvinceData, getCity, getCounty } from '../../utils/area'
import { RulesProps } from '../../interface/form'
import ListItem from '../ListItem'
import './index.scss'
type AddrProps = {
  onChange?:(value)=>void;
  label?: string;
  defaultValue?: string;
  error?: boolean;
  rules?: Array<RulesProps>;
  // errorMsg: string;
}
const Addr: Taro.FC<AddrProps> = (props: AddrProps) => {
  const { label, error, rules, defaultValue, onChange } = props;
  const errorMsg = rules && rules[0].message
  const provinces = getProvinceData();
  const [provinceIndex, setProvinceIndex] = useState<number>(0)
  const [extraText, setExtraText] = useState<any>(defaultValue)
  const [cityIndex, setCityIndex] = useState<number>(0)
  const [show, setShow] = useState<boolean>(false)
  const citys = getCity({ provinceIndex: provinceIndex, provinces });
  const countys = getCounty({ provinceIndex: provinceIndex, provinces, cityIndex: cityIndex, citys });
  const [values, setValues] = useState<Array<number>>([0, 0, 0])
  const onPickerChange = (e) => {
    const { value } = e.detail;
    setValues(value)
    setProvinceIndex(value[0])
    setCityIndex(value[1])
  }
  const cancel = () => {
    setShow(false)
  }
  const change = () => {
    setShow(false)
    setExtraText(`${provinces[values[0]].name}/${citys[values[1]].name}/${countys[values[2]].name}`)
    if(onChange) onChange({value: [provinces[values[0]], citys[values[1]], countys[values[2]]], error: false})
  }
  return (
    <View className="choose-addr">
      <ListItem
        label={label}
        value={extraText}
        error={error}
        errorMsg={errorMsg}
        onClick={()=>setShow(true)}
      />
      {
        show&&(
          <View className="animation-element-wrapper" >
            <View className="animation-element">
              <Text className="left-bt" onClick={cancel}>取消</Text>
              <Text className="right-bt" onClick={change}>确定</Text>
            </View>
            <View>
              <PickerView
                onChange={onPickerChange}
                value={values}
                indicatorStyle='height: 50px;'
              >
                <PickerViewColumn>
                  {
                    provinces.map(item => {
                      return <View key={item.code}>{item.name}</View>
                    })
                  }
                </PickerViewColumn>
                <PickerViewColumn>
                  {
                    citys.map(item => {
                      return <View key={item.code}>{item.name}</View>
                    })
                  }
                </PickerViewColumn>
                <PickerViewColumn>
                  {
                    countys.map(item => {
                      return <View key={item.code}>{item.name}</View>
                    })
                  }
                </PickerViewColumn>
              </PickerView>
            </View>
        </View> 
        )
      }
       
    </View>

  )

}
export default Addr