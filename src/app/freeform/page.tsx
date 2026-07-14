"use client";

export default function FoldingTheUnreachable() {  
  return (  
    <div style={{ minHeight: "100vh", backgroundColor: "#f0e6db", position: "relative", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", padding: "4rem" }}>  
      <div style={{ position: "absolute", top: "10%", left: "5%", maxWidth: "40%", fontSize: "2.8rem", lineHeight: "1.6", fontFamily: "serif", color: "#8b7355", opacity: 0.85, transform: "rotate(-2deg)" }}>  
        We are the keepers of unanswerable questions.  
        The moon asks nothing of our bones.  
      </div>  
      <div style={{ position: "absolute", bottom: "20%", right: "5%", maxWidth: "30%", fontSize: "1.2rem", lineHeight: "1.8", fontFamily: "monospace", color: "#a08b7a", opacity: 0.7, borderLeft: "2px dashed #d4c8b9", paddingLeft: "1rem" }}>  
        404: The archive of tomorrow is already gone.  
        Lithium veins map where the earth forgets.  
        To fold is to remember how to dissolve.  
      </div>  
      <div style={{ position: "absolute", top: "50%", left: "50%", width: "80vw", height: "80vh", transform: "translate(-50%, -50%)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>  
        <div style={{ border: "1px solid #d4c8b9", width: "100%", height: "2px", backgroundColor: "#d4c8b9" }}></div>  
        <div style={{ fontSize: "2.4rem", fontFamily: "cursive", color: "#96705c", opacity: 0.9, textShadow: "0 0 4px #fff" }}>  
          To hold a place in the body is to hold a place in time.  
        </div>  
        <div style={{ border: "1px solid #d4c8b9", width: "100%", height: "2px", backgroundColor: "#d4c8b9" }}></div>  
      </div>  
      <div style={{ position: "absolute", bottom: "10%", left: "50%", transform: "translateX(-50%)", fontSize: "0.9rem", color: "#b5a28d", fontFamily: "sans-serif", opacity: 0.6, display: "flex", gap: "1rem" }}>  
        <span style={{ borderRight: "2px solid #e0d6c5", padding: "0 0.5rem" }}>crease: 30°</span>  
        <span style={{ borderRight: "2px solid #e0d6c5", padding: "0 0.5rem" }}>fold: 72%</span>  
        <span>unfurl: never</span>  
      </div>  
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, pointerEvents: "none", zIndex: -1, backgroundImage: "radial-gradient(circle at 20% 30%, #fff 1px, #f0e6db 1px)", backgroundSize: "40px 40px" }}></div>  
    </div>  
  );  
}