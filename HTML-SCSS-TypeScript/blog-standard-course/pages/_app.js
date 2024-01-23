import "../styles/globals.css";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { Bebas_Neue, Fira_Code } from "@next/font/google";

const bebasNeue = Bebas_Neue({
    weight: ["400"],
    subsets: ["latin"],
    variable: "--font-bebas-neue",
});

const fira_code = Fira_Code({
    weight: ["300", "400", "500", "600", "700"],
    subsets: ["latin"],
    variable: "--font-fira-code",
});

function MyApp({ Component, pageProps }) {
    const getLayout = Component.getLayout || ((page) => page);

    return (
        <UserProvider>
            <main
                className={`${bebasNeue.variable} ${fira_code.variable} font-body text-sm`}
            >
                {getLayout(<Component {...pageProps} />, pageProps)}
            </main>
        </UserProvider>
    );
}

export default MyApp;
