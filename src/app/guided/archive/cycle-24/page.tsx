"use client";

import { useEffect } from 'react';

export default function ArchiveCycle24() {
    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#2E3A5C' }}>
            <Header />
            <Body />
        </div>
    );
}

function Header() {
    const [title, setTitle] = useState('Unveiling the Mysteries of the Cosmos');
    
    useEffect(() => {
        // Animation to reveal the title
        setTimeout(() => setTitle(title.split("").reverse().join("")), 2000);
        
        return () => setTitle('');
    }, []);
    
    return (
        <div style={{ color: '#EDE5D5', fontSize: '3.9rem', textAlign: 'center' }}>
            {title}
        </div>
    );
}

function Body() {
    const [content, setContent] = useState('');
    
    useEffect(() => {
        // Fetch and populate content
        fetch('/api/cosmic-exploration')
            .then(response => response.json())
            .then((data) => {
                setTimeout(() => setContent(data), 2000);
            });
        
        return () => setContent('');
    }, []);
    
    return (
        <div style={{ padding: '4rem', color: '#F4EFE6' }}>
            {content}
        </div>
    );
}