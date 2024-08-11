import { CMaterialType } from '@chamn/model';
import { snippets, snippetsGridItem } from './snippets';
import { LayoutWrap } from './edit/layoutWrap';
import { useEffect, useState } from 'react';
import { EnginContext } from '@chamn/engine';
import { DesignerPluginInstance } from '@chamn/engine/dist/plugins/Designer/type';

export const ReactGridLayoutMeta: CMaterialType = {
  componentName: 'ReactGridLayout',
  title: '高级布局',
  props: [],
  isContainer: true,
  npm: {
    name: 'ReactGridLayout',
    package: __PACKAGE_NAME__ || '',
    version: __PACKAGE_VERSION__,
    destructuring: true,
    exportName: 'ReactGridLayout',
  },
  snippets: snippets,
  advanceCustom: {
    wrapComponent: (Comp, options) => {
      return (props: any) => {
        const [iframeWindow, setIframeWindow] = useState();
        useEffect(() => {
          const ctx: EnginContext = options.ctx;
          ctx.pluginManager
            .onPluginReadyOk('Designer')
            .then((ins: DesignerPluginInstance) => {
              const win = ins.export.getDesignerWindow();
              setIframeWindow(win as any);
            });
        }, []);

        if (!iframeWindow) {
          return <></>;
        }

        return (
          <LayoutWrap
            {...props}
            {...options}
            targetComp={Comp}
            subWin={iframeWindow}
          />
        );
      };
    },
  },
};

export const ReactGridItemMeta: CMaterialType = {
  componentName: 'GridItem',
  title: '高级布局容器',
  props: [],
  isContainer: true,
  npm: {
    name: 'GridItem',
    package: __PACKAGE_NAME__ || '',
    version: __PACKAGE_VERSION__,
    destructuring: true,
    exportName: 'GridItem',
  },
  disableEditorDragDom: true,

  advanceCustom: {
    onDragStart: async () => {
      return false;
    },
    wrapComponent: (Comp, options) => {
      return (props: any) => {
        return <Comp {...props} {...options} />;
      };
    },
  },
  snippets: snippetsGridItem,
};

export default [ReactGridLayoutMeta, ReactGridItemMeta];

export type A = string;
