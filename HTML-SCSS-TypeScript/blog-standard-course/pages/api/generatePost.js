import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { Configuration, OpenAIApi } from "openai";
import clientPromise from "../../lib/mongodb";

export default withApiAuthRequired(async function handler(req, res) {
    const { user } = await getSession(req, res);
    const client = await clientPromise;
    const db = await client.db("BlogStandard-Tutorial");

    const userProfile = await db.collection("users").findOne({
        auth0Id: user.sub,
    });

    if (!userProfile?.availableTokens) {
        res.status(403);
        return;
    }

    const config = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    });

    const openai = new OpenAIApi(config);

    const { topic, keywords } = req.body;

    const language = "German";

    const postContentResponse = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        temperature: 0.2,
        messages: [
            {
                role: "system",
                content: "You are a blog post generator",
            },
            {
                role: "user",
                content: `Write a long and detailed SEO-friendly blog post in ${language} about ${topic}, that targets the following comma-separated keywords: ${keywords}.
                The content should be formatted in SEO-friendly HTML,
                limited to the following HTML tags: p, h1, h2, h3, h4, h5, h6, strong, em, ul, ol, li, i.`,
            },
        ],
    });

    const postContent =
        postContentResponse.data.choices[0]?.message?.content || "";

    const titleResponse = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        temperature: 0.2,
        messages: [
            {
                role: "system",
                content: "You are a blog post generator",
            },
            {
                role: "user",
                content: `Write a long and detailed SEO-friendly blog post in ${language} about ${topic}, that targets the following comma-separated keywords: ${keywords}.
                The content should be formatted in SEO-friendly HTML,
                limited to the following HTML tags: p, h1, h2, h3, h4, h5, h6, strong, em, ul, ol, li, i.`,
            },
            {
                role: "assistant",
                content: postContent,
            },
            {
                role: "user",
                content:
                    "Generate appropriate title tag text for the above blog post",
            },
        ],
    });

    const metaDescriptionResponse = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        temperature: 0.2,
        messages: [
            {
                role: "system",
                content: "You are a blog post generator",
            },
            {
                role: "user",
                content: `Write a long and detailed SEO-friendly blog post in ${language} about ${topic}, that targets the following comma-separated keywords: ${keywords}.
                The content should be formatted in SEO-friendly HTML,
                limited to the following HTML tags: p, h1, h2, h3, h4, h5, h6, strong, em, ul, ol, li, i.`,
            },
            {
                role: "assistant",
                content: postContent,
            },
            {
                role: "user",
                content:
                    "Generate SEO-friendly meta description content for the above blog post",
            },
        ],
    });

    const title = titleResponse.data.choices[0]?.message?.content || "";
    const metaDescription =
        metaDescriptionResponse.data.choices[0]?.message?.content || "";

    console.log("Post Content: ", postContent);
    console.log("Title: ", title);
    console.log("Meta Description: ", metaDescription);

    await db.collection("users").updateOne(
        {
            auth0Id: user.sub,
        },
        {
            $inc: { availableTokens: -1 },
        }
    );

    const post = await db.collection("posts").insertOne({
        postContent: postContent,
        title: title,
        metaDescription: metaDescription,
        topic: topic,
        keywords: keywords,
        userId: userProfile._id,
        createdAt: new Date(),
    });

    res.status(200).json({
        post: {
            postContent,
            title,
            metaDescription,
        },
    });
});
