"use client";

import { useEffect, useState } from "react";
import { useAppContext } from "@/context/Context";

interface PostProps {
    post: any;
}

export default function CommentSection({ post }: PostProps) {
    const { postDB, updatePostComments, userName } = useAppContext();
    const [commentText, setCommentText] = useState<string>("");
    const [allComments, setAllComments] = useState(post.comments);

    const handleCommentSubmission = () => {
        if (commentText.trim() === "") return;
        const newComment = { text: commentText, userName }; 
        updatePostComments(post.id, newComment);
        setAllComments((prev: any) => [...prev, newComment]); 
        setCommentText("");
    };

    useEffect(() => {
        console.log("New comment added:", allComments);
    }, [allComments]);

    return (
        <div>
            <p>Add a comment</p>
            <textarea
                rows={4}
                className="w-full bg-zinc-600 rounded resize-none p-1 overflow-y-scroll no-scrollbar"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
            />
            <button
                className="bg-cyan-500 hover:bg-cyan-600 p-1 rounded text-lg"
                onClick={handleCommentSubmission}
            >
                Submit
            </button>
            <div className="my-10">
                {allComments.map((comment: any, idx: number) => (
                    <div key={idx} className="border-b border-gray-700 py-2 bg-zinc-700 my-2 p-2 rounded">
                        <p><strong>{comment.userName}:</strong> {comment.text}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
