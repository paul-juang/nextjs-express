//Step 2: Defining your functions
import { CompletionCreateParams } from "openai/resources/chat/index";

export const functions: CompletionCreateParams.Function[] = [
  {
    name: "get_top_stories",
    description:
      "Get the top stories from Hacker News. Also returns the Hacker News URL to each story.",
    parameters: {
      type: "object",
      properties: {
        limit: {
          type: "number",
          description: "The number of stories to return. Defaults to 10.",
        },
      },
      required: [],
    },
  },
  ... // more functions
];

async function get_top_stories(limit: number = 10) {
  const response = await fetch(
    "https://hacker-news.firebaseio.com/v0/topstories.json",
  );
  const ids = await response.json();
  const stories = await Promise.all(
    ids.slice(0, limit).map((id: number) => get_story(id)),
  );
  return stories;
}

export async function runFunction(name: string, args: any) {
  switch (name) {
    case "get_top_stories":
      return await get_top_stories();
     ... // more functions
  }
}