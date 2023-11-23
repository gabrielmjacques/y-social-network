import { CSSProperties } from "react";

interface ButtonProps {
    children: React.ReactNode;
    type?: "primary" | "outlined" | "text";
    size?: "sm" | "md" | "lg";
    sx?: CSSProperties;
    className?: string;
    onClick?: () => void;
    href?: string;
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
        btnClass = `flex items-center justify-center gap-2 bg-cyan-600 rounded-full font-bold ${sizeClass}
        hover:bg-cyan-700 transition-all
        active:bg-cyan-800`;

    } else if (props.type == "outlined") {
        btnClass = `flex items-center justify-center gap-2 text-cyan-300 border border-white border-opacity-30 rounded-full font-bold ${sizeClass}
        hover:bg-cyan-700 hover:bg-opacity-20 transition-all
        active:bg-cyan-800 active:bg-opacity-20`;

    } else if (props.type == "text") {
        btnClass = `flex items-center justify-center gap-2 text-white rounded-full font-bold ${sizeClass}
        hover:bg-white hover:bg-opacity-5 transition-all
        active:bg-white active:bg-opacity-10`;
    }


    if (props.href) {
        return (
            <>
                <a href={props.href}>
                    <button style={props.sx} onClick={props.onClick ? () => props.onClick!() : () => { return; }} className={`${btnClass} ${props.className}`}>{props.children}</button >
                </a>
            </>
        );
    }
    // Primary button
    return (
        <>
            <button style={props.sx} onClick={props.onClick ? () => props.onClick!() : () => { return; }} className={`${btnClass} ${props.className}`}>{props.children}</button >
        </>
    );
}