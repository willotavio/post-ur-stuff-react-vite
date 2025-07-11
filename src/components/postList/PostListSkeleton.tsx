import { Skeleton } from "../ui/skeleton/Skeleton"

export const PostListSkeleton = () => {
    return (
        <div className="flex flex-col gap-6">
            <Skeleton className="min-w-2/3 min-h-16" />
            <hr />
            <Skeleton className="min-w-2/3 min-h-16" />
            <hr />
            <Skeleton className="min-w-2/3 min-h-16" />
        </div>
    )
} 