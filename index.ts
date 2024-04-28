import OpenAI from "openai"
import chalk from "chalk"
import boxen from "boxen"
import promptSync from "prompt-sync"
import "dotenv/config"
import {
  ChatCompletion,
  ChatCompletionCreateParams,
  ChatCompletionMessage,
  ChatCompletionSystemMessageParam,
  ChatCompletionUserMessageParam,
} from "openai/resources/index.mjs"

const prompt = promptSync()
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

type Message =
  | ChatCompletionSystemMessageParam
  | ChatCompletionUserMessageParam
  | ChatCompletionMessage

let run = true
const messages: Message[] = []

async function main(messages: Message[]) {
  const params: ChatCompletionCreateParams = {
    messages: messages,
    model: "gpt-3.5-turbo",
  }

  const chatCompletion: ChatCompletion = await openai.chat.completions.create(
    params
  )

  return chatCompletion.choices[0].message
}

const terminalWidth = process.stdout.columns
const commonBoxen = {
  padding: 0.75,
  width: terminalWidth,
  borderStyle: "double",
} as const

console.log(chalk.green.bold("\nASK ME ANYTHING\n"))
;(async () => {
  while (run) {
    const input = prompt("You: ")

    if (input === "exit" || !input) {
      run = false
      break
    }

    const human = boxen(input, {
      ...commonBoxen,
      borderColor: "blue",
      title: "Poor Human",
      titleAlignment: "right",
      textAlignment: "right",
    })

    console.log(human)

    messages.push({ role: "user", content: input })
    const aiResponse = await main(messages)
    messages.push(aiResponse)

    const ai = boxen(aiResponse.content || "", {
      ...commonBoxen,
      borderColor: "red",
      title: "AI",
    })

    console.log(ai)
  }
})()
