import ReactDOMClient from 'react-dom/client';
import { Editor } from './editor';
import './index.scss';

const App = () => {
  return <Editor />;
};
ReactDOMClient.createRoot(
  document.getElementById('root') as HTMLElement
).render(<App />);
console.log(__PACKAGE_VERSION__);
export default App;
