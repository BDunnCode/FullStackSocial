import { useUserContext } from '@/context/AuthContext'
import { Models } from 'appwrite'
import React from 'react'

type GridPostListProps = {
  posts: Models.Document[]
}

const GridPostList = ({ posts }: GridPostListProps) => {
  const { user } = useUserContext();
  
  return (
    <div>GridPostList</div>
  )
}

export default GridPostList