TSX
import React from 'react';

const AurorasPage = () => {
    return (
        <div className="bg-[#F4EFE6] text-[#1C1A17] min-h-screen flex justify-center items-center">
            <section className="max-w-prose mx-auto px-8 lg:px-0 py-12 space-y-6">
                <div>
                    <h1 className="text-5xl md:text-7xl leading-tight font-serif font-semibold text-center" style={{letterSpacing: '-0.03em'}}>The Natural Wonder of Auroras</h1>
                    <p className="mt-4 italic text-lg text-[#6B6560]">Curious Enlightenment</p>
                </div>
                <div className="space-y-8">
                    <p>
                        Auroras, also known as the Northern or Southern Lights, are natural light displays in Earth's sky. They occur when charged particles from the Sun collide with Earth's atmosphere and release energy that excites atoms, causing them to emit light. This phenomenon results in stunning colorful displays that captivate all who witness them.
                    </p>
                    <h2 className="text-3xl font-serif font-semibold">Different Types of Auroras</h2>
                    <p>
                        There are two main types of auroras: the Northern Lights (Aurora Borealis) and the Southern Lights (Aurora Australis). The former is visible in high-latitude regions around the Arctic, including parts of Alaska, Canada, Greenland, Iceland, Norway, Sweden, Finland, and Russia. On the other hand, the Southern Lights are typically seen in Antarctica and surrounding areas such as New Zealand, Australia, Argentina, Chile, and South Georgia Island.
                    </p>
                    <h2 className="text-3xl font-serif font-semibold">Impact on Our Planet</h2>
                    <p>
                        Auroras not only provide a breathtaking sight but also serve as indicators of space weather conditions. Space weather can impact various technologies like satellites, power grids, and radio communications. Studying auroras helps scientists understand the processes behind these phenomena, enabling them to predict and mitigate potential issues arising from extreme space weather events.
                    </p>
                </div>
            </section>
        </div>
    );
};

export default AurorasPage;