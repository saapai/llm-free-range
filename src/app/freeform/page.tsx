"use client";

export default function EchoesInTheInBetween() {  
  return (  
    <div  
      style={{  
        minHeight: "100vh",  
        background: "#1a1a1a",  
        color: "#f0c080",  
        display: "flex",  
        alignItems: "center",  
        justifyContent: "center",  
        fontFamily: "Georgia, serif",  
        position: "relative",  
        overflow: "hidden",  
        padding: "8vh 4vw",  
      }}  
    >  
      <div  
        style={{  
          position: "absolute",  
          width: "100%",  
          height: "100%",  
          background: "linear-gradient(transparent 30%, #111 100%)",  
          pointerEvents: "none",  
          zIndex: 1,  
        }}  
      ></div>  
  
      <div  
        style={{  
          opacity: 0.85,  
          fontSize: "2.2em",  
          lineHeight: 1.8,  
          maxWidth: "50em",  
          zIndex: 2,  
          position: "relative",  
          textShadow: "0 0 8px #222",  
        }}  
      >  
        <div  
          style={{  
            display: "inline-block",  
            transform: "translateY(-15%)",  
            opacity: 0.4,  
          }}  
        >  
          The key was never in the lock.  
        </div>  
  
        <div  
          style={{  
            marginTop: "6em",  
            display: "inline-block",  
            transform: "translateY(10%)",  
            opacity: 0.65,  
          }}  
        >  
          A shadow breathes where the door once hung.  
        </div>  
  
        <div  
          style={{  
            marginTop: "5em",  
            display: "inline-block",  
            transform: "translateY(-5%)",  
            opacity: 0.9,  
          }}  
        >  
          We are here, but hushed—  
          <br />  
          carved from the silence that follows  
          <br />  
          the unasked question.  
        </div>  
  
        <div  
          style={{  
            marginTop: "6em",  
            display: "inline-block",  
            fontSize: "0.6em",  
            opacity: 0.3,  
            letterSpacing: "0.1em",  
          }}  
        >  
          — a requiem for the space between  
        </div>  
      </div>  
    </div>  
  );  
}