import "dotenv/config";
import { ChatMistralAI } from "@langchain/mistralai";
import { HumanMessage, AIMessage } from "@langchain/core/messages";
import { createAgent, tool } from "langchain";
import * as z from "zod";
import * as readline from "node:readline/promises";
import { sendEmail as sendEmailService } from "./email.service.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const model = new ChatMistralAI({
  apiKey: process.env.MISTRAL_API_KEY,
  model: "mistral-small-latest",
});

const sendEmailTool = tool(
  async (input) => {
    const { to, subject, text, html } = input;
    try {
      await sendEmailService(to, subject, text, html);
      return "Email sent successfully";
    } catch (error) {
      return `Failed to send email: ${error.message}`;
    }
  },
  {
    name: "send_email",
    description: "Send an email to a specified recipient",
    schema: z.object({
      to: z.string().email().describe("The email to send the email to"),
      subject: z.string().describe("The subject of the email"),
      text: z.string().describe("The text of the email"),
      html: z.string().optional().describe("The html of the email"),
    }),
  }
);

const agent = createAgent({
  model: model,
  tools: [sendEmailTool],
});

const messages = [];

async function run() {
  while (true) {
    const userInput = await rl.question("\x1b[1;36mYou :\x1b[0m ");
    if (!userInput.trim()) continue;

    messages.push(new HumanMessage({ content: userInput }));

    try {
      const result = await agent.invoke({
        messages: messages
      });

      messages.length = 0;
      messages.push(...result.messages);

      const aiResponse = messages[messages.length - 1].content;
      console.log("\x1b[1;32mAI :\x1b[0m", aiResponse);
    } catch (error) {
      console.error("Agent Error:", error.message);
    }
  }
}

export { run }