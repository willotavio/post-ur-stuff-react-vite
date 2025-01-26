import { Globe, Lock } from "@phosphor-icons/react"
import { Post, PostUpdate } from "../constants/types/post"
import React, { useRef, useState } from "react"
import { PostVisibility } from "../constants/enums"
import { TextArea } from "./ui/TextArea"
import { updatePost } from "../services/api/post"

type TProps = {
    post: Post,
    callback?: (updatedPost: Post) => void
}

type TFormErrors = {
    content?: string,
    visibility?: string
}

export const UpdatePostForm = ({ post, callback }: TProps) => {
    const [updatedPost, setUpdatedPost] = useState<PostUpdate>({ ...post, visibility: parseInt(PostVisibility[post.visibility]) })
    const [formErrors, setFormErrors] = useState<TFormErrors>({})
    const contentRef = useRef(null)

    const validateContent = (value: string) => {
        var contentError
        if(value.length > 0 
            && value.length <= 200) {
                return true
            }
        else if(value.length <= 0) {
            contentError = "Too short. Min: 1 character"
        }
        else if(value.length > 200) {
            contentError = "Too long. Max: 200 characters"
        }
        return contentError
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if(!(updatedPost.content === post.content
            && updatedPost.visibility === parseInt(PostVisibility[post.visibility]))
            && validateContent(updatedPost.content ?? "") === true
        ) {
            const response = await updatePost(post.id, updatedPost)
            if(response.isSuccessful) {
                if(callback) {
                    callback(response.responseBody.post)
                }
            } 
        }
    }

    return (
        <div className="flex flex-col">
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <TextArea 
                    placeholder=""
                    defaultValue={post.content}
                    maxLength={300}
                    contentRef={contentRef}
                    callback={(value) => {
                        setUpdatedPost({ ...updatedPost, content: value })
                        const result = validateContent(value)
                        var contentError = ""
                        if(result && result !== true) {
                            contentError = result
                        }
                        setFormErrors({ content: contentError })
                    }}
                />
                <div className="grid grid-cols-2 items-center">
                    <small className={`text-xs ${formErrors.content ? "text-red-500" : ""}`}>{updatedPost.content?.length}</small>
                    <div className="ml-auto">
                        {
                            updatedPost.visibility === PostVisibility.PUBLIC
                            ?
                            <Globe onClick={() => setUpdatedPost({ ...updatedPost, visibility: PostVisibility.PRIVATE })} size={24} />
                            :
                            <Lock onClick={() => setUpdatedPost({ ...updatedPost, visibility: PostVisibility.PUBLIC })} size={24} />
                        }
                    </div>
                </div>
                
                <button className="button-default" type="submit">Update</button>
            </form>
        </div>
    )
}