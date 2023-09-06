import Prompt from '@models/prompt'
import { connectToDB } from '@utils/database'

export const POST = async (request) => {
  //console.log(request)
  const { userID, prompt, tag } = await request.json()

  try {
    await connectToDB()
    console.log(userID)
    const newPrompt = new Prompt({ creator: userID, prompt, tag })
    //console.log(newPrompt)
    await newPrompt.save()

    return new Response(JSON.stringify(newPrompt), { status: 201 })
  } catch (error) {
    return new Response('Failed to create a new prompt', { status: 500 })
  }
}
