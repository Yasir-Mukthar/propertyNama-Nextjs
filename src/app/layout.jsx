import "@/assests/styles/globals.css"
import AuthProvider from "@/components/AuthProvider";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { ToastContainer } from 'react-toastify';



export const metadata ={
    title: "Property",
    description: "Property management",
    keywords: "property, management, real estate",
}

const MainLayout = ({children}) => {
  return (
  <AuthProvider>
      <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <ToastContainer />
      </body>
    </html>
  </AuthProvider>
  );
};

export default MainLayout;
