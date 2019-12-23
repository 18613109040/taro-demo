import Taro from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { FormDataProps } from '../../interface/form'
import './index.scss'
type ContactInfoProps = {
  data: FormDataProps
}
const ContactInfo: Taro.FC<ContactInfoProps> = (props: ContactInfoProps) => {
  const { data } =  props
  const { contactName1, contactRelationship1, contactPhone1, contactIdCard1, contactName2,contactRelationship2, contactPhone2, contactIdCard2, 
    contactName3, contactRelationship3, contactPhone3, contactIdCard3   } = data || {
    
  };
  return (
    <View className="contact-card-info">
      <View className="card">
        <View className="header">
          <Text className="text">联系人1</Text>
          {contactIdCard1&&<Text className="abs">(担保人)</Text>}
        </View>
        <View className='info-item'>
          <View className='list-item'>
            <Text>姓名:</Text>
            <Text className="list-item-text">{contactName1}</Text>
          </View>
          <View className='list-item'>
            <Text>与借款人关系:</Text>
            <Text className="list-item-text">{contactRelationship1}</Text>
          </View>
        </View>
        <View className='info-item'>
          <View className='list-item'>
            <Text>手机号:</Text>
            <Text className="list-item-text">{contactPhone1}</Text>
          </View>
        </View>
       {contactIdCard1&&<View className='info-item'>
          <View className='list-item'>
            <Text>身份证号:</Text>
            <Text className="list-item-text">{contactIdCard1}</Text>
          </View>
        </View>}
      </View>
      
      <View className="card">
        <View className="header">
          <Text className="text">联系人2</Text>
          {contactIdCard2&&<Text className="abs">(担保人)</Text>}
        </View>
        <View className='info-item'>
          <View className='list-item'>
            <Text>姓名:</Text>
            <Text className="list-item-text">{contactName2}</Text>
          </View>
          <View className='list-item'>
            <Text>与借款人关系:</Text>
            <Text className="list-item-text">{contactRelationship2}</Text>
          </View>
        </View>
        <View className='info-item'>
          <View className='list-item'>
            <Text>手机号:</Text>
            <Text className="list-item-text">{contactPhone2}</Text>
          </View>
        </View>
       {contactIdCard2&&<View className='info-item'>
          <View className='list-item'>
            <Text>身份证号:</Text>
            <Text className="list-item-text">{contactIdCard2}</Text>
          </View>
        </View>}
      </View>
      
      <View className="card">
        <View className="header">
          <Text className="text">联系人3</Text>
          {contactIdCard3&&<Text className="abs">(担保人)</Text>}
        </View>
        <View className='info-item'>
          <View className='list-item'>
            <Text>姓名:</Text>
            <Text className="list-item-text">{contactName3}</Text>
          </View>
          <View className='list-item'>
            <Text>与借款人关系:</Text>
            <Text className="list-item-text">{contactRelationship3}</Text>
          </View>
        </View>
        <View className='info-item'>
          <View className='list-item'>
            <Text>手机号:</Text>
            <Text className="list-item-text">{contactPhone3}</Text>
          </View>
        </View>
       {contactIdCard3&&<View className='info-item'>
          <View className='list-item'>
            <Text>身份证号:</Text>
            <Text className="list-item-text">{contactIdCard3}</Text>
          </View>
        </View>}
      </View>
    </View>
  )
}
export default ContactInfo