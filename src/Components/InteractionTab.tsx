import { useAppContext } from "@/context/Context";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

interface PostProps {
    post: any;
}

export default function InteractionTab({ post }: PostProps) {
    const { loggedIn, updatePostLikes, totalLikedPosts, totalDislikedPosts, removePostLikes, postDB } = useAppContext();
    const [likes, setLikes] = useState<number>(post.likes);
    const [dislikes, setDislikes] = useState<number>(post.dislikes);
    const [likedPosts, setLikedPosts] = useState<string[]>(totalLikedPosts);
    const [dislikedPosts, setDislikedPosts] = useState<string[]>(totalDislikedPosts);

    const router = useRouter();

    useEffect(() => {
        const updatedPost = postDB.find((p:any) => p.id === post.id);
        if (updatedPost) {
            setLikes(updatedPost.likes);
            setDislikes(updatedPost.dislikes);
        }
    }, [postDB, post.id]); 

    const handleUpdatePostLikes = (likeType: string) => {
        if (loggedIn) {
            const isPostLiked = likedPosts.includes(post.id);
            const isPostDisliked = dislikedPosts.includes(post.id);
    
            if (likeType === "like") {
                if (!isPostLiked) {
                    console.log("liked");
                    updatePostLikes(post.id, "like");
                    setLikedPosts((prev) => [...prev, post.id]);
    
                    if (isPostDisliked) {
                        console.log("post was previously disliked.");
                        removePostLikes(post.id, "dislike");
                        setDislikedPosts((prev) => prev.filter((p) => p !== post.id));
                    }
                } else {
                    console.log("You have already liked this post");
                }
            } else if (likeType === "dislike") {
                if (!isPostDisliked) {
                    console.log("disliked");
                    updatePostLikes(post.id, "dislike");
                    setDislikedPosts((prev) => [...prev, post.id]);
    
                    if (isPostLiked) {
                        console.log("post was previously liked");
                        removePostLikes(post.id, "like");
                        setLikedPosts((prev) => prev.filter((p) => p !== post.id));
                    }
                } else {
                    console.log("You have already disliked this post");
                }
            }
        } else {
            console.log("You must log in to like, dislike, or comment on posts");
        }
    };

    useEffect(() => {
        console.log("liked posts: ", likedPosts);
        console.log("disliked posts: ", dislikedPosts);
    }, [likes, dislikes, likedPosts, dislikedPosts]);

    return (
        <div className="bg-zinc-600 flex flex-row justify-between p-2 rounded-b-2xl text-2xl">
            <div className="flex items-center mx-2">
                <div className="flex flex-row items-center text-center">
                    <i 
                    onClick={() => handleUpdatePostLikes("like")}
                    className={loggedIn ?
                        `fa-solid fa-thumbs-up hover:text-green-400 mx-2`
                        :
                        `fa-solid fa-thumbs-up text-gray-400 mx-2`
                    }></i>
                    <p>{likes}</p>
                </div>
                <div className="flex flex-row items-center text-center mx-2">
                    <i 
                    onClick={() => handleUpdatePostLikes("dislike")}
                    className={loggedIn ?
                        `fa-solid fa-thumbs-down hover:text-red-400 mx-2`
                        :
                        `fa-solid fa-thumbs-down text-gray-400 mx-2`
                    }></i>
                    <p>{dislikes}</p>
                </div>
            </div>
            <div className="flex flex-row items-center mx-2">
                <i 
                onClick={() => router.push(`/fullpost/${post.id}`)}
                className={loggedIn ?
                    `fa-solid fa-comment hover:text-purple-400 mx-2`
                    :
                    `fa-solid fa-comment text-gray-400 mx-2`
                }></i>
                <p>{post.comments.length}</p>
            </div>
        </div>
    );
}
