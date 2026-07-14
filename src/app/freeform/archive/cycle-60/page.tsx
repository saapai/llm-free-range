"use client";

`use client`
export default function ArchiveCycle60() {
return (
<div style={{
    minHeight: '100vh',
    backgroundColor: '#000',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
}}>
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="-50 -50 100 100">
        <defs>
            <radialGradient id="starGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                <stop offset="25%" stopColor="#fff" stopOpacity={.8} />
                <stop offset="95%" stopColor="#fff" stopOpacity={.1} />
            </radialGradient>
        </defs>
        {Array.from({ length: 70 }).map((_, i) => (
            <circle key={i} style={{
                fill: 'url(#starGradient)',
                opacity: Math.random(),
                r: .2 + Math.random() * .8,
                transform: `translate(${Math.random()*10 - 5}, ${Math.random()*10-5})`,
            }} />
        ))}
    </svg>
    <div style={{
        position: 'absolute',
        top: 24,
        right: 24,
        fontFamily: 'sans-serif',
        textAlign: 'right',
        color: '#fff'
    }}>
        <h1 style={{margin: 0, fontSize: 36}}>Indifferent Cosmos</h1>
        <p style={{margin: 0, fontSize: 18, opacity: .7}}>A Meditation on Scale and Silence</p>
    </div>
</div>
)
}