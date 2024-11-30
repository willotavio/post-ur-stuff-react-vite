import { IconProps } from "@phosphor-icons/react"

type TProps = {
    message: string,
    icon?: React.ElementType<IconProps>
}

export const ErrorToast = ({ message, icon: IconComponent }: TProps) => {
    return(
        <div className="flex flex-row gap-3 fixed top-0 z-50 bg-red-600 text-white p-2 rounded-lg my-4 self-center animate-fadeInOut">
            <p>{ message }</p>
            { IconComponent ? <IconComponent size={24} /> : "" }
        </div>
    )
}