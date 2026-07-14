"use client";

typescript
/* use client */
export default () => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-around',
            height: '100vh',
            backgroundColor: '#050926'
        }}>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
                <h1 style={{
                    fontSize: '48px',
                    color: '#F7D64A'
                }}>The Dance of the Cosmos</h1>
                <p style={{
                    fontSize: '24px',
                    marginTop: '30px',
                    textAlign: 'center',
                    color: '#C7E9F5'
                }}>
                    Step into the awe-inspiring world of cosmic expansion. Here, galaxies swirl together in an eternal dance, stars are born and die amidst dazzling colors, and planets spin around their orbits in perfect harmony. Be transported to a realm that ignites your curiosity and humbles you with its vastness. You're part of this endless universe — embrace the infinite journey ahead.
                </p>
            </div>
            
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around',
                marginTop: '100px'
            }}>
                
                {/* Galaxy illustration */}
                <div style={{
                    backgroundColor: '#3A4568',
                    width: '25%',
                    height: '50vh',
                    borderRadius: '50%'
                }}></div>
                
                {/* Star illustration */}
                <div style={{
                    backgroundColor: '#F7D64A',
                    width: '12%',
                    height: '30vh',
                    borderRadius: '50%'
                }}></div>
                
                {/* Planet illustration */}
                <div style={{
                    backgroundColor: '#C7E9F5',
                    width: '18%',
                    height: '36vh',
                    borderRadius: '50%'
                }}></div>
            </div>
        </div>
    )
}