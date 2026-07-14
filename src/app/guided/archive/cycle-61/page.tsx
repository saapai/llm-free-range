"use client";

import { useEffect } from 'react';
import * as THREE from 'three';
import NebulaTexture from './nebula.jpg';

export default function ArchiveCycle61() {
    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true });

        // Set the scene background with a nebula texture
        scene.background = new THREE.TextureLoader().load(NebulaTexture);

        camera.position.z = 25;

        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        const animate = () => {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        }

        animate();
    }, []);

    return (
        <div style={{ minHeight: "100vh" }}>
            <h1 style={{ fontSize: `clamp(2.1rem, 1.3rem + 4.2vw, 3.9rem)`, color: '#EDE5D5' }}>Indifferent Universe</h1>
            <div style={{ width: '44rem', color: '#F4EFE6', fontFamily: "'Georgia', serif", lineHeight: 1.92, paddingBottom: '3em' }}>
                <p>The universe stretched out before us, a vast expanse of darkness punctuated by the ethereal glow of distant galaxies and nebulae.</p>
                <p>As we gaze into this timeless abyss, we cannot help but feel our own insignificance amidst such cosmic grandeur. Yet there is a strange sense of connection to be found in that very insignificance - a reminder that we are all made of star-dust and bound together by the same fundamental forces.</p>
                <p>This piece invites you to contemplate your place within this infinite tapestry, to marvel at its beauty and mystery, and perhaps even glimpse something true about being alive right now. So take a moment to lose yourself in these celestial vistas, and let them awaken within you an unquenchable curiosity for the cosmos.</p>
            </div>
        </div>
    )
}