import Taro from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { CarInfoProps } from '../../interface/form'
import './index.scss'
type IProps = {
  data: CarInfoProps
}
const CarBaseInfo: Taro.FC<IProps> = (props: IProps) => {
  const { data } =  props
  const { licenseOwner, carType, useType, carBrand, carSystem, carColour, factoryDay, carFristLoginDay, carNo, carDisplacement, frameNumber, powerCteType, drivenDistance, advanceOffer, licenseProvince, valuationCity, licenseCounty, newCarPrice, engineNo } = data || {};
  return (
    <View className="card-info">
      <View className='info-item'>
        <View className='list-item'>
          <Text>行驶证车主名:</Text>
          <Text className="list-item-text">{licenseOwner}</Text>
        </View>
        <View className='list-item'>
          <Text>车型:</Text>
          <Text className="list-item-text">{carType}</Text>
        </View>
      </View>
      <View className='info-item'>
        <View className='list-item'>
          <Text>用途:</Text>
          <Text className="list-item-text">{useType}</Text>
        </View>
        <View className='list-item'>
          <Text>品牌:</Text>
          <Text className="list-item-text">{carBrand}</Text>
        </View>
      </View>

      <View className='info-item'>
        <View className='list-item'>
          <Text>车系:</Text>
          <Text className="list-item-text">{carSystem}</Text>
        </View>
        <View className='list-item'>
          <Text>车辆颜色:</Text>
          <Text className="list-item-text">{carColour}</Text>
        </View>
      </View>
      <View className='info-item'>
        <View className='list-item'>
          <Text>出厂日期:</Text>
          <Text className="list-item-text">{factoryDay}</Text>
        </View>
        <View className='list-item'>
          <Text>初次登记日期:</Text>
          <Text className="list-item-text">{carFristLoginDay}</Text>
        </View>
      </View>
      <View className='info-item'>
        <View className='list-item'>
          <Text>车牌号:</Text>
          <Text className="list-item-text">{carNo}</Text>
        </View>
        <View className='list-item'>
          <Text>排量(L):</Text>
          <Text className="list-item-text">{carDisplacement||'未填写'}</Text>
        </View>
      </View>
      
      <View className='info-item'>
        <View className='list-item'>
          <Text>新车指导价(元):</Text>
          <Text className="list-item-text">{newCarPrice}</Text>
        </View>
        <View className='list-item'>
          <Text>发动机号:</Text>
          <Text className="list-item-text">{engineNo}</Text>
        </View>
      </View>

      <View className='info-item'>
        <View className='list-item'>
          <Text>车架号:</Text>
          <Text className="list-item-text">{frameNumber}</Text>
        </View>
      </View>

      <View className='info-item'>
        <View className='list-item'>
          <Text>动力系统类别:</Text>
          <Text className="list-item-text">{powerCteType}</Text>
        </View>
        <View className='list-item'>
          <Text>行驶里程(整数km):</Text>
          <Text className="list-item-text">{drivenDistance}</Text>
        </View>
      </View>
      <View className='info-item'>
        <View className='list-item'>
          <Text>车商零售价(元):</Text>
          <Text className="list-item-text">{advanceOffer}</Text>
        </View>
        <View className='list-item'>
          <Text>上牌地址:</Text>
          <Text className="list-item-text">{`${licenseProvince}${valuationCity}${licenseCounty}`}</Text>
        </View>
      </View>
      
    </View>
  )
}
export default CarBaseInfo