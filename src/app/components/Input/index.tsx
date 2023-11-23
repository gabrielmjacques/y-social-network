interface InputProps {
    placeholder: string;
    type?: string;
    size?: "sm" | "md" | "lg";
}

export default function Input(props: InputProps) {
    let sizeClass: String = '';

    switch (props.size) {
        case "sm":
            sizeClass = 'px-5 py-2 text-sm';
            break;
        case "md":
            sizeClass = 'px-7 py-3 text-base';
            break;
        case "lg":
            sizeClass = 'px-8 py-4 text-xl';
            break;

        default:
            sizeClass = 'px-7 py-3 text-base';
            break;
    }

    return (
        <>
            <input
                className={`rounded-full bg-white bg-opacity-5 ${sizeClass}`}
                type={props.type || "text"}
                placeholder={props.placeholder} />
        </>
    );
}