import React, { useRef, useEffect, useState } from "react";
import './WebcamComponent.css'

const WebcamComponent = () => {
    const videoRef = useRef(null);
    const [error, setError] = useState(null);
    const [pressed, setPressed] = useState(false);

    function handlePressedButton() {
        setPressed(!pressed);
        console.log(pressed);
    }

    useEffect(() => {
        let stream;
        const getWebcamStream = async () => {

            try {
                stream = await navigator.mediaDevices.getUserMedia({ video: true });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            } catch (err) {
                setError(err.message);
            }

        };

        if (pressed) {
            getWebcamStream();
        }

        return () => {
            if (stream) {
                stream.getTracks().forEach(track => track.stop()); // Stop all tracks
            }
        };
    }, [pressed]);

    return (
        <div className="video-container">
            {error ? (
                <div>Error: {error}</div>
            ) : (<>
                <video ref={videoRef} autoPlay playsInline width="640" height="480" />
                <button className="videoButton" onClick={handlePressedButton} >Click me</button>
            </>
            )}
        </div>
    );
};

export default WebcamComponent;
