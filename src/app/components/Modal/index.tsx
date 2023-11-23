"use client";

import { useEffect, useState } from "react";

interface ModalProps {
    children: React.ReactNode;
    isOpen: boolean;
    onClose: () => void;
    title?: string;
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
        }, 500);
    }

    useEffect(() => {
        if (props.isOpen) {
            handleOnOpen();

        } else {
            handleOnClose();
        }
    }, [props.isOpen]);

    return (
        <div className={`fixed inset-0 z-30 backdrop-brightness-50 backdrop-blur-sm transition duration-500 ${isOpen ? "block" : "hidden"}`} style={{ opacity: modalStyles.opacity }}>

            <div className="fixed top-1/2 left-1/2 bg-gray-950 border border-white border-opacity-10 text-white z-50 w-10/12 md:w-5/12 h-5/6 rounded-xl shadow-2xl flex flex-col transition duration-300" style={{ transform: `translate(-50%, ${modalStyles.translateY}%` }}>
                <div className="p-5 flex justify-between border-b-4 border-white border-opacity-10">
                    <h3 className="font-bold text-lg opacity-80">{props.title ? props.title : ""}</h3>

                    <button className="transition hover:opacity-50 active:scale-95" onClick={() => props.onClose()}>
                        <img src="icons/close.svg" alt="" />
                    </button>
                </div>

                <div className="p-5 h-full">
                    {props.children}
                </div>
            </div>

        </div>
    );
};