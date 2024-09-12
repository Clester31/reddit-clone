export default function login() {
    return (
        <div>
            <LoginForm />
        </div>
    )
}

function LoginForm() {
    return (
        <div className="flex flex-col items-center mt-10 bg-zinc-700 w-1/2 p-2 m-auto">
            <h1 className="text-2xl">Login to your account</h1>
        </div>
    )
}