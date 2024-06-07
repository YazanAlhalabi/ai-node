import ollama from "ollama"
import chalk from "chalk"
import boxen from "boxen"
import promptSync from "prompt-sync"
import "dotenv/config"

const prompt = promptSync()

type Message = {
  role: string
  content: string
  images?: Uint8Array[] | string[]
}

let run = true
const messages: Message[] = []

async function main(messages: Message[]) {
  try {
    const response = await ollama.chat({
      model: "llama3",
      messages: messages,
    })

    return response.message
  } catch (error) {
    console.log("error:", error)
    throw new Error("Something went wrong")
  }
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
