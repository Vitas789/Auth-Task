import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { CookiesProvider } from 'react-cookie';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <CookiesProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </CookiesProvider>,
  document.getElementById('root')
);

reportWebVitals();
