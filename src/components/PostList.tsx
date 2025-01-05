import { Post } from "../constants/types/post"
import { PostCard } from "./PostCard"

type TProps = {
    postList: Post[],
}

export const PostList = ({ postList }: TProps) => {
    return (
        <div className="flex flex-col gap-2">
            {
                postList.length > 0
                ? postList.map((post) => 
                    <PostCard key={post.id} post={post} />
                )
                : <p>There's no post</p>
            }
        </div>
    )
}