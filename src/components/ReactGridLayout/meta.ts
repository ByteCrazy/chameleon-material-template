import { CMaterialType } from '@chamn/model';
import { snippets } from './snippets';

export const ReactGridLayoutMeta: CMaterialType = {
  componentName: 'ReactGridLayout',
  title: '按钮',
  props: [],
  npm: {
    name: 'ReactGridLayout',
    package: __PACKAGE_NAME__ || '',
    version: __PACKAGE_VERSION__,
    destructuring: true,
    exportName: 'ReactGridLayout',
  },
  disableEditorDragDom: true,
  snippets: snippets,
};

export default [ReactGridLayoutMeta];

export type A = string;
