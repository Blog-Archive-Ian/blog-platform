'use client'
import MDEditor from '@uiw/react-md-editor'

import { Post } from '@/entities/post/post.entity'

interface Props {
  post: Post
}

export const PostContent = ({ post }: Props) => {
  return (
    <div className="min-w-0 w-full overflow-hidden [&_pre]:overflow-x-auto [&_pre]:max-w-full">
      <MDEditor.Markdown
        source={post.content}
        className="w-full wrap-break-words"
        style={{
          lineHeight: '30px',
          position: 'relative',
          zIndex: 10,
        }}
      />
    </div>
  )
}
