import Taro from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { GuaranteeInfoProps } from '../../interface/form'
import './index.scss'
type IProps = {
  data: GuaranteeInfoProps
}
const GuaranteeInfo: Taro.FC<IProps> = (props: IProps) => {
  const { data } =  props
  const { name, phone, relationship, cardId, email, liveProvince, liveCity, liveArea, address, companyName, companyPhone, annualIncome, province, city, area, companyAddress } = data || {};
  return (
    <View className="id-card-info">
      <View className='info-item'>
        <View className='list-item'>
          <Text>姓名:</Text>
          <Text className="list-item-text">{name||'未填写'}</Text>
        </View>
        <View className='list-item'>
          <Text>关系:</Text>
          <Text className="list-item-text">{relationship||'未填写'}</Text>
        </View>
      </View>
      <View className='info-item'>
        <View className='list-item'>
          <Text>手机号:</Text>
          <Text className="list-item-text">{phone||'未填写'}</Text>
        </View>
        <View className='list-item'>
          <Text>邮箱:</Text>
          <Text className="list-item-text">{email||'未填写'}</Text>
        </View>
      </View>
      <View className='info-item'>
        <View className='list-item'>
          <Text>身份证号:</Text>
          <Text className="list-item-text">{cardId||'未填写'} </Text>
        </View>
      </View>
      <View className='info-item'>
        <View className='list-item'>
          <Text>居住地址:</Text>
          <Text className="list-item-text">{`${liveProvince}${liveCity}${liveArea}${address}`||'未填写'}</Text>
        </View>
      </View>
      <View className='info-item'>
        <View className='list-item'>
          <Text>公司名称:</Text>
          <Text className="list-item-text">{companyName||'未填写'}</Text>
        </View>
      </View>
      <View className='info-item'>
        <View className='list-item'>
          <Text>公司电话:</Text>
          <Text className="list-item-text">{companyPhone||'未填写'}</Text>
        </View>
        <View className='list-item'>
          <Text>月收入(元):</Text>
          <Text className="list-item-text">{annualIncome||'未填写'}</Text>
        </View>
      </View>
      <View className='info-item'>
        <View className='list-item'>
          <Text>公司地址:</Text>
          <Text className="list-item-text">{`${province}${city}${area}${companyAddress}`||'未填写'}</Text>
        </View>
      </View>
    </View>
  )
}
export default GuaranteeInfo