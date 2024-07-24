import '@/assets/styles/globals.css';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import AuthProvider from '@/components/AuthProvider';

export const metadata = {
    title: 'Stardrop',
    description: 'Help you to create character for the Stardew Valley game'
}
const MainLayout = ({children}) => {
  return (
    <AuthProvider>
    <html lang='en'>
        <body>
            <Navbar />
            <div>{children}</div>
            <Footer />
        </body>
     </html>
     </AuthProvider>
  );
};

export default MainLayout;
