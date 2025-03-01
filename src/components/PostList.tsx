import React from "react"
import { Post } from "../constants/types/post"
import { PostCard } from "./PostCard"

type TProps = {
    postList: Post[],
    setPostsList: React.Dispatch<React.SetStateAction<Post[]>>
}

export const PostList = ({ postList, setPostsList }: TProps) => {
    return (
        <div className="flex flex-col gap-2">
            {
                postList.length > 0
                ? postList.map((post) => 
                    <PostCard key={post.id} post={post} callback={(id: string) => {
                        setPostsList(
                            postList.filter((post) => post.id != id )    
                        )
                    }} />
                )
                : <p>There's no post</p>
            }
        </div>
    )
}