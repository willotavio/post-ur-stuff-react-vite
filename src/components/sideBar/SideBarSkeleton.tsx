import { Skeleton } from "../ui/skeleton/Skeleton"

export const SideBarSkeleton = () => {
    return (
        <div className="flex flex-col gap-2 border-solid border-r-2 border-gray-300 p-2 h-full fixed z-50">
            <Skeleton className="rounded-lg p-2 min-w-10 sm:min-w-36" height={40} />
            <Skeleton className="rounded-lg p-2 min-w-10 sm:min-w-36" height={40} />
            <Skeleton className="rounded-lg p-2 min-w-10 sm:min-w-36" height={40} />
            <Skeleton className="rounded-lg p-2 min-w-10 sm:min-w-36" height={40} />
            <Skeleton className="rounded-lg p-2 min-w-10 sm:min-w-36" height={40} />
        </div>
    )
}