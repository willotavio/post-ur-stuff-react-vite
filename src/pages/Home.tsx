import { useEffect, useState } from "react"
import { AddPostForm } from "../components/addPostForm/AddPostForm"
import { getAllPublicPosts } from "../services/api/post"
import { Post } from "../constants/types/post"
import { PostList } from "../components/postList/PostList"
import { useAuth } from "../context/AuthContext"
import { AddPostFormSkeleton } from "../components/addPostForm/AddPostFormSkeleton"
import { PostListSkeleton } from "../components/postList/PostListSkeleton"

export const Home = () => {
    const { isLoggedIn } = useAuth()
    const [postPage, setPostPage] = useState(0)

    const [postList, setPostList] = useState<Post[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if(isLoggedIn) {
            const fetchPosts = async () => {
                const response = await getAllPublicPosts(postPage.toString());
                if(response.isSuccessful) {
                    var newPostList: Post[] = response.responseBody.posts
                    setPostList(newPostList)
                    setIsLoading(false)
                }
            }
            const refetchPosts = async () => {
                const response = await getAllPublicPosts(postPage.toString());
                if(response.isSuccessful) {
                    var newPostList: Post[] = response.responseBody.posts
                    setPostList([...postList, ...newPostList.filter(post => !postList.find(p => p.id == post.id))])
                    setIsLoading(false)
                }
            }
            if(postPage === 0) {
                fetchPosts()
            }
            else {
                refetchPosts()   
            }
        }
    }, [postPage, isLoggedIn])

    if(isLoggedIn) {
        if(isLoading) {
            return (
                <div className="flex flex-col items-center gap-6">
                    <div>
                        <AddPostFormSkeleton />
                    </div>
                    <div className="w-2/3">
                        <PostListSkeleton />
                    </div>
                </div> 
            )
        }
    
        if(!isLoading && postList.length > 0) {
            return (
                <div className="flex flex-col items-center gap-4">
                    <>
                        <AddPostForm callback={(post: Post) => {
                            setPostList([post, ...postList])
                        }} />
                        <PostList postList={postList} setPostPage={setPostPage} />
                        <button onClick={() => {
                            setPostPage(prevPage => prevPage + 1)
                        }}>Load more</button>
                    </>
                    <br />
                </div>
            )
        }
    
        if(!isLoading && postList.length === 0) {
            return(
                <div className="flex flex-col items-center gap-4">
                    <p>There's no item</p>
                </div>
            )
        }    
    }
}