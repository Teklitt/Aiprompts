import { connectToDB } from '@utils/database'
import Prompt from '@models/prompt'

export const GET = async (request) => {
  //console.log(request)
  try {
    await connectToDB()

    const prompts = await Prompt.find({}).populate('creator')

    // Log the response before sending it
    //console.log(JSON.stringify(prompts))

    //console.log(prompts)

    return new Response(JSON.stringify(prompts), { status: 200 })
  } catch (error) {
    try {
      location.reload()
    } catch (error) {}
    return new Response('Failed to fetch all prompts', { status: 500 })
  }
}
