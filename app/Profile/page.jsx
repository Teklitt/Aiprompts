'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import Profile from '@components/profile'

const MyProfile = () => {
  const router = useRouter()
  const { data: session } = useSession()
  //console.log('Session:', session)
  const [posts, setPosts] = useState([])

  //console.log('session?.user.id', session?.user.id)

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`)
      const data = await response.json()

      setPosts(data)
    }
    //console.log(posts)

    if (session?.user.id) fetchPosts()
  }, [session?.user.id])

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`)
  }

  const handleDelete = async (post) => {
    const hasConfirmed = confirm('Are you sure you want to delete this post?')
    if (hasConfirmed)
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, { method: 'DELETE' })
        const filteredPosts = posts.filter((p) => p._id !== post._id)
        //window.location.reload()
        //window.location.href = '/'
      } catch (error) {
        console.log(error)
      }
  }
  return (
    <Profile
      name="My"
      desc="Welcome to your personalized page."
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  )
}
export default MyProfile
