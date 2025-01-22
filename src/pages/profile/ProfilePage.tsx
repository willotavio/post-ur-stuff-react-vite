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

    useEffect(() => {
        if(!isLoading && !isLoggedIn) {
            navigate("/login")
            return
        }

        const fetchData = async () => {
            if((!isLoading && isLoggedIn && userInfo) && (!username || username === userInfo.username)) {
                setIsOwnProfile(true)
                setUser(userInfo)
                const ownPosts = await fetchOwnPosts()
                setPosts(ownPosts)
            }
            else if(username){
                const fetchedUser = await fetchUser(username)
                if(fetchedUser) {
                    setUser(fetchedUser)
                    const publicPosts = await fetchPublicPosts(fetchedUser.id)
                    setPosts(publicPosts)
                }
            }
        }
        
        fetchData()
    }, [isLoading])

    const fetchUser = async (username: string) => {
        let response = await getProfileByUsername(username)
        if(response.isSuccessful) {
            return response.responseBody.user as User
        }
    }

    const fetchOwnPosts = async () => {
        let response = await getOwnPosts()
        if(response.isSuccessful) {
            var newPostList: Post[] = response.responseBody.posts
            newPostList.sort((a, b) => {
                return Date.parse(b.createdAt.toString()) - Date.parse(a.createdAt.toString())
            })
            return newPostList
        }
        return []
    }

    const fetchPublicPosts = async (id: string) => {
        let response = await getPublicPostsByUserId(id)
        if(response.isSuccessful) {
            var newPostList: Post[] = response.responseBody.posts
            newPostList.sort((a, b) => {
                return Date.parse(b.createdAt.toString()) - Date.parse(a.createdAt.toString())
            })
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
                        <AddPostForm callback={ async () => {
                            setPosts(await fetchOwnPosts())
                        } } />
                    </div>
                }
                <div className="w-1/2 m-auto">
                    <PostList postList={posts} />
                </div>
            </div> 
            : <p className="text-center">User not found</p>
            }
        </MainLayout>
    )
}