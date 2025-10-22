import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import startOrb from './assets/start-orb.png';
import { SpeedInsights } from "@vercel/speed-insights/react"

// Ensure the tab title shows as requested
if (document.title !== 'Bindows.exe') {
  document.title = 'Bindows.exe';
}

// Dynamically set favicon to the Windows orb from bundled assets
(function setFavicon() {
  try {
    const linkId = 'favicon';
    let link = document.getElementById(linkId);
    if (!link) {
      link = document.createElement('link');
      link.id = linkId;
      link.rel = 'icon';
      document.head.appendChild(link);
    }
    link.type = 'image/png';
    link.href = startOrb; // Webpack/CRA will emit this asset and provide the correct URL
  } catch (e) {
    // no-op
  }
})();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
