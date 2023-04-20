import ReactDOMClient from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import './index.scss';
import { EnginContext } from '@chamn/engine';
import { DesignerExports } from '@chamn/engine/dist/plugins/Designer';

ReactDOMClient.createRoot(
  document.getElementById('root') as HTMLElement
).render(<RouterProvider router={router} />);

// !!! hot reload logic, dot delete it
if (import.meta.hot) {
  const storageKey = 'hot:currentSelectId';
  import.meta.hot.on('materialComponent:change', async (data) => {
    const ctx = (window as any).__CHAMELEON_ENG__ as EnginContext;
    const designer = await ctx.pluginManager.get('Designer');
    const reloadPage = async () => {
      setTimeout(() => {
        const designerExports = designer?.exports as DesignerExports;
        designerExports.reload();
      }, 0);
    };
    reloadPage();
  });
}
// !!! hot reload logic, dot delete it
