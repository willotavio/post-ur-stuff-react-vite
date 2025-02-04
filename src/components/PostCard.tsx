import { Link } from "react-router-dom"
import { Post } from "../constants/types/post"
import { useAuth } from "../context/AuthContext"
import { Pencil } from "@phosphor-icons/react"
import { useState } from "react"
import { Modal } from "./ui/Modal"
import { UpdatePostForm } from "./UpdatePostForm"

type TProps = {
    post: Post,
}

export const PostCard = ({ post }: TProps) => {
    const { userInfo } = useAuth()
    const [currentPost, setCurrentPost] = useState(post)
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="flex flex-col gap-2 border-solid border-2 border-gray-400 rounded-lg p-2 break-all">
            <div className="text-sm flex justify-between">
                <div className="text-xs flex justify-between gap-2">
                    <p className="sm:break-words truncate" title={currentPost.user.displayName}>{currentPost.user.displayName}</p>
                    <Link to={`/profile/${currentPost.user.username}`}> @{currentPost.user.username}</Link> 
                </div>
                <div className="text-xs flex justify-between gap-2">
                    <p className="sm:block hidden" title={currentPost.editedAt ? `Edited at ${currentPost.editedAt?.toString().split("T")[0]}` : ""}>{currentPost.createdAt.toString().split("T")[0]}</p>
                    {
                        userInfo && currentPost.user.id === userInfo.id
                        &&
                        <Pencil onClick={() => setIsOpen(!isOpen)} />
                    }
                </div>
            </div>
            <p className="text-sm">{ currentPost.content }</p>
            
            {
                isOpen
                &&
                <Modal setIsOpen={setIsOpen}>
                    <UpdatePostForm post={currentPost} callback={(post) => {
                        setCurrentPost(post)
                    }} />
                </Modal>
            }
        </div>
    )
}