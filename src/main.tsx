import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {Provider} from "react-redux";
import {store} from "./store";

async function enableMocking() {
  // Использовать моки при dev режиме
  // if (process.env.NODE_ENV !== 'development') {
  //   return
  // }
  if (import.meta.env.VITE_ENABLE_MSW !== 'TRUE') {
    return
  }
  const { worker } = await import('./mocks/browser')
  return worker.start()
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>,
    </React.StrictMode>,
  )
})