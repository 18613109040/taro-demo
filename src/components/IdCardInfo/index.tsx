import Taro from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { FormDataProps } from '../../interface/form'
import './index.scss'
type IdCardInfoProps = {
  data: FormDataProps
}
const IdCardInfo: Taro.FC<IdCardInfoProps> = (props: IdCardInfoProps) => {
  const { data } =  props
  const { name, idCard, sex, birthday, placeOfissue, idCardStartDate, idCardEndDate, effectiveness, idAddrProvince, idAddrCity, idAddrArea, idAddrDetails,  censusRegisterProvince, censusRegisterCity,censusRegisterCounty,censusRegisterAddress } = data || {
    name: '', idCard:'', sex: '', birthday: '', placeOfissue: false, idCardStartDate: '', idCardEndDate:'', effectiveness: '',  idAddrProvince: '', idAddrCity: '', idAddrArea: '', idAddrDetails: '', censusRegisterProvince: '', censusRegisterCity: '',censusRegisterCounty:'',censusRegisterAddress:''
  };
  return (
    <View className="id-card-info">
      <View className='info-item'>
        <View className='list-item'>
          <Text>姓名:</Text>
          <Text className="list-item-text">{name}</Text>
        </View>
        <View className='list-item'>
          <Text>性别:</Text>
          <Text className="list-item-text">{sex}</Text>
        </View>
      </View>
      <View className='info-item'>
        <View className='list-item'>
          <Text>签发地:</Text>
          <Text className="list-item-text">{placeOfissue}</Text>
        </View>
        <View className='list-item'>
          <Text>出身日期:</Text>
          <Text className="list-item-text">{birthday}</Text>
        </View>
      </View>
      <View className='info-item'>
        <View className='list-item'>
          <Text>有效时间:</Text>
          <Text className="list-item-text">{idCardStartDate} 至 {effectiveness ? '长期' : idCardEndDate}</Text>
        </View>
      </View>
      <View className='info-item'>
        <View className='list-item'>
          <Text>身份证号码:</Text>
          <Text className="list-item-text">{idCard}</Text>
        </View>
      </View>
      <View className='info-item'>
        <View className='list-item'>
          <Text>地址:</Text>
          <Text className="list-item-text">{`${idAddrProvince}${idAddrCity}${idAddrArea}${idAddrDetails}`}</Text>
        </View>
      </View>
      <View className='info-item'>
        <View className='list-item'>
          <Text>户籍地址:</Text>
          <Text className="list-item-text">{`${censusRegisterProvince}${censusRegisterCity}${censusRegisterCounty}${censusRegisterAddress}`}</Text>
        </View>
      </View>
    </View>
  )
}
export default IdCardInfo