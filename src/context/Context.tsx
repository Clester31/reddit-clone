"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";

type Post = {
    id: string;
    title: string;
    text?: string;
    img?: string;
    likes: number;
    dislikes: number;
    comments: any[];
};

type Comment = {
    text: string;
    user: string;
};

const AppContext = createContext<any>(null);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
    const [postDB, setPostDB] = useState<Post[]>(() => {
        const savedPosts = localStorage.getItem('postDB');
        return savedPosts ? JSON.parse(savedPosts) : [];
    });
    const [currentUser, setCurrentUser] = useState<string | null>("");
    const [loggedIn, setLoggedIn] = useState<boolean>(false);

    const [totalLikedPosts, setTotalLikedPosts] = useState<string[]>(() => {
        const likedPosts = localStorage.getItem('totalLikedPosts');
        return likedPosts ? JSON.parse(likedPosts) : [];
    });
    const [totalDislikedPosts, setTotalDislikedPosts] = useState<string[]>(() => {
        const dislikedPosts = localStorage.getItem('totalDislikedPosts');
        return dislikedPosts ? JSON.parse(dislikedPosts) : [];
    });

    const { user } = useUser();

    const [userName, setUsername] = useState<string | null>('');

    useEffect(() => {
        if (user) {
            const savedUsername = localStorage.getItem('username');
            if (savedUsername) {
                setUsername(savedUsername);
            } else {
                const newUsername = `${user.firstName}${Math.floor(Math.random() * 999) + 100}`;
                setUsername(newUsername);
                localStorage.setItem('username', newUsername);
            }
            setLoggedIn(true);
        }
    }, [user]);

    useEffect(() => {
        localStorage.setItem('postDB', JSON.stringify(postDB));
    }, [postDB]);

    useEffect(() => {
        localStorage.setItem('totalLikedPosts', JSON.stringify(totalLikedPosts));
    }, [totalLikedPosts]);

    useEffect(() => {
        localStorage.setItem('totalDislikedPosts', JSON.stringify(totalDislikedPosts));
    }, [totalDislikedPosts]);

    const updatePostDB = (post: Post) => {
        setPostDB((prev) => [...prev, post]);
    };

    const getPostById = (id: string) => {
        return postDB.find(post => post.id === id) || null;
    };

    const updatePostLikes = (postId: string, likeType: "like" | "dislike") => {
        setPostDB((prev) =>
            prev.map((item) => {
                if (item.id === postId) {
                    if (likeType === "like") {
                        setTotalLikedPosts((prev) => [...prev, postId]);
                        return { ...item, likes: item.likes + 1 };
                    } else {
                        setTotalDislikedPosts((prev) => [...prev, postId]);
                        return { ...item, dislikes: item.dislikes + 1 };
                    }
                }
                return item;
            })
        );
    };

    const removePostLikes = (postId: string, likeType: "like" | "dislike") => {
        setPostDB((prev) =>
            prev.map((item) => {
                if (item.id === postId) {
                    if (likeType === "like") {
                        setTotalLikedPosts((prev) => prev.filter((id) => id !== postId));
                        return { ...item, likes: Math.max(item.likes - 1, 0) };
                    } else if (likeType === "dislike") {
                        setTotalDislikedPosts((prev) => prev.filter((id) => id !== postId));
                        return { ...item, dislikes: Math.max(item.dislikes - 1, 0) };
                    }
                }
                return item;
            })
        );
    };

    const updateAccountInfo = (userName: string) => {
        setUsername(userName);
    }

    const updatePostComments = (postId: string, newComment: Comment) => {
        setPostDB((prev) =>
            prev.map((post) => {
                if (post.id === postId) {
                    return {
                        ...post,
                        comments: [...post.comments, newComment],
                    };
                }
                return post;
            })
        );
    };

    return (
        <AppContext.Provider value={{ updatePostDB, getPostById, postDB, currentUser, loggedIn, updatePostLikes, totalLikedPosts, totalDislikedPosts, removePostLikes, userName, updateAccountInfo, updatePostComments }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    return useContext(AppContext);
};
