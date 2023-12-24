'use client';

import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { useRouter } from "next/navigation";
import { CSSProperties } from "react";

interface ButtonProps {
    children: React.ReactNode;
    type?: "primary" | "outlined" | "text";
    size?: "sm" | "md" | "lg";
    sx?: CSSProperties;
    className?: string;
    onClick?: () => void;
    href?: string;
    disabled?: boolean;
    loading?: boolean;
    htmlType?: "button" | "submit" | "reset";
    align?: "start" | "center" | "end" | "between";
}

export default function Button(props: ButtonProps) {
    const router = useRouter();

    let sizeClass: String = '';
    let alignClass: String = '';

    switch (props.size) {
        case "sm":
            sizeClass = 'p-2 text-sm';
            break;
        case "md":
            sizeClass = 'p-3 text-base';
            break;
        case "lg":
            sizeClass = 'p-4 text-xl';
            break;

        default:
            sizeClass = 'p-3 text-base';
            break;
    }

    switch (props.align) {
        case "start":
            alignClass = 'justify-start';
            break;
        case "center":
            alignClass = 'justify-center';
            break;
        case "end":
            alignClass = 'justify-end';
            break;
        case "between":
            alignClass = 'justify-between';
            break;

        default:
            alignClass = 'justify-center';
            break;
    }


    const baseClass = `flex items-center gap-2 rounded-full font-semibold transition-all duration-300 ${sizeClass} ${alignClass}
                        disabled:cursor-not-allowed disabled:bg-inherit disabled:text-white disabled:text-opacity-50
    `;
    let typeClass: string = '';

    if (props.type == "primary" || !props.type) {
        typeClass = `${baseClass} bg-cyan-500
        hover:bg-cyan-700
        active:bg-cyan-800
        `;

    } else if (props.type == "outlined") {
        typeClass = `${baseClass} border border-white border-opacity-30 text-cyan-300
        hover:bg-cyan-700 hover:bg-opacity-20
        active:bg-cyan-800 active:bg-opacity-20
        `;

    } else if (props.type == "text") {
        typeClass = `${baseClass} rounded-full font-bold ${sizeClass}
        hover:bg-white hover:bg-opacity-5
        active:bg-white active:bg-opacity-10
        `;
    }

    const handleClick = () => {
        if (props.onClick)
            props.onClick();

        if (props.href)
            router.push(props.href);
    };

    function ButtonRoot() {
        return (
            <button
                disabled={props.disabled || props.loading ? true : false}
                style={props.sx}
                onClick={handleClick}
                className={`${typeClass} ${props.className}`}
                type={props.htmlType ? props.htmlType : "submit"}
            >
                {props.children}

                {
                    props.loading &&
                    <Spin indicator={<LoadingOutlined />} />
                }
            </button >);
    };

    // Primary button
    return (
        <ButtonRoot />
    );
}