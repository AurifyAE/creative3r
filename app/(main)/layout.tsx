import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/layout/Footer";
import SplashProvider from "@/app/components/providers/SplashProvider";

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <SplashProvider>
                <Navbar />
                    <main className="grow">{children}</main>
                <Footer />
            </SplashProvider>
        </>
    );
}