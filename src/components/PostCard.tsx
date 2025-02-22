import { Link } from "react-router-dom"
import { Post } from "../constants/types/post"
import { useAuth } from "../context/AuthContext"
import { Pencil, Trash, X } from "@phosphor-icons/react"
import { useState } from "react"
import { Modal } from "./ui/Modal"
import { UpdatePostForm } from "./UpdatePostForm"
import { deletePost } from "../services/api/post"
import { ToastContainer, toast } from "react-toastify"

type TProps = {
    post: Post,
    callback?: (id: string) => void
}

export const PostCard = ({ post, callback }: TProps) => {
    const { userInfo } = useAuth()
    const [currentPost, setCurrentPost] = useState(post)
    const [isEditOpen, setIsEditOpen] = useState(false)
    const [isDeleteOpen, setIsDeleteOpen] = useState(false)

    let notify = () => toast("")

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
                        <>
                            <Pencil onClick={() => setIsEditOpen(!isEditOpen)} />
                            <X onClick={() => setIsDeleteOpen(!isDeleteOpen)} />
                        </>
                    }
                </div>
            </div>
            <p className="text-sm">{ currentPost.content }</p>
            
            {
                isEditOpen
                &&
                <Modal setIsOpen={setIsEditOpen}>
                    <UpdatePostForm post={currentPost} callback={(post) => {
                        setCurrentPost(post)
                    }} />
                </Modal>
            }
            {
                isDeleteOpen
                &&
                <Modal setIsOpen={setIsDeleteOpen}>
                    <button className="button-default !bg-red-500" onClick={async () => {
                        await deletePost(currentPost.id)
                        notify = () => toast("Deleted successfully", { icon: <Trash />, type: "success"})
                        notify()
                        setIsDeleteOpen(false)
                        if(callback) {
                            callback(currentPost.id)
                        }
                    }}>Delete</button>
                </Modal>
            }
        </div>
    )
}