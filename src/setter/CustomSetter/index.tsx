import { ConfigProvider, Switch } from 'antd';
import { CSetter, CSetterProps } from '@chamn/engine';

type CustomSetterProps = {
  a?: string;
};

export const CustomSetter: CSetter<CustomSetterProps> = ({
  onValueChange,
  setterContext,
  ...props
}: CSetterProps<CustomSetterProps>) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          borderRadius: 4,
        },
      }}
    >
      <Switch
        {...props}
        checked={props.value as boolean}
        onChange={(open, e) => {
          onValueChange?.(open);
        }}
      />
    </ConfigProvider>
  );
};

CustomSetter.setterName = '自定义设置器';
