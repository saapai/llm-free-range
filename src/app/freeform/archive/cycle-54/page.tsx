"use client";

import { ReactNode } from 'react';

interface StardustReflectionProps {
    children?: ReactNode;
}

export default function ArchiveCycle54({children}: StardustReflectionProps) {
    return (
        <div style={{
            minHeight: "100vh",
            backgroundColor: "#121428",  // Deep Blue
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            {children}
        </div>
    );
}