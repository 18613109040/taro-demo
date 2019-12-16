import Taro, { useState } from '@tarojs/taro';
import { View, Text, PickerView, PickerViewColumn } from '@tarojs/components';
import {  AtListItem } from "taro-ui"
import { getProvinceData, getCity, getCounty } from '../../utils/area'
import './index.scss'
type ChooseAddrProps = {
  show: boolean;
  onChange:(value)=>void;
}
const ChooseAddr: Taro.FC<ChooseAddrProps> = (props: ChooseAddrProps) => {
  const provinces = getProvinceData();
  const [provinceIndex, setProvinceIndex] = useState(0)
  const [cityIndex, setCityIndex] = useState(0)
  const [show, setShow] = useState(props.show)
  const citys = getCity({ provinceIndex: provinceIndex, provinces });
  const countys = getCounty({ provinceIndex: provinceIndex, provinces, cityIndex: cityIndex, citys });
  const [values, setValues] = useState([0, 0, 0])
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
    props.onChange([provinces[values[0]], citys[values[1]], countys[values[2]]])
  }
  console.dir(show)
  return (
    <View>
      <AtListItem
        title='标题文字'
        arrow='right'
        onClick={()=>setShow(true)}
      />
      {
        show&&(
          <View className="animation-element-wrapper">
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
export default ChooseAddr