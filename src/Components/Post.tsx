import Link from "next/link";
import Image from "next/image";
import InteractionTab from "./InteractionTab";
import { useAppContext } from "@/context/Context";

interface PostProps {
    post: any;
    loggedIn: boolean;
}

export default function Post({ post }: PostProps) {

    return (
        <div className="my-2 w-full">
            <div className="bg-zinc-700 p-4 rounded-t-2xl flex flex-col">
                <Link href={`/fullpost/${post.id}`}>
                    <h1 className="post-title text-3xl font-semibold hover:text-cyan-500 cursor-pointer mb-1">
                        {post.title}
                    </h1>
                    <p className="text-gray-300">Posted by: {post.user}</p>
                </Link>
                {post.text && <p className="text-xl mt-4">{post.text}</p>}
                {post.img && (
                    <div className="flex justify-center w-3/4 bg-zinc-800 py-4 rounded-xl mt-4 m-auto">
                        <Image className="w-96 rounded" width={40} height={40} src={post.img} alt="post image" />
                    </div>
                )}
                {post.link && (
                    <div className="mt-4">
                        <a className="hover:text-cyan-500 bg-zinc-600 p-2 rounded-3xl" href={post.link}><i className="fa-solid fa-link mx-2"></i>Click Link</a>
                    </div>
                )}
            </div>
            <InteractionTab post={post}/>
        </div>
    );
}
