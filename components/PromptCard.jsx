'use clieant'
import { useState } from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  const [copied, setCopied] = useState('')
  const { data: session } = useSession()
  //console.log('Session:', session)
  const pathName = usePathname()
  const router = useRouter()

  const handleProfileClick = () => {
    console.log(post)

    if (post.creator._id === session?.user.id) return router.push('/Profile')

    router.push(`/Profile/${post.creator._id}?name=${post.creator.username}`)
  }

  const handleCopy = () => {
    setCopied(post.prompt)
    navigator.clipboard.writeText(post.prompt)
    setTimeout(() => setCopied(''), 3000)
  }
  // console.log('post:', post)
  // console.log('session?.user?.id:', session)
  // console.log('post.creator._id:', post.creator._id)
  // console.log('pathName:', pathName)
  // console.log('username:', post.creator.username)

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div
          className="flex-1 flex justify-start items-center gap-3 cursor-pointer"
          onClick={handleProfileClick}
        >
          {/* <Image
            src={post.creator.image}
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          /> */}

          <motion.a whileHover={{ y: -2 }} whileTap={{ scale: 0.9 }}>
            <Image
              src={post.creator.image}
              alt="user_image"
              width={40}
              height={40}
              className="rounded-full object-contain"
            />
          </motion.a>
          <motion.div
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.9 }}
            className="flex flex-col"
          >
            <h3 className="font-satoshi font-semibold text-gray-900">
              {post.creator.username}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {post.creator.email}
            </p>
          </motion.div>
        </div>

        <motion.div
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.9 }}
          className="copy_btn"
          onClick={handleCopy}
        >
          <Image
            src={
              copied === post.prompt
                ? '/assets/icons/tick.svg'
                : '/assets/icons/copy.svg'
            }
            alt="copy icon"
            width={12}
            height={12}
          />
        </motion.div>
      </div>
      <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
      <motion.p
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.9 }}
        className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        #{post.tag}
      </motion.p>
      {session?.user?.id === post.creator._id && pathName === '/Profile' && (
        <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3 ">
          <p
            className="font-inter text-sm green_gradient cursor-pointer"
            onClick={handleEdit}
          >
            Edit
          </p>
          <p
            className="font-inter text-sm orange_gradient cursor-pointer"
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  )
}

export default PromptCard
