import { Link } from "react-router-dom"
import { Post } from "../../constants/types/post"
import { useAuth } from "../../context/AuthContext"
import { Pencil, Trash } from "@phosphor-icons/react"
import { useState } from "react"
import { Modal } from "../ui/Modal"
import { UpdatePostForm } from "../updatePostForm/UpdatePostForm"
import { deletePost } from "../../services/api/post"
import { toast } from "react-toastify"
import formatDate from "../../utils/formatDate"

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
        <div className="flex flex-col gap-2">
            <div className="">
                <Link to={`/profile/${currentPost.user.username}`} className="text-blue-400 font-bold mr-2" title={`@${currentPost.user.username}`}>{ currentPost?.user.displayName }</Link>
                <span>{ currentPost.content }</span>
            </div>
            <div className="flex flex-row text-xs">
                <span>{ formatDate(currentPost.createdAt) }</span>
                { 
                    userInfo?.id === post.user.id && 
                    <div className="flex flex-row ml-auto gap-2">
                        <Pencil className="scale-animation" onClick={() => setIsEditOpen(!isEditOpen)} size={16}/>
                        <Trash className="scale-animation" onClick={() => setIsDeleteOpen(!isDeleteOpen)} size={16} />
                    </div>
                }
            </div>
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
                    <div className="flex flex-col text-center gap-2">
                        <p>Are you sure you want to delete this post?</p>
                        <button className="button-default !bg-red-500" onClick={async () => {
                            await deletePost(currentPost.id)
                            notify = () => toast("Deleted successfully", { icon: <Trash />, type: "success"})
                            notify()
                            setIsDeleteOpen(false)
                            if(callback) {
                                callback(currentPost.id)
                            }
                        }}>Delete</button>
                    </div>
                </Modal>
            }
        </div>
    )
}