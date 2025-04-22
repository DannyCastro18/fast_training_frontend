import React from "react";
export default BaseModal = ({isVisible, onClose, children})=>{
    if(!isVisible )return null;
    return(
        <>
            <div className="fixed inset-0 bg-white flex justify-center items-center">
                <div className="p-8 rounded-lg w-[60%] relative h-72">
                    <button onClick={onClose} className="absolute top-2 right-2 text-red-500">
                        $times;
                    </button>
                    {children}
                </div>
            </div>
        </>
    )
}