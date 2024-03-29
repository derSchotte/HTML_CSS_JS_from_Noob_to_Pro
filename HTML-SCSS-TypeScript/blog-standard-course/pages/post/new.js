import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import AppLayout from "../../components/AppLayout/AppLayout";
import { useState } from "react";

export default function NewPost(props) {
    console.log("NewPost props", props);

    const [topic, setTopic] = useState("");
    const [keywords, setKeywords] = useState("");
    const [postContent, setPostContent] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch("/api/generatePost", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ topic, keywords }),
        });

        const json = await response.json();

        console.log("RESULT: ", json.post.postContent);

        setPostContent(json.post.postContent);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        <strong>Generate a blog post on the topic of:</strong>
                    </label>
                    <textarea
                        className="resize-none border border-slate-500 w-full block my-2 py-4 px-2 rounded-md"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                    />
                </div>
                <div>
                    <label>
                        <strong>Targeting the following keywords:</strong>
                    </label>
                    <textarea
                        className="resize-none border border-slate-500 w-full block my-2 py-4 px-2 rounded-md"
                        value={keywords}
                        onChange={(e) => setKeywords(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn">
                    Generate
                </button>
            </form>

            <div
                className="max-w-sceen-sm p-10"
                dangerouslySetInnerHTML={{ __html: postContent }}
            ></div>
        </div>
    );
}

NewPost.getLayout = function getLayout(page, pageProps) {
    return <AppLayout {...pageProps}>{page}</AppLayout>;
};

export const getServerSideProps = withPageAuthRequired(() => {
    return {
        props: {},
    };
});
