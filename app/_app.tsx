import { CartProvider } from '../context/CartContext'; // Adjust path as necessary
import '../styles/globals.css'; // Import your global styles

function MyApp({ Component, pageProps }) {
  return (
    <CartProvider>
      <Component {...pageProps} />
    </CartProvider>
  );
}

export default MyApp;
