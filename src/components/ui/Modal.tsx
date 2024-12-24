import { X } from "@phosphor-icons/react"

type TProps = {
    children?: React.ReactNode
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const Modal = ({ setIsOpen, children }: TProps) => {
    return(
        <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center">
            <div className="bg-white m-auto rounded-lg h-auto flex flex-col" onClick={(e) => e.stopPropagation()}>
                <X size={24} className="hover:cursor-pointer hover:opacity-80 ml-auto m-2" onClick={() => setIsOpen(false)} />
                <div className="m-2">
                    { children }
                </div>
            </div>
        </div>
    )
}