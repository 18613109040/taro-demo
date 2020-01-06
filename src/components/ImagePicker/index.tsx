import Taro, { useState } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { AtImagePicker } from 'taro-ui'
import { baseUrl } from '../../config/index';
import Request from '../../utils/request';
import './index.scss'
type IFiles = {
  url?: string;
  name?: string;
  value?: string;
}
type IProps = {
  onChange?:(value)=>void;
  label?: string;
  name?: any;
  error?: boolean;
  files?: Array<IFiles>;
  required?: boolean; 
  multiple?: boolean;
  count?: number;
  length?: number;
  defaultValue?: string;
  orderId?: string;
}
const ImagePicker: Taro.FC<IProps> = (props: IProps) => {
  let  { label, error, required, multiple, count, length, files, orderId,name, onChange} = props;
  files && files.map(item=>{
    item.value = item.url;
    item.url = `${baseUrl}/${item.url}`;
  })
  // const [file, setFile] = useState(files)
  const onChangeImage = (fileList, operationType, index) => {
    console.dir(fileList)
    console.dir(operationType)
    console.dir(index)
    if(operationType === 'add'){
      Taro.uploadFile({
        url: `${baseUrl}/clCollectClientInfoController/filedeal.do?id=${orderId}`,
        filePath: fileList[fileList.length-1].url,
        name: name,
        header:{
          Cookie: Taro.getStorageSync('cookie'),
        },
        success: (res) => {
          const data = JSON.parse(res.data)
          if (data.success && onChange) {
            onChange({
              key: name,
              value: data.attributes.value
            })
          }
        }
      })
    }else if(operationType === 'remove'){
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
    // console.dir(operationType)
    // console.dir(index)
    // console.dir(fileList)
    // setFile(fileList)

  }
  return (
    <View className={`image-picker ${error? 'error-image-picker': ''}`}>
      <AtImagePicker
        files={files}
        multiple={multiple||false}
        count={count || 1}
        length={length || 1}
        sourceType={['album', 'camera']}
        showAddBtn={files&&files.length>0?false:true}
        onChange={onChangeImage}
      />
      <View className="lable">
        {
          required&& <Text className="required-icon">*</Text>
        }
        <Text>{label}</Text>
      </View>
    </View>
  )
}
export default ImagePicker;