import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Alert({ text, height, width, timeOnScreen }) {
    const [timeState, setTimeState] = useState(1000 * timeOnScreen);
    const [isVisible, setIsVisible] = useState(true);

    if (timeState) {
        setInterval(() => {
            setIsVisible(false);
        }, timeState);
    }
    return (
        <>
            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{
                            transform: ["translatex(100px)", "translatex(0px)"],
                            opacity: 1,
                        }}
                        transition={{
                            duration: 0.8,
                            type: "spring",
                            stiffness: 200,
                        }}
                        exit={{
                            opacity: 0,
                            transform: [
                                "translatex(-100px)",
                                "translatex(0px)",
                            ],
                        }}
                        style={{ height, width }}
                        className="flex items-center justify-center absolute top-[40px] right-[100px] text-xs bg-red rounded text-white"
                    >
                        <p>{text}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

export default Alert;
