import Taro, { useState } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { AtImagePicker } from 'taro-ui'
import './index.scss'
type IFiles = {
  url?: string;
  name?: string;
}
type IProps = {
  onChange?:(value)=>void;
  label?: string;
  error?: boolean;
  files?: Array<IFiles>
}
const ImagePicker: Taro.FC<IProps> = (props: IProps) => {
  const { label, error, files } = props||{ files:[] };
  const [file, setFile] = useState(files)
  const onChangeImage = (fileList) => {
    setFile(fileList)
    
  }
  return (
    <View className={`image-picker ${error? 'error-image-picker': ''}`}>
      <AtImagePicker
        files={file}
        multiple={false}
        count={1}
        length={1}
        showAddBtn={file&&file.length>0?false:true}
        onChange={onChangeImage}
      />
      <View>
        <Text>{label}</Text>
      </View>
    </View>
  )
}
export default ImagePicker;