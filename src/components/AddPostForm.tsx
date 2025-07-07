import { useRef, useState } from "react"
import { Post, PostAdd } from "../constants/types/post"
import { PostVisibility } from "../constants/enums"
import { Globe, Lock, Check, X } from "@phosphor-icons/react"
import { addPost } from "../services/api/post"
import { TextArea } from "./ui/TextArea"
import { toast } from "react-toastify"

import * as Yup from "yup"
import { useFormik } from "formik"

type TProps = {
    callback?: (post: Post) => void
}

const formikSchema = Yup.object().shape({
    content: Yup.string()
        .max(200, "Too long. Max: 200 characters")
        .required("Enter something")
})

export const AddPostForm = ({ callback }: TProps) => {
    
    const contentRef = useRef<HTMLTextAreaElement>(null)

    const [postVisibility, setPostVisibility] = useState(1)

    let notify = () => toast("")

    const formik = useFormik({
        initialValues: {
            content: ""
        },
        validationSchema: formikSchema,
        onSubmit: values => {
            publishPost(values)
        }
    })

    const publishPost = async (postInfo: PostAdd) => {
        const response = await addPost({ ...postInfo, visibility: postVisibility })
            if(response.isSuccessful) {
                notify = () => toast("Posted successfully", {icon: <Check />, type: "success"})
                notify()
                if(callback && postVisibility === PostVisibility.PUBLIC) {
                    callback(response.responseBody.post)
                }
                formik.resetForm()
            }
            else {
                notify = () => toast("Error while posting", {icon: <X />, type: "error"})
                notify()
            }
    }

    const toggleVisibility = () => {
        var visibility = null
        switch(postVisibility) {
            case PostVisibility.PUBLIC:
                visibility = PostVisibility.PRIVATE
                break
            case PostVisibility.PRIVATE:
                visibility = PostVisibility.PUBLIC
                break
            default:
                visibility = PostVisibility.PUBLIC
        }
        setPostVisibility(visibility)
    }

    return(
        <div className="flex flex-col gap-8 p-6 rounded-lg">
            <form className="flex flex-col gap-y-4 h-auto" onSubmit={formik.handleSubmit}>
                <TextArea 
                    value={formik.values.content}
                    id="content"
                    name="content"
                    placeholder="wazzup?!"
                    maxLength={200}
                    contentRef={contentRef}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                <div className="grid grid-cols-2 items-center">
                    <small className={`text-xs ${formik.errors.content && "text-red-500"}`}>{formik.values.content && formik.values.content.length > 0 ? formik.values.content?.length : 0}</small>
                    <div className="ml-auto hover:cursor-pointer" title="Post visibility" onClick={ () => toggleVisibility() }>{
                        postVisibility === PostVisibility.PUBLIC
                        ? <Globe size={24} />
                        : <Lock size={24} />
                    }</div>
                </div>
                <button type="submit" className="button-default">Post</button>
            </form>
        </div>
    )
}