"use client";

import { useState } from 'react';

const Djibouti = () => {
    const [textVisible, setTextVisible] = useState(false);
    
    setTimeout(() => setTextVisible(true), 1000);
    
    return (
        <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div style={{ textAlign: "center" }}>
                {textVisible && <p>As the ship docks at Djibouti's bustling port, a fascinating intersection of commerce and culture unfolds on the quayside. The scent of spices mingles with the metallic tang of shipping containers, while traders haggle over the price of fabrics and pottery.</p>}
            </div>
        </div>
    )
};

export default Djibouti;