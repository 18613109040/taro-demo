import Taro from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { FormDataProps } from '../../interface/form'
import './index.scss'
type BaseInfoProps = {
  data: FormDataProps
}
const BaseInfo: Taro.FC<BaseInfoProps> = (props: BaseInfoProps) => {
  const { data } =  props
  const {  isDriverLicense, email, phone, realEstateCategory, education, marriage, childrenSum, childrenStatus, livesProvince, livesCity, livesCountry, livesAddress,
    companyName, yearsWorking, jobYears, entryUnitTime, annualIncome, unitPhoneNumber, companyProvince, companyCity, companyCounty, companyAddress  } = data || {
    
  };
  return (
    <View className="id-card-info">
      <View className='info-item'>
        <View className='list-item'>
          <Text>邮箱:</Text>
          <Text className="list-item-text">{email}</Text>
        </View>
      </View>
      <View className='info-item'>
        <View className='list-item'>
          <Text>微信号:</Text>
          <Text className="list-item-text">{realEstateCategory}</Text>
        </View>
      </View>
      <View className='info-item'>
        <View className='list-item'>
          <Text>手机号码:</Text>
          <Text className="list-item-text">{phone}</Text>
        </View>
        <View className='list-item'>
          <Text>驾照情况:</Text>
          <Text className="list-item-text">{isDriverLicense?'有': '无'}</Text>
        </View>
      </View>

      <View className='info-item'>
        <View className='list-item'>
          <Text>学历:</Text>
          <Text className="list-item-text">{education}</Text>
        </View>
        <View className='list-item'>
          <Text>婚姻状况:</Text>
          <Text className="list-item-text">{marriage}</Text>
        </View>
      </View>

      <View className='info-item'>
        <View className='list-item'>
          <Text>家庭人口数量:</Text>
          <Text className="list-item-text">{childrenSum}</Text>
        </View>
        <View className='list-item'>
          <Text>子女个数:</Text>
          <Text className="list-item-text">{childrenStatus}</Text>
        </View>
      </View>

      <View className='info-item'>
        <View className='list-item'>
          <Text>现居住地址:</Text>
          <Text className="list-item-text">{`${livesProvince}${livesCity}${livesCountry}${livesAddress}`}</Text>
        </View>
      </View>

      <View className='info-item'>
        <View className='list-item'>
          <Text>公司名称:</Text>
          <Text className="list-item-text">{companyName}</Text>
        </View>
      </View>
      <View className='info-item'>
        <View className='list-item'>
          <Text>工龄（年）:</Text>
          <Text className="list-item-text">{yearsWorking}</Text>
        </View>
        <View className='list-item'>
          <Text>现公司工作年限:</Text>
          <Text className="list-item-text">{jobYears}</Text>
        </View>
      </View>
      <View className='info-item'>
        <View className='list-item'>
          <Text>进入单位时间:</Text>
          <Text className="list-item-text">{entryUnitTime}</Text>
        </View>
        <View className='list-item'>
          <Text>个人税后月收入(元):</Text>
          <Text className="list-item-text">{annualIncome}</Text>
        </View>
      </View>

      <View className='info-item'>
        <View className='list-item'>
          <Text>公司电话号码:</Text>
          <Text className="list-item-text">{unitPhoneNumber}</Text>
        </View>
      </View>
      <View className='info-item'>
        <View className='list-item'>
          <Text>公司地址:</Text> 
          <Text className="list-item-text">{`${companyProvince}${companyCity}${companyCounty}${companyAddress}`}</Text>
        </View>
      </View>
    </View>
  )
}
export default BaseInfo