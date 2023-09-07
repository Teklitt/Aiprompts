import Prompt from '@models/prompt'
import { connectToDB } from '@utils/database'

export const POST = async (request) => {
  //console.log(request)
  const { userId, prompt, tag } = await request.json()

  try {
    await connectToDB()

    //console.log(userId)

    const newPrompt = new Prompt({ creator: userId, prompt, tag })

    //console.log(newPrompt)

    await newPrompt.save()

    return new Response(JSON.stringify(newPrompt), { status: 201 })
  } catch (error) {
    return new Response('Failed to create a new prompt', { status: 500 })
  }
}
