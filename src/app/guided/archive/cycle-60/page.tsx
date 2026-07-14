"use client";

typescript
import { FC } from 'react';

const ExplorationArt: FC = () => (
    <div style={{ minHeight: "100vh", backgroundColor: "#F4EFE6" }}>
        <h1 style={{ fontSize: `clamp(2.1rem, 1.3rem + 4.2vw, 3.9rem)`, textAlign: "center", marginTop: "50px" }}>Unraveling the Unseen</h1>
        <div style={{ display: "flex", justifyContent: "space-around", padding: "70px 0", fontFamily: "'Cormorant Garamond', Georgia, serif", lineHeight: "1.92" }}>
            <div style={{ width: "44rem" }}>
                <p>I am an artist venturing into the unknown, seeking answers hidden beneath layers of knowledge.</p>
                <p>Each step brings a new landscape to explore – science, history, philosophy, art. Every field has its own secrets waiting to be uncovered.</p>
                <p>Join me on this journey as we delve deeper into the mysteries of our existence and discover truths that lie beyond what we perceive.</p>
            </div>
        </div>
    </div>
);
export default ExplorationArt;