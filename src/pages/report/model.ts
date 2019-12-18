
import { fromJS } from 'immutable';

export type StepsProps = {
  title: string;
  desc: string;
}
export interface InitStateProps  {
  steps: Array<StepsProps>;
}
const initState:InitStateProps = {
  steps: [{
    title: '步骤一',
    desc: '',
  },{
    title: '步骤二',
    desc: '',
  },{
    title: '步骤三',
    desc: '',
  }],
}
export default {
  namespace: 'report ',
  state: fromJS(initState).toJS(),
  effects: {

  },
  reducers: {
   
  },
};
