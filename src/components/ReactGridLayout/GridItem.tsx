import { Button } from 'antd';
import { forwardRef, useContext, useEffect, useMemo, useRef } from 'react';

import { GridItemInstance } from './type';
import { CNode } from '@chamn/model';
import { GridContext } from './context';

export const GridItem = forwardRef<GridItemInstance, any>(
  (
    props: {
      children: any;
      w: number;
      h: number;
      x: number;
      y: number;
      node?: CNode;
    },
    ref
  ) => {
    const ctx = useContext(GridContext);
    const refDom = useRef<HTMLDivElement>(null);
    const id = useMemo(() => {
      return props?.node?.id || Math.random().toString(32).slice(3, 9);
    }, []);

    useEffect(() => {
      if (ctx.ready) {
        ctx.gridStack?.makeWidget(refDom.current!);
      }
    }, [ctx.ready]);

    if (!ctx.ready) {
      return <></>;
    }

    return (
      <div
        className="grid-stack-item"
        style={{
          overflow: 'hidden',
        }}
        ref={refDom}
        data-grid-id={id}
        gs-w={props.w}
        gs-h={props.h}
        gs-x={props.x}
        gs-y={props.y}
      >
        <div
          className="grid-stack-item-content"
          style={{
            border: '1px dashed gray',
            overflow: 'hidden',
          }}
        >
          {props.children}
        </div>
      </div>
    );
  }
);
