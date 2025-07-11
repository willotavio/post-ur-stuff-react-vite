import { Skeleton } from "../ui/skeleton/Skeleton"

export const AddPostFormSkeleton = () => {
    return (
        <div className="flex flex-col gap-8 p-6 rounded-lg items-center">
            <Skeleton width={200} height={130} />
        </div>
    )
}