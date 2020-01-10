import Taro, { useState } from '@tarojs/taro';
import { View, Text, Image, Video } from '@tarojs/components';
import { AtIcon, AtActivityIndicator, AtModal, AtModalContent, AtModalAction, AtButton } from 'taro-ui'
import { baseUrl } from '../../config/index';
import Request from '../../utils/request';
import './index.scss'
type IFiles = {
  url?: string;
  name?: string;
  value?: string;
  image?: boolean;
  file?: boolean;
  video?: boolean;
  other?: boolean;
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
  isFile?: boolean;
}
const ImagePicker: Taro.FC<IProps> = (props: IProps) => {
  let { label = '', required, count = 1, files = [], orderId, name, onChange, disabled = false, isFile = false } = props;
  const [loadding, setLoadding] = useState(false)
  const [isShow, setIsShow] = useState(false)
  files.map(item => {
    const name = item.url.split('.').pop().toLowerCase()
    if (name === 'pdf' || name === 'doc' || name === 'docx' || name === 'xls' || name === 'xlsx' || name === 'ppt' || name === 'pptx' || name === 'pptx') {
      item.file = true
    } else if (name === 'mp4' || name === 'mov' || name === 'm4v' || name === '3gp' || name === 'avi' || name === 'm3u8' || name === 'webm') {
      item.video = true
    } else if (name === 'gif' || name === 'jpeg' || name === 'jpg' || name === 'png' ){
      item.image = true
    } else {
      item.other = true
    }
  })
  const onChangeImage = () => {
    if (loadding) return;
    Taro[isFile ? "chooseMessageFile" : "chooseImage"]({
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
                  value: data.attributes.value
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
      data: {
        id: orderId,
        name: files && files[index].name,
        filedName: name
      }
    }).then(res => {
      if (res.success && onChange) {
        onChange({
          key: name,
          value: res.attributes.value
        })
      }
    });
  }
  const showImageModal = () => {
    setIsShow(true)
  }
  const coloseModal = () => {
    setIsShow(false)
  }
  const preViewFile = (file) => {
    Taro.openDocument({
      filePath: file
    })
  }
  return (
    <View className="image-picker">
      {
        files.length == 0 ?
          <View className="col-line">
            <View className="add-image" onClick={onChangeImage}>
              {
                loadding ? <AtActivityIndicator size={32} /> : <AtIcon value='upload' prefixClass='iconfont' size='30' color='#d0d3d9'></AtIcon>
              }
            </View>
            <View className="lable">
              {
                required && <Text className="required-icon">*</Text>
              }
              <Text>{label}</Text>
            </View>
          </View> :
          count == 1 && files.length == 1 ?
            <View className="col-line">
              <View className="preview">
                {
                  files[0].image ? <Image src={`${baseUrl}/${files[0].url}`} className="image" /> :
                    files[0].file ? <View className="file-bm" onClick={() => preViewFile(`${baseUrl}/${files[0].url}`)}> <AtIcon value="file-generic" size="20" /></View> :
                      files[0].video ? <Video className="file-video" src={`${baseUrl}/${files[0].url}`} /> : 
                      <View className="other">
                        <AtIcon value="file-generic" size="20" />
                        <View className="other-name">{ files[0].name}</View>
                      </View>
                }

                {!disabled && <View className="close" onClick={() => colose(0)}>
                  <AtIcon value="close" size="20" prefixClass='iconfont' color="#38558E" />
                </View>}
              </View>
              <View className="lable">
                {
                  required && <Text className="required-icon">*</Text>
                }
                <Text>{label}</Text>
              </View>
            </View> :
            <View className="col-line">
              <View className="add-mul-image" onClick={showImageModal}>
                {files.map((item) =>
                  item.image ? <Image src={`${baseUrl}/${item.url}`} className="mut-image" /> :
                    item.file ? <View className="mut-file-bm"> <AtIcon value="file-generic" size="20" /></View> :
                      item.video ? <View className="mut-file-bm"> <AtIcon value="file-video" size="20" /></View> :
                      <View className="mut-file-bm"> <AtIcon value="file-generic" size="20" /></View> 

                )}
                {
                  count >= files.length ? <View className="upload-btn">
                    <AtIcon value='upload' prefixClass='iconfont' size='15' color='#d0d3d9'></AtIcon>
                  </View> : ''
                }
              </View>
              <View className="lable">
                {
                  required && <Text className="required-icon">*</Text>
                }
                <Text>{label}</Text>
              </View>
            </View>
      }
      <AtModal isOpened={isShow}>
        <AtModalContent>
          <View className="modal-content">

            {files.map((item) => (
              <View className="at-col">
                <View className="preview">
                  {
                    item.image ? <Image src={`${baseUrl}/${item.url}`} className="image" /> :
                      item.file ? <View className="file-bm" onClick={() => preViewFile(`${baseUrl}/${item.url}`)}> <AtIcon value="file-generic" size="20" /></View> :
                        item.video ? <Video className="file-video" src={`${baseUrl}/${item.url}`} /> : 
                        <View className="other">
                        <AtIcon value="file-generic" size="20" />
                          <View className="other-name">{ item.name}</View>
                        </View>
                  }
                  {!disabled && <View className="close" onClick={() => colose(0)}>
                    <AtIcon value="close" size="20" prefixClass='iconfont' color="#38558E" />
                  </View>}
                </View>
              </View>
            ))}
            <View className="at-col">
              <View className="add-image" onClick={onChangeImage}>
                {
                  loadding ? <AtActivityIndicator size={32} /> : <AtIcon value='upload' prefixClass='iconfont' size='30' color='#d0d3d9'></AtIcon>
                }
              </View>
            </View>
          </View>
        </AtModalContent>
        <AtModalAction>
          <View className="colose-footer">
            <AtButton onClick={coloseModal} type='primary' >关闭</AtButton>
          </View>
        </AtModalAction>
      </AtModal>
    </View>
  )

}
export default ImagePicker;