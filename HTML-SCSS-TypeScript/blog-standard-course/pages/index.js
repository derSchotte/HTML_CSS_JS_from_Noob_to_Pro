import Image from "next/image";
import HeroImage from "../public/hero.webp";
import { Logo } from "../components/Logo";
import Link from "next/link";

export default function Home() {
    return (
        <div className="w-screen h-screen overflow-hidden flex justify-center items-center relative">
            <Image src={HeroImage} alt="Hero" fill className="absolute" />
            <div className="relative z-10 text-white px-10 py-5 text-center max-w-screen-sm bg-slate-900/90 rounded-md backdrop-blur-sm">
                <Logo />
                <p className="leading-normal tracking-wider">
                    The AI-powered SAAS solution to generate SEO-optimized blog
                    posts in minutes. Get high-quality content for your blog,
                    website, or social media, without sacrificing your time.
                </p>
                <Link href="/post/new" className="btn pt-4 pb-3 mt-4">
                    Begin
                </Link>
            </div>
        </div>
    );
}
