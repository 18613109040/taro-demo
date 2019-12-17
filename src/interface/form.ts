export type RulesProps = {
  required?: boolean;
  pattern?: RegExp;
  message?: string;
}
export type  ChildrenProps = {
  type: string;   //组件类型 
  name: string;   //表单name
  rules: Array<RulesProps>;  //校验规则
  value: any;
  defaultValue: string;
  label: string;
  trigger: string;
  error?: boolean;
}
export type FormProps = {
  key: number;
  children: Array<ChildrenProps>;
}