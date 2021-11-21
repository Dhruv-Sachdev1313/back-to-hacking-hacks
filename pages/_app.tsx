import 'tailwindcss/tailwind.css'
import type { AppProps } from 'next/app'
import AuthProvider from './hooks/useAuth'
import FirestoreProvider from './hooks/useFirestore'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <FirestoreProvider>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </FirestoreProvider>
    
  )
}

export default MyApp
