import { CMaterialType } from '@chamn/model';
import { snippets } from './snippets';

export const ButtonMeta: CMaterialType = {
  componentName: 'Button',
  title: '按钮',
  props: [],
  npm: {
    name: 'Button',
    package: __PACKAGE_NAME__ || '',
    version: __PACKAGE_VERSION__,
    destructuring: true,
    exportName: 'Button',
  },
  snippets: snippets,
};

export default [ButtonMeta];

export type A = string;
