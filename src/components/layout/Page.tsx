import Header from './Header';
import Footer from './Footer';

interface PageProps {
    children: React.ReactNode;
}

export const Page = ({ children }: PageProps) => (
    <>
        <Header />
        <main>{children}</main>
        <Footer />
    </>
);