"use server";

import { unstable_noStore as noStore } from "next/cache";
import { sql } from "@vercel/postgres";
import { IQuestion } from "./definitions";

export async function fetchQuestions(): Promise<
  Omit<IQuestion, "correct_answer">[]
> {
  // Add noStore() here prevent the response from being cached.
  // This is equivalent to in fetch(..., {cache: 'no-store'}).

  try {
    // console.log("Fetching questions data...");

    // we can be more strict with type by changing any to some type for rows in database
    const data = await sql<
      Omit<IQuestion, "correct_answer">
    >`SELECT id, text, options FROM questions limit 5`;

    // convert questions from database to IQuestion type
    return data.rows.map((row) => ({
      id: row.id,
      text: row.text,
      options: row.options,
    }));
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch revenue data.");
  }
}

export async function fetchAnswer(
  question_id: string
): Promise<number> {
  try {
    const data =
      await sql<any>`SELECT correct_answer FROM questions WHERE id = ${question_id} limit 1`;

    const { correct_answer } = data.rows[0];
    return correct_answer;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch revenue data.");
  }
}

export async function getUserScore(userId: string): Promise<number> {
  noStore();
  try {
    const data =
      await sql<any>`SELECT score FROM scores WHERE user_id = ${userId} limit 1`;

    if (data.rows.length === 0) {
      return 0;
    }

    const { score } = data.rows[0];
    return score;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch user score data.");
  }
}

export async function updateUserScore(userId: string): Promise<void> {
  noStore();
  try {
    await sql`INSERT INTO scores (user_id, score)
    VALUES (${userId}, 1)
    ON CONFLICT (user_id) DO UPDATE SET score = scores.score + 1;
    `;
    console.log("User score updated.");
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to update score.");
  }
}

type IQuestionResponse = {
  questions: IQuestion[];
};
export async function fetchQuestionsAPI(): Promise<IQuestion[]> {
  try {
    // fetch the data from '/api/questions' with get method
    const res = await fetch("/api/questions", {
      method: "GET",
    });

    // if the response is not ok, throw error
    if (!res.ok) {
      throw new Error("Failed to fetch questions data.");
    }

    // convert the response to json
    const data = (await res.json()) as IQuestionResponse;

    // return the data
    return data.questions;
  } catch (error) {
    console.error("API Error:", error);
    throw new Error("Failed to fetch revenue data.");
  }
}