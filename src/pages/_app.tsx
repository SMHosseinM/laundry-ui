import type { AppProps } from 'next/app';
import 'bootstrap/dist/css/bootstrap.css';
import { useEffect } from 'react';
import './global.css'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
