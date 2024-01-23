import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import AppLayout from "../components/AppLayout/AppLayout";

export default function TokenTopup() {
    const handleClick = async () => {
        const response = await fetch("/api/addTokens", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({}),
        });

        const { error } = await response.json();

        if (error) {
            console.error(error);
        }
    };
    return (
        <div>
            <h1>Home of token-topup</h1>
            <button className="btn" onClick={handleClick}>
                Add tokens
            </button>
        </div>
    );
}

TokenTopup.getLayout = function getLayout(page, pageProps) {
    return <AppLayout {...pageProps}>{page}</AppLayout>;
};

export const getServerSideProps = withPageAuthRequired(() => {
    return {
        props: {},
    };
});
