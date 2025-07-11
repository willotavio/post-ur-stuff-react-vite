import ExtSkeleton, { SkeletonProps } from "react-loading-skeleton";

type Props = {
    className?: string
} & SkeletonProps

export const Skeleton = ({ baseColor = "#dbdbdb", ...rest }: Props) => {
    return (
        <ExtSkeleton 
            className={rest.className}
            width={rest.width}
            height={rest.height}
            baseColor={baseColor}
            circle={rest.circle}
            count={rest.count}
            duration={rest.duration}
            borderRadius={rest.borderRadius}
            enableAnimation={rest.enableAnimation}
            direction={rest.direction}
            highlightColor={rest.highlightColor}
        />
    )
}