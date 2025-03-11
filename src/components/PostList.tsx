import React from "react"
import { Post } from "../constants/types/post"
import { PostCard } from "./PostCard"

type TProps = {
    postList: Post[],
    setPostPage: React.Dispatch<React.SetStateAction<number>>
}

export const PostList = ({ postList, setPostPage }: TProps) => {
    return (
        <div className="flex flex-col gap-2">
            {
                postList.length > 0
                ? postList.map((post) => 
                    <PostCard key={post.id} post={post} callback={() => {
                        // changing to -1 and then to 0 so useEffect is triggered even when it`s alredy 0
                        setPostPage(prev => prev * -1)
                        setPostPage(prev => prev * 0)
                    }} />
                )
                : <p>There's no post</p>
            }
        </div>
    )
}