export const dynamic = "force-dynamic";

import PracticePage from "@/components/Quiz";
import { currentUser } from "@clerk/nextjs";
import { getUserScore } from "../lib/data";

export default async function Page() {
  const user = await currentUser();
  if (user) {
    const score = await getUserScore(user.id);
    return (
      <>
        <PracticePage userId={user.id} score={score} />
      </>
    );
  }
  return null;
}