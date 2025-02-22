import { useRef, useState } from "react"
import { PostAdd } from "../constants/types/post"
import { PostVisibility } from "../constants/enums"
import { Globe, Lock, Check, X } from "@phosphor-icons/react"
import { addPost } from "../services/api/post"
import { TextArea } from "./ui/TextArea"
import { toast, ToastContainer } from "react-toastify"

type TProps = {
    callback?: () => void
}

export const AddPostForm = ({ callback }: TProps) => {

    const [formData, setFormData] = useState<PostAdd>({ visibility: PostVisibility.PUBLIC })
    const [formErrors, setFormErrors] = useState<Record<string, string | null>>({})

    const formRef = useRef<HTMLFormElement>(null)
    const contentRef = useRef<HTMLTextAreaElement>(null)

    let notify = () => toast("")

    const handleContentRef = () => {
        if(contentRef.current !== null) {
            contentRef.current.style.height = "auto"
            contentRef.current.style.height = `${contentRef.current.scrollHeight}px`
        }
    }

    const validateContent = (value: string) => {
        if(value.length >= 1 && value.length <= 200) {
            return true
        }
        else {
            var contentError = ""
            if(!value || value.length < 1) {
                contentError = "Too short. Min: 1 character"
            }
            else if(value.length > 200) {
                contentError = "Too long. Max: 200 characters"
            }
            return contentError
        }
    }

    const validateForm = () => {
        const newFormErrors: Record<string, string | null> = {
            contentError: null,
            visibilityError: null
        }

        const validatedContent = validateContent(formData.content ? formData.content : "")
        if(validatedContent !== true) {
            newFormErrors.contentError = validatedContent
        }
        
        setFormErrors(newFormErrors)
        
        return Object.values(newFormErrors).every(value => value === "" || value === null)
    }

    const toggleVisibility = () => {
        var visibility = null
        switch(formData.visibility) {
            case PostVisibility.PUBLIC:
                visibility = PostVisibility.PRIVATE
                break
            case PostVisibility.PRIVATE:
                visibility = PostVisibility.PUBLIC
                break
            default:
                visibility = PostVisibility.PUBLIC
        }
        setFormData({ ...formData, visibility })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const result = validateForm()
        if(result) {
            const response = await addPost(formData)
            if(response.isSuccessful) {
                notify = () => toast("Posted successfully", {icon: <Check />, type: "success"})
                notify()
                setFormData({ ...formData, content: "" })
                formRef.current?.reset()
                if(callback) {
                    callback()
                }
            }
            else {
                notify = () => toast("Error while posting", {icon: <X />, type: "error"})
                notify()
            }
        }
    }

    return(
        <div className="flex flex-col gap-8 p-6 rounded-lg">
            <form className="flex flex-col gap-y-4 h-auto" ref={formRef} onSubmit={(e) => handleSubmit(e)}>
                <TextArea 
                    placeholder="wazzup?!"
                    maxLength={200}
                    contentRef={contentRef}
                    callback={(e) => {
                            handleContentRef()
                            const result = validateContent(e)
                            setFormData({ ...formData, content: e })
                            var contentError = ""
                            if(result !== true) {
                                contentError = result
                            }
                            setFormErrors({ ...formErrors, contentError })
                        }
                    }
                />
                <div className="grid grid-cols-2 items-center">
                    <small className={`text-xs ${formErrors.contentError && "text-red-500"}`}>{formData.content && formData.content.length > 0 ? formData.content?.length : 0}</small>
                    <div className="ml-auto hover:cursor-pointer" title="Post visibility" onClick={ () => toggleVisibility() }>{
                        formData.visibility === PostVisibility.PUBLIC
                        ? <Globe size={24} />
                        : <Lock size={24} />
                    }</div>
                </div>
                <button type="submit" className="button-default">Post</button>
            </form>
        </div>
    )
}