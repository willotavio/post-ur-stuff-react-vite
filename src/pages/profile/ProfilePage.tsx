import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { User } from "../../constants/types/user"
import { getProfileByUsername } from "../../services/api/user"
import { getOwnPosts, getPublicPostsByUserId } from "../../services/api/post"
import { Post } from "../../constants/types/post"
import { PostList } from "../../components/PostList"
import { UserCard } from "../../components/UserCard"
import { AddPostForm } from "../../components/AddPostForm"
import { useAuth } from "../../context/AuthContext"

export const ProfilePage = () => {
    const { username } = useParams()

    const navigate = useNavigate()
    const { isLoggedIn, userInfo, isLoading } = useAuth()

    const [isOwnProfile, setIsOwnProfile] = useState(false)

    const [user, setUser] = useState<User | null>(null)
    const [postList, setPostList] = useState<Post[]>([])
    
    const [postPage, setPostPage] = useState(0)
    const [isPostListLoading, setIsPostListLoading] = useState(true)
    const [isUserLoading, setIsUserLoading] = useState(true)

    const fetchUserData = async () => {
        if((!isLoading && isLoggedIn && userInfo) && (!username || username === userInfo.username)) {
            setIsOwnProfile(true)
            setUser(userInfo)
            setIsUserLoading(false)
        }
        else if(username){
            const fetchedUser = await fetchUser(username)
            if(fetchedUser) {
                setUser(fetchedUser)
            }
            setIsUserLoading(false)
        }
    }

    useEffect(() => {
        if(!isLoading && !isLoggedIn) {
            navigate("/login")
            return
        }
        fetchUserData()
    }, [isLoading])
    
    const fetchPosts = async () => {
        if((!isLoading && isLoggedIn && userInfo) && (!username || username === userInfo.username)) {
            const ownPosts = await fetchOwnPosts()
            setPostList(ownPosts)
            setIsPostListLoading(false)
        }
        else if(username && user){
            const publicPosts = await fetchPublicPosts(user.id)
            setPostList(publicPosts)
            setIsPostListLoading(false)
        }
    }
    const refetchPosts = async () => {
        if((!isLoading && isLoggedIn && userInfo) && (!username || username === userInfo.username)) {
            const ownPosts = await fetchOwnPosts()
            setPostList([...postList, ...ownPosts.filter((post) => !postList.find(p => p.id === post.id))])
            setIsPostListLoading(false)
        }
        else if(username && user){
            const publicPosts = await fetchPublicPosts(user.id)
            setPostList([...postList, ...publicPosts.filter((post) => !postList.find(p => p.id === post.id))])
            setIsPostListLoading(false)
        }
    }

    useEffect(() => {
        if(postPage === 0) {
            fetchPosts()
        }
        else {
            refetchPosts()
        }
    }, [postPage, user])

    const fetchUser = async (username: string) => {
        let response = await getProfileByUsername(username)
        if(response.isSuccessful) {
            return response.responseBody.user as User
        }
    }

    const fetchOwnPosts = async () => {
        let response = await getOwnPosts(postPage.toString())
        if(response.isSuccessful) {
            var newPostList: Post[] = response.responseBody.posts
            return newPostList
        }
        return []
    }

    const fetchPublicPosts = async (id: string) => {
        let response = await getPublicPostsByUserId(id, postPage.toString())
        if(response.isSuccessful) {
            var newPostList: Post[] = response.responseBody.posts
            return newPostList
        }
        return []
    }
    
    if(isLoggedIn) {
        
        if(!isUserLoading && user === null) {
            return (
                <div className="flex flex-col items-center gap-4">
                    <p>User not found</p>
                </div>
            )
        }

        if(isUserLoading || isPostListLoading) {
            return (
                <div className="flex flex-col items-center gap-4">
                    <p>Loading...</p>
                </div>
            )
        }
    
        if(!isUserLoading && !isPostListLoading && user && postList.length > 0) {
            return (
                <div className="flex flex-col gap-6">
                    <UserCard user={user} />
                    {
                        isOwnProfile
                        &&
                        <div className="w-1/2 m-auto">
                            <AddPostForm callback={ (post) => {
                                setPostList([post, ...postList])
                            } } />
                        </div>
                    }
                    <div className="w-1/2 m-auto">
                        <PostList postList={postList} setPostPage={setPostPage}/>
                        <button onClick={() => {
                            setPostPage(prevPost => prevPost + 1)
                        }}>
                            Load more
                        </button>
                    </div>
                </div> 
            )
        }
    
        if(!isUserLoading && !isPostListLoading && postList.length === 0) {
            return(
                <div className="flex flex-col items-center gap-4">
                    <p>There's no item</p>
                </div>
            )
        }
    }
}