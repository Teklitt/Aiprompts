'use client'
import Feed from '@components/Feed'
import { motion, AnimatePresence } from 'framer-motion'

const Home = () => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        // initial={{ scaleY: 0 }}
        // animate={{ scaleY: 1 }}
        // exit={{ scaleY: 1 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        //transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        <section className="w-full flex-center flex-col">
          <h1 className="head_text text-center">
            Share Working
            <br className="max-md:first-line:hidden" />
            <span className="blue_gradient text-center">AI-Prompts</span>
            <p className="desc text-center">
              AI prompts is a platform for individuals to create, share and
              discover creative prompts
            </p>
          </h1>
          <Feed />
        </section>
      </motion.div>
    </AnimatePresence>
  )
}
export default Home
