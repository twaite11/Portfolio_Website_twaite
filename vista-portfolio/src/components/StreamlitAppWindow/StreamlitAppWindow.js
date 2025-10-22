import React, { useState } from 'react';

const StreamlitAppWindow = () => {
    const embedUrl = 'https://kookpy.streamlit.app/?embed=true';
    const directUrl = 'https://kookpy.streamlit.app/';
    const [loadError, setLoadError] = useState(false);

    return (
        <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
            {loadError && (
                <div style={{ padding: 12, background: '#fffbe6', borderBottom: '1px solid #e8e6cf', fontSize: 14 }}>
                    The embedded app could not be loaded here (possibly blocked by the browser). You can open it directly in a new tab:
                    {' '}<a href={directUrl} target="_blank" rel="noopener noreferrer">kookpy.streamlit.app</a>
                </div>
            )}
            <iframe
                title="Kookpy Surf AI Quality Predictor"
                src={embedUrl}
                style={{ flex: 1, border: 'none', width: '100%', height: '100%' }}
                allow="accelerometer; autoplay; clipboard-write; clipboard-read; encrypted-media; gyroscope; picture-in-picture; camera; microphone"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
                onError={() => setLoadError(true)}
            />
            <noscript>
                <div style={{ padding: 12 }}>
                    JavaScript is required to load the embedded app. You can open it directly here: <a href={directUrl} target="_blank" rel="noreferrer">kookpy.streamlit.app</a>
                </div>
            </noscript>
        </div>
    );
};

export default StreamlitAppWindow;
