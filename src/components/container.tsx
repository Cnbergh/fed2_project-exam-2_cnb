'use client';
import React from 'react'
interface ContainerProps { children: React.ReactNode }

const Container : React.FC<ContainerProps> = ({ children }) => {
    return (
        <div
        className="
        max-w-[1777px]
        mx-auto
        md:px-3
        sm:px-2
        px-4
        "
        >
            {children}
        </div>
    )
}


export default Container