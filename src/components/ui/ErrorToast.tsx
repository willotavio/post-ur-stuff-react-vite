type TProps = {
    message: string
}

export const ErrorToast = ({message}: TProps) => {
    return(
        <div className="fixed top-0 z-50 bg-red-600 text-white p-2 rounded-lg m-2 animate-fadeInOut">
            <p>{ message }</p>
        </div>
    )
}