type TProps = {
    value: string,
    id: string,
    name: string,
    placeholder: string,
    maxLength: number,
    defaultValue?: string,
    contentRef: React.RefObject<HTMLTextAreaElement> | null,
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
    onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void
}

export const TextArea = ({ id, name, value, defaultValue, placeholder, maxLength, contentRef, onChange, onBlur }: TProps) => {
    return (
        <textarea 
            id={id}
            name={name}
            ref={contentRef} 
            value={value}
            className="focus:outline-none overflow-auto min-h-10 resize-none text-sm bg-transparent" 
            maxLength={maxLength} 
            placeholder={placeholder} 
            defaultValue={defaultValue}
            onChange={onChange}
            onBlur={onBlur}>
        </textarea>
    )
}