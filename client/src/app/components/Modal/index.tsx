"use client";

import { useEffect, useState } from "react";
import Button from "../Button";

interface ModalProps {
    children: React.ReactNode;
    isOpen: boolean;
    onClose: () => void;
}

export default function Modal(props: ModalProps) {
    const [isOpen, setIsOpen] = useState(props.isOpen);
    const [modalStyles, setModalStyles] = useState({
        opacity: 0,
        translateY: -10
    });

    const translateYOffset = {
        initial: -50,
        offset: -40
    };

    function handleOnOpen() {
        setIsOpen(true);

        setTimeout(() => {
            setModalStyles({
                opacity: 1,
                translateY: translateYOffset.initial
            });
        }, 50);
    }

    function handleOnClose() {
        setModalStyles({
            opacity: 0,
            translateY: translateYOffset.offset
        });

        setTimeout(() => {
            setIsOpen(false);
            props.onClose();
        }, 300);
    }

    useEffect(() => {
        if (props.isOpen) {
            document.body.addEventListener("keydown", (e) => {
                if (e.key === "Escape") {
                    handleOnClose();
                }
            });

            handleOnOpen();

        } else {
            handleOnClose();
        }
    }, [props.isOpen]);

    return (
        <div className={`fixed inset-0 z-50 backdrop-brightness-50 backdrop-blur-sm transition duration-500 ${isOpen ? "block" : "hidden"}`} style={{ opacity: modalStyles.opacity }}>

            <div className="fixed inset-0 z-40" onClick={() => props.onClose()}></div>

            <div className="fixed top-1/2 left-1/2 bg-gray-950 border border-white border-opacity-10 text-white z-50 w-10/12 md:w-5/12 rounded-xl shadow-2xl flex flex-col transition duration-300" style={{ transform: `translate(-50%, ${modalStyles.translateY}%` }}>
                <div className="p-2 flex justify-between">
                    <Button type="text" size="sm" sx={{ padding: 10 }} onClick={() => props.onClose()}>
                        <img src="icons/close.svg" className="w-4 opacity-50" alt="" />
                    </Button>
                </div>

                <div className="p-5 h-full">
                    {props.children}
                </div>
            </div>

        </div>
    );
};