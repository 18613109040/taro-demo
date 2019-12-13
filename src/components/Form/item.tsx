import Taro, { useState } from '@tarojs/taro';
import { View, Text } from '@tarojs/components'
import { FromContext, ContentProps } from './context';
import './index.scss'
const Item: Taro.FC<ContentProps> = (props: ContentProps) => {
  const { rules, name } = props;
  const [ errorIndex, setErrorIndex ] = useState<number>(-1)
  const [ state, setState ] = useState<{[key:string]: any}>({})
  const onChange = (val)=> {
    const findIndex = rules.findIndex(rule=>{
      return rule.required && !val.match(rule.pattern) 
    })
    state[`${name}`] = val;
    setState(state)
    console.dir(state)
    setErrorIndex(findIndex)
  }
  return (
    <FromContext.Provider 
      value={{
        onChange:onChange,
        error:errorIndex>=0?true:false,
        ...props
      }}
    >
      <View>
        { this.props.children }
        { errorIndex>=0?<Text className="error-msg">{rules[errorIndex].message}</Text>: ''}
      </View>
      
    </FromContext.Provider>
  )
}

export default Item