import React from 'react';
import "./circle.css"



const Circle = (props) => {
    const { nextData, data, current, setCurrent } = props;
    const { loc, color, text, layer } = data;
    const r = 4.5;
    const strokeColors = {
        neutral: "#2E3035",
        false: "#BA4E4E"
    }
    return (
        <>
            {nextData.map((nextCircle, key) => {
                return (
                    <>
                        <line
                            style={{
                                animationDelay: `${layer * 0.4 + 0.2}s`,
                            }}
                            className="line" x1={loc.x} y1={loc.y} x2={nextCircle.loc.x} y2={nextCircle.loc.y} stroke="#2E3035" strokeWidth="0.5" />

                        {current.current.id === data.id && current.nextIndex >= key ? (
                            <line
                                style={{
                                    animationDelay: `${layer * 0.4 + 0.2}s`,
                                }}
                                className="line" x1={loc.x} y1={loc.y} x2={nextCircle.loc.x} y2={nextCircle.loc.y} stroke="white" strokeWidth="0.5" />
                        ) : null}

                    </>

                )
            }
            )}

            <circle

                style={{
                    animationDelay: `${layer * 0.1}s`
                }}
                cx={loc.x} cy={loc.y} r={r}
                strokeDashoffset={r * 3.14 * 2 + 1}
                strokeDasharray={r * 3.14 * 2 + 1}
                stroke="#2E3035"
                strokeWidth="0.4"
                fill="none"
                className="circle-path" />
            <circle

                style={{
                    animationDelay: `${layer * 0.1 + 0.5}s`
                }}
                cx={loc.x} cy={loc.y} r={r - 0.1}
                fill='#474747'
                className="circle-fill" />
            <text fontSize="2" fill='white' className='text' x={loc.x} y={loc.y + r / 8} text-anchor="middle">{text}</text>

            <text fontSize="2" fill='white' className='text' x={loc.x} y={loc.y + r / 8} text-anchor="middle">{text}</text>
        </>
    );
}

export default Circle;
