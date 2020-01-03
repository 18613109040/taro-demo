import Taro, { PureComponent, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'

type PageState = {
}

class App extends PureComponent<{}, PageState> {

  config: Config = {
    navigationBarTitleText: '威武融创'
  }

  constructor (props) {
    super(props)
    console.dir('app')
  }
  componentWillMount() {
    
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


export default App;