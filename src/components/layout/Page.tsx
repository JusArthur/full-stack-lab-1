import Header from './Header';
import Footer from './Footer';
import Navbar from './Navbar';

interface PageProps {
    children: React.ReactNode;
}

export const Page = ({ children }: PageProps) => (
    <>
        <Header />
        <Navbar />
        <main>{children}</main>
        <Footer />
    </>
);