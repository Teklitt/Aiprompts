'use client'
import Feed from '@components/Feed'

import AnimatedText from '@components/AnimatedText'

const Home = () => {
  return (
    <div>
      <section className="w-full flex-center flex-col">
        <h1 className="head_text text-center">
          Share Working
          <br className="max-md:first-line:hidden" />
          <span className="blue_gradient text-center text-7xl">AI-Prompts</span>
          <AnimatedText
            text=" AI prompts is a platform for individuals to create, share and
            discover creative prompts"
            className=" desc text-center"
          />
        </h1>
        <Feed />
      </section>
    </div>
  )
}
export default Home
