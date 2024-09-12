"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useAppContext } from "../../../context/Context";
import InteractionTab from "@/Components/InteractionTab";
import CommentSection from "@/Components/CommentSection";

type Post = {
    id: string;
    user: string;
    title: string;
    text?: string;
    img?: string;
    likes: number;
    dislikes: number;
    comments: any[];
    caption: string;
    link: string;
};

export default function PostPage() {
    const { id } = useParams();
    const [post, setPost] = useState<Post | null>(null);
    const { getPostById, loggedIn } = useAppContext();

    useEffect(() => {
        if (id) {
            const fetchedPost = getPostById(id);
            if (fetchedPost) {
                setPost(fetchedPost);
            } else {
                console.error("Post not found");
            }
        }
    }, [id, getPostById]);

    if (!post) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="flex flex-col w-1/2 justify-center mt-10 bg-zinc-700 m-auto p-2 rounded-t-xl">
                <div className="rounded-xl bg-zinc-600 p-2 mb-2">
                    <h1 className="text-2xl font-semibold">{post.title}</h1>
                    <p className="text-gray-300">Posted by: {post.user}</p>
                </div>
                {post.text && <p className="p-2">{post.text}</p>}
                {post.img &&
                    <div>
                        <div className="flex mt-2 bg-zinc-800 w-4/5 m-auto justify-center flex flex-col">
                            <Image className="p-2 items-center m-auto" width={400} height={400} alt="post image" src={post.img} />
                            <p className="bg-zinc-900 p-2 text-gray-400 text-2xl">{post.caption}</p>
                        </div>
                    </div>
                }
                {post.link &&
                    <div>
                        <div className="my-2">
                            <a className="hover:text-cyan-500 bg-zinc-600 p-2 rounded-3xl" href={post.link}><i className="fa-solid fa-link mx-2"></i>Click Link</a>
                        </div>
                    </div>
                }
            </div>
            <div className="w-1/2 m-auto">
                <InteractionTab post={post}/>
            </div>
            <div className="w-1/2 m-auto mt-10">
                <CommentSection post={post}/>
            </div>
        </div>

    );
}
