import { Link } from "react-router-dom"
import { Post } from "../constants/types/post"

type TProps = {
    post: Post,
}

export const PostCard = ({ post }: TProps) => {
    return (
        <div className="flex flex-col gap-2 border-solid border-2 border-gray-400 rounded-lg p-2">
            <small className="text-sm">
                {post.user.displayName} 
                <Link to={`/profile/${post.user.username}`}> @{post.user.username} - </Link> 
                {post.createdAt.toString().split("T")[0]}
                </small>
            <p className="text-sm">{ post.content }</p>
        </div>
    )
}