'use client'
import { signIn } from "next-auth/react";
export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main>
        <button className="bg-blue-300 text-zinc-950 p-3 rounded-xl"
          onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
        >
          Sign in with Google
        </button>
      </main>
    </div>
  );
}
