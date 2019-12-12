import Taro  from '@tarojs/taro';
import { View, Icon, Text } from '@tarojs/components';
import './index.scss';
type StepDataProprs = {
  title: string;
}
type StepsProps  = {
  steps: Array<StepDataProprs>;
  current:number;
}

const Steps:  Taro.FC<StepsProps> = (props: StepsProps) =>{
  const { steps, current } = props;
  return (
    <View className='steps'>
      {
        steps.map((item,index)=>(
          <View className={index===0?'step-item':'step-b-item'} key={index}>
            { index!==0&&<View className={current>=index?'line-active':'line'}></View>}
            {
              current>index?<Icon className={index===0?'steps-item-icon':'steps-item-b-icon'} type='success'/>:
              <View className={current>=index&&index===0?'steps-active-d-number':current>=index?'steps-active-number':'steps-bg-number'}>
                <Text>{index+1}</Text>
              </View>
            }
            
            <View className={index===steps.length-1?'steps-item-b-text':'steps-item-text'}>
              <Text>{item.title}</Text>
            </View>
          </View>
        ))
      }
    </View>
  );
}
export default Steps;