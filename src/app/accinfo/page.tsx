"use client";

import { useState } from "react";
import { useAppContext } from "../../context/Context";
import { useRouter } from "next/navigation";

export default function AccInfo() {
    const { userName, updateAccountInfo } = useAppContext();
    const router = useRouter();

    const [newUserName, setNewUserName] = useState<string>(userName);

    const handleUpdateUsername = () => {
        updateAccountInfo(newUserName);
        router.push('/');
    };

    return (
        <div className="flex flex-col items-center mt-10 bg-zinc-700 p-4 w-2/5 m-auto rounded-xl">
            <h1 className="text-2xl mb-4">Account Info</h1>
            <div>
                <label htmlFor="changeUserName" className="mx-2">Change Username</label>
                <input
                    type="text"
                    name="changeUserName"
                    className="rounded bg-zinc-600 p-1 mx-2"
                    value={newUserName}
                    onChange={(e) => setNewUserName(e.target.value)}
                    placeholder={`${userName}`}
                />
            </div>
            <button
                className="bg-cyan-500 hover:bg-cyan-600 p-2 rounded text-xl mt-4 w-1/4"
                onClick={handleUpdateUsername}
            >
                Save
            </button>
        </div>
    );
}
