export default function formatDate(date: Date) {
    const dateSlices = date.toString().split("T")[0]
        .split("-")
    return `${dateSlices[2]}/${dateSlices[1]}/${dateSlices[0]}`
}