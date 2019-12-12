import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'

type PageState = {
}

class App extends Component<{}, PageState> {

  config: Config = {
    navigationBarTitleText: 'taro-music'
  }

  constructor (props) {
    super(props)
    this.state = {
    }
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount () { }

  componentDidShow () {
   }

  componentDidHide () { }


  render () {
    return (
      <View>
      </View>
    )
  }
}

// #region 导出注意
//
// 经过上面的声明后需要将导出的 Taro.Component 子类修改为子类本身的 props 属性
// 这样在使用这个子类时 Ts 才不会提示缺少 JSX 类型参数错误
//
// #endregion

export default App;