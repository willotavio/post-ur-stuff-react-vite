import { useEffect, useState } from "react"
import { AddPostForm } from "../components/AddPostForm"
import { getAllPublicPosts } from "../services/api/post"
import { Post } from "../constants/types/post"
import { PostList } from "../components/PostList"
import { MainLayout } from "../layouts/MainLayout"
import { useAuth } from "../context/AuthContext"

export const Home = () => {
    const { isLoggedIn } = useAuth()

    const [postList, setPostList] = useState<Post[]>([])
    useEffect(() => {
        if(isLoggedIn) {
            fetchPosts()
        }
    }, [isLoggedIn])

    const [postPage, setPostPage] = useState(0)

    const fetchPosts = () => {
        async function getPosts() {
            const response = await getAllPublicPosts(postPage.toString());
            if(response.isSuccessful) {
                var newPostList: Post[] = response.responseBody.posts
                setPostList([...postList, ...newPostList.filter(post => !postList.find(p => p.id == post.id))])
            }
        }
        getPosts()
    }

    useEffect(() => {
        fetchPosts()
    }, [postPage])

    return(
        <MainLayout>
            <div className="flex flex-col items-center gap-4">
                {
                    isLoggedIn
                    ? <>
                        <AddPostForm callback={(post: Post) => {
                            setPostList([post, ...postList])
                        }} />
                        <PostList postList={postList} setPostsList={setPostList} />
                        <button onClick={() => {
                            setPostPage(prevPage => prevPage + 1)
                        }}>Load more</button>
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