import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { MainLayout } from "../../layouts/MainLayout"
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
    const [posts, setPosts] = useState<Post[]>([])
    
    const [postPage, setPostPage] = useState(0)

    const fetchUserData = async () => {
        if((!isLoading && isLoggedIn && userInfo) && (!username || username === userInfo.username)) {
            setIsOwnProfile(true)
            setUser(userInfo)
        }
        else if(username){
            const fetchedUser = await fetchUser(username)
            if(fetchedUser) {
                setUser(fetchedUser)
            }
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
            setPosts(ownPosts)
        }
        else if(username && user){
            const publicPosts = await fetchPublicPosts(user.id)
            setPosts(publicPosts)
        }
    }
    const refetchPosts = async () => {
        if((!isLoading && isLoggedIn && userInfo) && (!username || username === userInfo.username)) {
            const ownPosts = await fetchOwnPosts()
            setPosts([...posts, ...ownPosts.filter((post) => !posts.find(p => p.id === post.id))])
        }
        else if(username && user){
            const publicPosts = await fetchPublicPosts(user.id)
            setPosts([...posts, ...publicPosts.filter((post) => !posts.find(p => p.id === post.id))])
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
    
    return (
        <MainLayout>
            {
            isLoggedIn
            &&
            user
            ?
            <div className="flex flex-col gap-6">
                <UserCard user={user} />
                {
                    isOwnProfile
                    &&
                    <div className="w-1/2 m-auto">
                        <AddPostForm callback={ (post) => {
                            setPosts([post, ...posts])
                        } } />
                    </div>
                }
                <div className="w-1/2 m-auto">
                    <PostList postList={posts} setPostPage={setPostPage}/>
                    <button onClick={() => {
                        setPostPage(prevPost => prevPost + 1)
                    }}>
                        Load more
                    </button>
                </div>
            </div> 
            : <p className="text-center">User not found</p>
            }
        </MainLayout>
    )
}