"use client";

import { useState, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAppContext } from "../../context/Context";

const buttonStyle = "px-10 py-4 hover:bg-zinc-600 rounded-xl text-xl";
const iconStyle = "mx-2";

export default function NewPost() {
    const [postType, setPostType] = useState<"text" | "image" | "link">("text");
    const [textBody, setTextBody] = useState<string>("");
    const [titleBody, setTitleBody] = useState<string>("");
    const [imgPreview, setImgPreview] = useState<string | null>(null);
    const [caption, setCaption] = useState<string>("");
    const [postLink, setPostLink] = useState<string>("");

    const { updatePostDB, userName } = useAppContext();
    const router = useRouter();

    const createNewPost = useCallback(
        (title: string, text: string, img: string | null, postLink: string, postType: "text" | "image" | "link") => {
            console.log("Submitting post...");
            const newPost = {
                id: uuidv4(),
                user: userName,
                title: title,
                likes: 0,
                dislikes: 0,
                comments: [],
                text: postType === "text" || postType == "link" ? text : "",
                img: postType === "image" ? img : "",
                caption: postType === "image" ? caption : "",
                link: postType === "link" ? postLink : ""
            };

            console.log(postLink);
            console.log("New post object:", newPost);
            updatePostDB(newPost);

            router.push('/');
        },
        [updatePostDB, router, caption, userName]
    );

    const handleImagePreview = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImgPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    }, []);

    return (
        <div className="flex flex-col justify-center m-auto items-center mt-8">
            <h1 className="text-2xl my-6">New Post</h1>
            <PostType setPostType={setPostType} />
            <PostBody
                postType={postType}
                setTextBody={setTextBody}
                imgPreview={imgPreview}
                handleImagePreview={handleImagePreview}
                setTitleBody={setTitleBody}
                setCaption={setCaption}
                setPostLink={setPostLink}
            />
            <SubmitPost
                titleBody={titleBody}
                textBody={textBody}
                imgPreview={imgPreview}
                postType={postType}
                postLink={postLink}
                handleSubmit={createNewPost}
            />
        </div>
    );
}

interface PostTypeProps {
    setPostType: React.Dispatch<React.SetStateAction<"text" | "image" | "link">>;
}

function PostType({ setPostType }: PostTypeProps) {
    return (
        <div className="bg-zinc-700 rounded-xl">
            <button onClick={() => setPostType("text")} className={buttonStyle}>
                <i className={`fa-solid fa-font ${iconStyle}`}></i>Text
            </button>
            <button onClick={() => setPostType("image")} className={buttonStyle}>
                <i className={`fa-solid fa-image ${iconStyle}`}></i>Image
            </button>
            <button onClick={() => setPostType("link")} className={buttonStyle}>
                <i className={`fa-solid fa-link ${iconStyle}`}></i>Link
            </button>
        </div>
    );
}

interface PostBodyProps {
    postType: "text" | "image" | "link";
    setTextBody: React.Dispatch<React.SetStateAction<string>>;
    imgPreview: string | null;
    handleImagePreview: (e: React.ChangeEvent<HTMLInputElement>) => void;
    setTitleBody: React.Dispatch<React.SetStateAction<string>>;
    setCaption: React.Dispatch<React.SetStateAction<string>>;
    setPostLink: React.Dispatch<React.SetStateAction<string>>;
}

function PostBody({ postType, setTextBody, imgPreview, handleImagePreview, setTitleBody, setCaption, setPostLink }: PostBodyProps) {
    return (
        <div className="mt-4">
            <div className="flex flex-col justify-center items-center">
                <h1 className="text-xl">Post Title</h1>
                <input
                    type="text"
                    className="my-4 w-full rounded bg-zinc-700 h-8 font-bold p-1"
                    onChange={(e) => setTitleBody(e.target.value)}
                />
            </div>
            {postType === "text" ? (
                <div className="flex flex-col justify-center items-center">
                    <h2 className="text-lg mb-4">Post Body</h2>
                    <textarea
                        cols={60}
                        rows={5}
                        className="bg-zinc-700 rounded resize-none p-1 overflow-y-scroll no-scrollbar"
                        onChange={(e) => setTextBody(e.target.value)}
                    />
                </div>
            ) : postType === "image" ? (
                <div className="flex flex-col items-center justify-center text-center">
                    {imgPreview && (
                        <Image
                            src={imgPreview}
                            className="mt-4 rounded w-56"
                            width={40}
                            height={40}
                            style={{ maxWidth: "85%", maxHeight: "400px" }}
                            alt="Post Image"
                        />
                    )}
                    <p>Upload an image</p>
                    <input
                        type="file"
                        id="img"
                        name="img"
                        accept="image/*"
                        onChange={handleImagePreview}
                    />
                    <p>Image Caption (max: 50)</p>
                    <input
                        type="text"
                        className="my-4 w-full rounded bg-zinc-700 h-8 p-1"
                        id="img-caption"
                        name="img-caption"
                        maxLength={50}
                        onChange={(e) => setCaption(e.target.value)}
                    />
                </div>
            )
                :
                <div className="flex flex-col items-center justify-center text-center">
                    <p>URL</p>
                    <input
                        type="url"
                        className="my-4 w-full rounded bg-zinc-700 h-8 p-1"
                        id="post-link"
                        name="post-link"
                        onChange={(e) => setPostLink(e.target.value)}
                    />
                    <h2 className="text-lg mb-4">Post Body (max: 100)</h2>
                    <textarea
                        cols={60}
                        rows={5}
                        maxLength={100}
                        className="bg-zinc-700 rounded resize-none p-1 overflow-y-scroll no-scrollbar"
                        onChange={(e) => setTextBody(e.target.value)}
                    />
                </div>
            }
        </div>
    );
}

interface SubmitPostProps {
    titleBody: string;
    textBody: string;
    imgPreview: string | null;
    postType: "text" | "image" | "link";
    postLink: string;
    handleSubmit: (title: string, text: string, img: string | null, postLink: string, postType: "text" | "image" | "link") => void;
}

function SubmitPost({ titleBody, textBody, imgPreview, postType, postLink, handleSubmit }: SubmitPostProps) {
    return (
        <div className="mt-4">
            <button
                className="bg-cyan-500 hover:bg-cyan-600 p-2 rounded text-xl"
                onClick={() => handleSubmit(titleBody, textBody, imgPreview, postLink, postType)}
            >
                Submit
            </button>
        </div>
    );
}
