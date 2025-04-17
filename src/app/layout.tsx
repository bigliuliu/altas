import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/utils/SessionProvider";
import { getServerSession } from "next-auth";
import { AppProvider } from "@/context/AppContext";
import { Provider } from "@/utils/Provider";
const inter = Inter({ subsets: ["latin"] });
import localFont from "next/font/local";
import { constructMetadata } from "@/lib/utils";
import "react-day-picker/dist/style.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Toaster } from "@/components/ui/toaster";
import { Plus_Jakarta_Sans } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
export const metadata = constructMetadata();

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-plus-jakarta",
  display: "swap",
});
const clashDisplay = localFont({
  src: [
    {
      path: "../../public/fonts/ClashDisplay-Extralight.otf",
      weight: "200",
    },
    {
      path: "../../public/fonts/ClashDisplay-Light.otf",
      weight: "300",
    },
    {
      path: "../../public/fonts/ClashDisplay-Regular.otf",
      weight: "400",
    },
    {
      path: "../../public/fonts/ClashDisplay-Medium.otf",
      weight: "500",
    },
    {
      path: "../../public/fonts/ClashDisplay-Semibold.otf",
      weight: "600",
    },
    {
      path: "../../public/fonts/ClashDisplay-Bold.otf",
      weight: "700",
    },
  ],
  variable: "--font-clashDisplay",
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${GeistSans.variable} ${GeistMono.variable}`}
    >
      <body>
        <Provider>
          <AuthProvider session={session}>
            <AppProvider>
              <div className="fixed top-0 left-0 right-0 z-50 bg-white">
                <Navbar />
              </div>
              <main className="pt-16">{children}</main>
              <Footer />
            </AppProvider>
          </AuthProvider>
        </Provider>
        <Toaster />
      </body>
      <GoogleAnalytics gaId="G-7G25SG7XWS" />
    </html>
  );
}
