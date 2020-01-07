import Taro, { useState } from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';
import { AtIcon, AtActivityIndicator } from 'taro-ui'
import { baseUrl } from '../../config/index';
import Request from '../../utils/request';
import './index.scss'
type IFiles = {
  url?: string;
  name?: string;
  value?: string;
}
type IProps = {
  onChange?: (value) => void;
  label?: string;
  name?: any;
  error?: boolean;
  files?: Array<IFiles>;
  required?: boolean;
  multiple?: boolean;
  count?: number;
  defaultValue?: string;
  orderId?: string;
  disabled?: boolean;
}
const ImagePicker: Taro.FC<IProps> = (props: IProps) => {
  let { label, required, count=1, files=[], orderId, name, onChange, disabled=false } = props;
  const [loadding, setLoadding] = useState(false)
  const onChangeImage = () => {
    Taro.chooseImage({
      count: count - files.length,
      success: (res) => {
        setLoadding(true)
        const { tempFilePaths } = res
        tempFilePaths && tempFilePaths.map(item => {
          Taro.uploadFile({
            url: `${baseUrl}/clCollectClientInfoController/filedeal.do?id=${orderId}`,
            filePath: item,
            name: name,
            header: {
              Cookie: Taro.getStorageSync('cookie'),
            },
            success: (resd) => {
              setLoadding(false)
              const data = JSON.parse(resd.data)
              if (data.success && onChange) {
                onChange({
                  key: name,
                  value: data.attributes.value,
                  size: tempFilePaths.length
                })
              }
              setLoadding(false)
            }
          })
        })
      }
    })
  }
  const colose = (index) => {
      Request({
        url: '/clCollectClientInfoController.do?deteleFile',
        method: 'POST',
        data:{
          id: orderId,
          name: files&&files[index].name,
          filedName: name
        }
      }).then(res=>{
        if(res.success && onChange){
          onChange({
            key: name,
            value: res.attributes.value
          })
        }
      });
  }
  return (
    <View className="image-picker">
      {
        files && files.map((item, index) => (
          <View key={item.url} className="col-line">
            {
              item.url?
              <View className="preview">
                <Image src={`${baseUrl}/${item.url}`} className="image" />
                {!disabled&&<View className="close" onClick={()=>colose(index)}>
                  <AtIcon value="close" size="20" prefixClass='iconfont' color="#38558E" />
                </View>}
              </View>
              :
              <View className="add-image">
                <AtActivityIndicator size={32} />
              </View>
            }
            <View className="lable">
              {
                required && <Text className="required-icon">*</Text>
              }
              <Text>{files&&files.length==1?label: `${label}${index+1}`}</Text>
            </View>
          </View>
        ))
      }
      {
        files && files.length >= count ? '' : loadding ?
          <View className="col-line">
            <View className="add-image">
              <AtActivityIndicator size={32} />
            </View>
            <View className="lable">
              {
                required && <Text className="required-icon">*</Text>
              }
              <Text>{label}</Text>
            </View>
          </View> :
          <View className="col-line">
            <View className="add-image" onClick={onChangeImage}>
              <AtIcon value='upload' prefixClass='iconfont' size='30' color='#d0d3d9'></AtIcon>
            </View>
            <View className="lable">
              {
                required && <Text className="required-icon">*</Text>
              }
              <Text>{label}</Text>
            </View>
          </View>
      }
    </View>
  )

}
export default ImagePicker;