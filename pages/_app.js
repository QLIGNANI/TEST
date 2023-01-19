import "../styles/globals.css"
import ContextProvider from "../components/ContextProvider.jsx"

function MyApp({ Component, pageProps }) {
  return (
    <ContextProvider>
      <Component {...pageProps} />
    </ContextProvider>
  )
}

export default MyApp
