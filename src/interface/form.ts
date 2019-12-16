export type RulesProps = {
  required?: boolean;
  pattern?: RegExp;
  message?: string;
}

export type FormProps = {
  type: string;   //组件类型 
  name: string;   //表单name
  rules: Array<RulesProps>;  //校验规则
  value: string; 
  label: string;
  trigger: string;
}