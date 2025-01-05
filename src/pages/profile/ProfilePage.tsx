import { useNavigate, useParams } from "react-router-dom"
import { useIsAuth } from "../../hooks/useIsAuth"
import { useEffect, useState } from "react"
import { MainLayout } from "../../layouts/MainLayout"
import { User } from "../../constants/types/user"
import { getOwnProfile, getProfileByUsername } from "../../services/api/user"
import { getOwnPosts, getPublicPostsByUserId } from "../../services/api/post"
import { Post } from "../../constants/types/post"
import { PostList } from "../../components/PostList"
import { UserCard } from "../../components/UserCard"

export const ProfilePage = () => {
    const { username } = useParams()

    const navigate = useNavigate()
    const isLoggedIn = useIsAuth()

    const [user, setUser] = useState<User | null>(null)
    const [posts, setPosts] = useState<Post[]>([])

    useEffect(() => {
        if(isLoggedIn === false) {
            navigate("/login")
        }
        const fetchData = async () => {
            let loggedUser: User = await fetchLoggedUser()
            let newUsername = username ?? loggedUser.username
            let user: User | null = await fetchUser(newUsername)
            if(user) {
                setUser(user)
                let posts: Post[]
                if(loggedUser.id === user?.id) {
                    posts = await fetchOwnPosts()
                }
                else {
                    posts = await fetchPublicPosts(user?.id)
                }
                setPosts(posts)
            }
        }
        fetchData()
    }, [isLoggedIn])

    const fetchLoggedUser = async () => {
        let response = await getOwnProfile()
        if(response.isSuccessful) {
            return response.responseBody.user
        }
    }

    const fetchUser = async (username: string) => {
        let response = await getProfileByUsername(username)
        if(response.isSuccessful) {
            return response.responseBody.user
        }
        return null
    }

    const fetchOwnPosts = async () => {
        let response = await getOwnPosts()
        if(response.isSuccessful) {
            var newPostList: Post[] = response.responseBody.posts
            newPostList.sort((a, b) => {
                return Date.parse(b.createdAt.toString()) - Date.parse(a.createdAt.toString())
            })
            return newPostList as Post[]
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
            return newPostList as Post[]
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
            <div className="flex flex-col gap-10">
                <UserCard user={user} />
                <div className="w-1/2 m-auto">
                    <PostList postList={posts} />
                </div>
            </div> 
            : <p className="text-center">User not found</p>
            }
        </MainLayout>
    )
}