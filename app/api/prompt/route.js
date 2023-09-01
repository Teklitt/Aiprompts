import { connectToDB } from '@utils/database'
import Prompt from '@models/prompt'

export const GET = async (reqest) => {
  try {
    await connectToDB()

    const prompts = await Prompt.find({}).populate('creator')

    // Log the response before sending it
    //console.log(JSON.stringify(prompts))

    return new Response(JSON.stringify(prompts), { status: 200 })
  } catch (error) {
    return new Response('Failed to fetch all prompts', { status: 500 })
  }
}
