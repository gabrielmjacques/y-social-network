interface ButtonProps {
    children: React.ReactNode;
    type?: "primary" | "outlined";
    size?: "sm" | "md" | "lg";
    onClick: () => void;
}

export default function Button(props: ButtonProps) {

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

    let btnClass: string = '';

    if (props.type == "primary" || !props.type) {
        btnClass = `bg-cyan-600 rounded-full font-bold ${sizeClass}
        hover:bg-cyan-700 transition-all
        active:bg-cyan-800`;

    } else if (props.type == "outlined") {
        btnClass = `text-cyan-300 border border-white border-opacity-30 rounded-full font-bold ${sizeClass}
        hover:bg-cyan-700 hover:bg-opacity-20 transition-all
        active:bg-cyan-800 active:bg-opacity-20`;
    }

    // Primary button
    return (
        <>
            <button onClick={() => { props.onClick(); }} className={btnClass}>{props.children}</button >
        </>
    );
}