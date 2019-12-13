import Taro from '@tarojs/taro';
export const FromContext  = Taro.createContext({
  label: '', 
  name: '',
  rules: [],
  trigger: 'onChange',
  initialValue: '',
  validateStatus: '',
  required: true
} as ContentProps)
export type RulesProps = {
  required?: boolean;
  type?: string;
  pattern?: RegExp;
  min?: number;
  max?: number;
  len?: number;
  message?: string;
}
export type ContentProps = {
  label?: string;
  name?: string;
  rules?: Array<RulesProps>;
  trigger?: string;
  initialValue?: any;
  validateStatus?: string;
  required?: boolean;
  validateTrigger?: string;
  onChange?: (val) => void;
  error?: boolean;
}