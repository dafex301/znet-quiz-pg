import { currentUser, SignOutButton } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs/app-beta";
import Link from "next/link";

export default async function Home() {
  const user = await currentUser();
  let fullname = "Guest";

  if (user) {
    const { firstName, lastName } = user;
    fullname = (firstName ? `${firstName} ` : "") + (lastName ? lastName : "");
    if (!fullname) fullname = "User";
  }

  return (
    <main className="max-w-6xl mx-auto pt-8 flex flex-col gap-5 items-center justify-center">
      <UserButton afterSignOutUrl="/" />
      <h1 className="inline-flex gap-1 text-lg">
        Welcome back,
        <span className="font-semibold">{fullname}</span>
      </h1>
      <Link
        className="bg-gray-100 p-2 rounded-md hover:bg-gray-200"
        href="/practice"
      >
        Go to Practice
      </Link>
      <SignOutButton />

    </main>
  );
}
