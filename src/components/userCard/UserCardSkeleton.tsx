import { Skeleton } from "../ui/skeleton/Skeleton"

export const UserCardSkeleton = () => {
    return (
        <div className="flex flex-col items-center">
            <Skeleton width={100} height={20} />
            <Skeleton width={75} height={20} />
            <Skeleton width={150} height={20} />
            <Skeleton width={75} height={20} />
        </div>
    )
}