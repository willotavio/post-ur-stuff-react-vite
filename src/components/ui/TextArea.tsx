type TProps = {
    placeholder: string,
    maxLength: number,
    defaultValue?: string,
    contentRef: React.RefObject<HTMLTextAreaElement> | null,
    callback: (e: string) => void
}

export const TextArea = ({ defaultValue, placeholder, maxLength, contentRef, callback }: TProps) => {
    return (
        <textarea 
            ref={contentRef} 
            className="focus:outline-none overflow-auto min-h-10 resize-none text-sm bg-transparent" 
            maxLength={maxLength} 
            placeholder={placeholder} 
            defaultValue={defaultValue}
            onChange={
                (e) => {
                    callback(e.target.value)
                }
            }>
        </textarea>
    )
}