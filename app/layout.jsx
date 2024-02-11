import "./globals.css";
import { Providers } from "./providers";
import { Layout } from "@/components/layout/Layout";
import ReduxProvider from "@/provider/redux/ReduxProvider";

export const metadata = {
  metadataBase: new URL("https://hackingly.in"),
  title: "Hackingly",
  description: "Connecting you to your dream career",
};

export default function RootLayout({ children }) {
  return (
    <ReduxProvider>
      <html lang="en">
        <head />
        <body>
          <Providers>
            <Layout>{children}</Layout>
          </Providers>
        </body>
      </html>
    </ReduxProvider>
  );
}
