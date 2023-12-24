import { Input as AntInput, ConfigProvider, Form, theme } from "antd";
import { Rule } from "antd/es/form";
import { useEffect, useState } from "react";

interface InputProps {
    placeholder: string;
    name?: string;
    type?: string;
    size?: "sm" | "md" | "lg";
    rules?: Rule[];
    className?: string;
}

export default function Input(props: InputProps) {
    const [inputType, setInputType] = useState<string>("text");

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

    useEffect(() => {
        if (props.type) setInputType(props.type);
    }, []);

    return (
        <ConfigProvider
            theme={{ algorithm: theme.darkAlgorithm }}
        >
            <Form.Item
                name={props.name}
                rules={props.rules}
                className={`relative m-0 ${props.className} cursor-text`}
            >
                {
                    inputType === "password"
                        ? <AntInput.Password
                            placeholder={props.placeholder}
                            className={
                                `w-full rounded-full bg-white text-white placeholder-white placeholder-opacity-40 bg-opacity-5 border border-white ${props.className} border-opacity-10 
                    hover:border-white hover:border-opacity-20
                    focus:border-cyan-500 focus:border-opacity-30
                ${sizeClass}`
                            }
                        />
                        : <AntInput
                            type={inputType}
                            placeholder={props.placeholder}
                            className={
                                `w-full rounded-full bg-white text-white placeholder-white placeholder-opacity-40 bg-opacity-5 border border-white ${props.className} border-opacity-10 
                hover:border-white hover:border-opacity-20
                focus:border-cyan-500 focus:border-opacity-30
            ${sizeClass}`
                            }
                        />
                }
            </Form.Item>
        </ConfigProvider>
    );
}