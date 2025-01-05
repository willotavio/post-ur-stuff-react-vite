import { User } from "../constants/types/user"

type TProps = {
    user: User
}

export const UserCard = ({ user }: TProps) => {
    return (
        user.id
        &&
        <div className="flex flex-col items-center">
            <span className="font-bold">{ user?.displayName } </span>
            <span className="text-gray-500">@{ user?.username }</span>
            <span>
                Joined at: { user?.joinedAt.toString().split("T")[0].split("-")[2] }/
                { user?.joinedAt.toString().split("T")[0].split("-")[1] }/
                { user?.joinedAt.toString().split("T")[0].split("-")[0] }
            </span>
            <span>{ user.description ?? "No description"}</span>
        </div>
    )
}