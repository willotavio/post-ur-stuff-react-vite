import { IconProps } from "@phosphor-icons/react"

type TProps = {
    message: string,
    icon?: React.ElementType<IconProps>
    backgroundColor: "info" | "success" | "error" | "warning"
}

const backgroundColors = {
    "info": "bg-blue-400",
    "success": "bg-green-500",
    "error": "bg-red-500",
    "warning": "bg-yellow-400"
}

export const ToastMessage = ({ message, icon: IconComponent, backgroundColor = "info" }: TProps) => {
    return(
        <div className={`flex flex-row gap-3 fixed top-0 z-50 p-2 rounded-lg my-4 self-center animate-fadeInOut text-white ${backgroundColors[backgroundColor]}`}>
            <p>{ message }</p>
            { IconComponent ? <IconComponent size={24} /> : "" }
        </div>
    )
}