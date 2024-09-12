"use client"

import Post from '../Components/Post';
import { useAppContext } from "../context/Context";

export default function Home() {
    const { postDB } = useAppContext();
    return (
        <div className='w-3/5 flex flex-col items-center justify-center m-auto'>
            {postDB.map((item, idx) => {
                return (
                    <Post key={idx} post={item}/>
                )
            })}
        </div>
    )
}