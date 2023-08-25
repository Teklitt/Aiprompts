import Feed from '@components/Feed'

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Share Working
        <br className="max-md:first-line:hidden" />
        <span className="blue_gradient text-center">AI-Prompts</span>
        <p className="desc text-center">
          AI prompts is a platform for individuals to create, share and discover
          creative prompts
        </p>
      </h1>
      <Feed />
    </section>
  )
}
export default Home
