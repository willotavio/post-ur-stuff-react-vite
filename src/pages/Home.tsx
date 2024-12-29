import { logout } from "../services/api/user"
import { Link } from "react-router-dom"
import { useIsAuth } from "../hooks/useIsAuth"
import { useEffect, useState } from "react"
import { Modal } from "../components/ui/Modal"
import { AddPostForm } from "../components/AddPostForm"
import { getAllPublicPosts } from "../services/api/post"
import { Post } from "../constants/types/post"
import { PostList } from "../components/PostList"

export const Home = () => {
    const [isOpen, setIsOpen] = useState(false)

    const isLoggedIn = useIsAuth()

    const [postList, setPostList] = useState<Post[]>([])
    useEffect(() => {
        async function getPosts() {
            const response = await getAllPublicPosts();
            if(response.isSuccessful) {
                var tempPostList: Post[] = response.responseBody.posts
                tempPostList.sort((a, b) => {
                    return Date.parse(b.createdAt.toString()) - Date.parse(a.createdAt.toString())
                })
                setPostList(tempPostList)
            }
        }
        getPosts()
    }, [postList])

    const logoutUser = async () => {
        const result = await logout()
        console.log(result)
    }

    return(
        <div className="flex flex-col items-center gap-4">
            {
                isLoggedIn
                ? <>
                    <button className="button-default" onClick={ () => logoutUser() }>Logout</button>
                    <button className="button-default" onClick={() => setIsOpen(!isOpen)}>New post</button>
                    {
                        isOpen
                        &&
                        <Modal setIsOpen={ setIsOpen } >
                            <div>
                                <AddPostForm callback={() => {
                                    setIsOpen(false)
                                    setPostList([])
                                }} />
                            </div>
                        </Modal>
                    }

                    <PostList postList={postList} />
                </>
                    
                : <>
                    <Link className="button-default" to={"/login"}>Login</Link>
                </>
            }
            <br />

        </div>
    )
}