type TProps = {
    type: string,
    label: string,
    id: string,
    name: string,
    defaultValue?: string,
    error?: string | null,
    callback: (e: string) => void
}

export const InputField = ({type, label, id, name, defaultValue, error, callback}: TProps) => {
    return(
        <div className="flex flex-col gap-y-2 relative">
            <input className={`peer bg-gray-100 rounded-lg h-10 px-2 shadow-lg text-sm ${error != null && error.length > 1 ? "outline-1 outline-double outline-red-600" : "outline-none"}`}  
                type={type} 
                id={id} 
                name={name} 
                defaultValue={defaultValue} 
                onChange={(e) => callback(e.target.value)}
                placeholder=""
            />
            <small title={error || ""} className="text-xs ml-2 text-red-600 truncate">{error || <>&nbsp;</>}</small>
            <label className="absolute top-2.5 ml-2 text-neutral-800 text-xs -translate-y-7 duration-200 peer-placeholder-shown:text-sm peer-placeholder-shown:-translate-y-0 peer-focus:-translate-y-7 peer-placeholder-shown:text-opacity-50 peer-focus:text-xs peer-focus:text-opacity-100 select-none hover:cursor-text" htmlFor={id}>{label}</label>
        </div>
    )
}