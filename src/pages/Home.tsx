import { useIsAuth } from "../hooks/useIsAuth"
import { useEffect, useState } from "react"
import { AddPostForm } from "../components/AddPostForm"
import { getAllPublicPosts } from "../services/api/post"
import { Post } from "../constants/types/post"
import { PostList } from "../components/PostList"
import { MainLayout } from "../layouts/MainLayout"

export const Home = () => {
    const isLoggedIn = useIsAuth()

    const [postList, setPostList] = useState<Post[]>([])
    useEffect(() => {
        if(isLoggedIn) {
            fetchPosts()
        }
    }, [isLoggedIn])

    const fetchPosts = () => {
        async function getPosts() {
            const response = await getAllPublicPosts();
            if(response.isSuccessful) {
                var newPostList: Post[] = response.responseBody.posts
                newPostList.sort((a, b) => {
                    return Date.parse(b.createdAt.toString()) - Date.parse(a.createdAt.toString())
                })
                setPostList(newPostList)
            }
        }
        getPosts()
    }

    return(
        <MainLayout>
            <div className="flex flex-col items-center gap-4 ">
                {
                    isLoggedIn
                    ? <>
                        <AddPostForm callback={() => {
                            fetchPosts()
                        }} />
                        <PostList postList={postList} />
                    </>
                        
                    : 
                    <>
                    </>
                }
                <br />

            </div>
        </MainLayout>
    )
}