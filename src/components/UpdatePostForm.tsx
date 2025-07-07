import { Check, Globe, Lock, X } from "@phosphor-icons/react"
import { Post, PostUpdate } from "../constants/types/post"
import { useRef, useState } from "react"
import { PostVisibility } from "../constants/enums"
import { TextArea } from "./ui/TextArea"
import { updatePost } from "../services/api/post"
import { toast } from "react-toastify"

import * as Yup from "yup"
import { useFormik } from "formik"

type TProps = {
    post: Post,
    callback?: (updatedPost: Post) => void
}

const formSchema = Yup.object().shape({
    content: Yup.string()
        .max(200, "Too long. Max: 200 characters")
        .required("Enter something")
})

export const UpdatePostForm = ({ post, callback }: TProps) => {
    
    const contentRef = useRef(null)
    let notify = () => toast("")
    const [postVisibility, setPostVisibility] = useState(parseInt(PostVisibility[post.visibility]))

    const formik = useFormik({
        initialValues: {
            content: post.content
        },
        validationSchema: formSchema,
        onSubmit: values => {
            update(values)
        }
    })
    
    const update = async (postInfo: PostUpdate) => {
        if(!(formik.values.content === post.content
            && postVisibility === parseInt(PostVisibility[post.visibility]))
        ) {
            const response = await updatePost(post.id, { ...postInfo, visibility: postVisibility })
            if(response.isSuccessful) {
                if(callback) {
                    callback(response.responseBody.post)
                }
                notify = () => toast("Updated successfully", {type: "success", icon: Check})
                notify()
            }
            else {
                notify = () => toast(response.responseBody.message, {type: "error", icon: X})
                notify()
            }
        }
    }

    return (
        <div className="flex flex-col">
            <form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
                <TextArea 
                    value={formik.values.content}
                    id="content"
                    name="content"
                    placeholder=""
                    defaultValue={post.content}
                    maxLength={300}
                    contentRef={contentRef}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                <div className="grid grid-cols-2 items-center">
                    <small className={`text-xs ${formik.errors.content ? "text-red-500" : ""}`}>{formik.values.content?.length}</small>
                    <div className="ml-auto">
                        {
                            postVisibility === PostVisibility.PUBLIC
                            ?
                            <Globe onClick={() => setPostVisibility(PostVisibility.PRIVATE)} size={24} />
                            :
                            <Lock onClick={() => setPostVisibility(PostVisibility.PUBLIC)} size={24} />
                        }
                    </div>
                </div>
                
                <button className="button-default" type="submit">Update</button>
            </form>
        </div>
    )
}