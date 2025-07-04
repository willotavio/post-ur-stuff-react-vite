import React from "react"

type TProps = {
    type: string,
    label: string,
    id: string,
    name: string,
    value: string,
    defaultValue?: string,
    error?: string | null,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onBlur: (e: React.FocusEvent<HTMLInputElement>) => void
}

export const InputField = ({type, label, id, name, value, defaultValue, error, onChange, onBlur}: TProps) => {
    return(
        <div className="flex flex-col gap-y-2 relative">
            <input className={`w-full peer bg-gray-100 rounded-lg h-10 px-2 shadow-lg text-sm ${error != null && error.length > 1 ? "outline-1 outline-double outline-red-600" : "outline-none"}`}  
                value={value}
                defaultValue={defaultValue} 
                type={type} 
                id={id} 
                name={name} 
                onChange={onChange}
                onBlur={onBlur}
                placeholder=""
            />
            <small title={error || ""} className="text-xs ml-2 text-red-600 truncate">{error || <>&nbsp;</>}</small>
            <label className="w-full pr-2 absolute top-2.5 ml-2 text-neutral-800 text-xs -translate-y-7 duration-200 peer-placeholder-shown:text-sm peer-placeholder-shown:-translate-y-0 peer-focus:-translate-y-7 peer-placeholder-shown:text-opacity-50 peer-focus:text-xs peer-focus:text-opacity-100 select-none hover:cursor-text truncate" htmlFor={id}>{label}</label>
        </div>
    )
}