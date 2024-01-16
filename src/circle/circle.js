import React, { useEffect, useState } from 'react';
import "./circle.css";

function Text(props) {
    const { text, circle, r } = props;
    const { loc } = circle;
    const yOffset = r / 8;
    const [bottomTextClass, setBottomTextClass] = useState("");
    const [topTextClass, setTopTextClass] = useState("");
    const [bottomTextContent, setBottomTextContent] = useState([]);

    useEffect(() => {
        if (circle.mesh && circle.deleteNode !== undefined) {
            setBottomTextClass("textBottomAfter");
            setTopTextClass("textTopAfter1");
            setBottomTextContent(['(Has Mesh)']);
        }
        else if (circle.deleteNode) {
            setBottomTextClass("textBottomAfter");
            setTopTextClass("textTopAfter1");
            if (circle.next.length > 0) {
                setBottomTextContent(['(Empty Node)', 'Delete']);
            }
            else {
                setBottomTextContent(['(No Mesh)', 'Delete']);
            }
        }
    }, [circle]);

    return (
        <>
            <text
                fontSize="1.7"
                fill='white'
                className={`text ${topTextClass}`}
                x={loc.x}
                y={loc.y + yOffset}
                textAnchor="middle">
                {text}
            </text>
            {circle.deleteNode !== undefined && (
                <text
                    fontSize="1.25"
                    fill={circle.deleteNode ? "#BA4E4E" : "white"}
                    className={`text textBottom ${bottomTextClass}`}
                    x={loc.x}
                    y={loc.y + yOffset}
                    textAnchor="middle">
                    {bottomTextContent.map((line, index) => (
                        <tspan key={index} x={loc.x} dy={index === 0 ? 0 : "1em"}>
                            {line}
                        </tspan>
                    ))}
                </text>
            )}
        </>
    );
}

function Line(props) {
    const { data } = props;
    const { checkLine, isLineInPath } = data;

    const [isInit, setInit] = useState(false);

    useEffect(() => {
        if (isLineInPath) {
            setInit(true);
        }
    }, [isLineInPath]);

    if (checkLine) {
        if (isLineInPath) {
            return <line {...data} className="line line-white line-forward" />;
        } else if (isInit && !isLineInPath) {
            return <line {...data} className="line line-white line-reverse" />;
        } else {
            return null;
        }
    }

    return <line {...data} />;
}

const Circle = (props) => {
    const { nextData, data, current, } = props;
    const { loc, text, layer, deleteNode } = data;
    const r = 4.5;

    const isInPath = (circleId) => {
        return current.path.includes(circleId);
    };


    return (
        <>
            {nextData.map((nextCircle, key) => {
                const isLineInPath = isInPath(data.id) && isInPath(nextCircle.id);
                const lineKey = `line-${data.id}-${nextCircle.id}`;
                const lineWhiteKey = `line-white-${data.id}-${nextCircle.id}`;
                return (
                    <>
                        <Line
                            layer={layer}
                            key={lineKey}
                            data={{

                                className: "line line-forward",
                                x1: loc.x,
                                y1: loc.y,
                                x2: nextCircle.loc.x,
                                y2: nextCircle.loc.y,
                                checkLine: false,
                                isLineInPath: isLineInPath

                            }} />

                        <Line
                            key={lineWhiteKey} data={{
                                className: "line line-white line-forward",
                                x1: loc.x,
                                y1: loc.y,
                                x2: nextCircle.loc.x,
                                y2: nextCircle.loc.y,
                                checkLine: true,
                                isLineInPath: isLineInPath
                            }} />
                    </>
                );
            })}
            <circle
                style={{
                    animationDelay: `${layer * 0.1}s`
                }}
                className={"circle-path"}
                cx={loc.x} cy={loc.y}
                r={r}
                strokeDashoffset={r * Math.PI * 2 + 1}
                strokeDasharray={r * Math.PI * 2 + 1}
                stroke={"#2E3035"}
                strokeWidth="0.4"
                fill="none" />

            {isInPath(data.id) &&
                <circle
                    style={{
                    }}
                    className={"circle-path circle-path-white"}
                    cx={loc.x} cy={loc.y}
                    r={r}
                    strokeDashoffset={r * Math.PI * 2 + 1}
                    strokeDasharray={r * Math.PI * 2 + 1}
                    stroke={"white"}
                    strokeWidth="0.4"
                    fill="none" />}

            {deleteNode && (
                <circle
                    cx={loc.x}
                    cy={loc.y}
                    r={r}
                    strokeDashoffset={r * Math.PI * 2 + 1}
                    strokeDasharray={r * Math.PI * 2 + 1}
                    stroke="#BA4E4E"
                    strokeWidth="0.4"
                    fill="none"
                    className="circle-path" />
            )}
            {
                (deleteNode === false) && (
                    <circle
                        cx={loc.x}
                        cy={loc.y}
                        r={r}
                        strokeDashoffset={r * Math.PI * 2 + 1}
                        strokeDasharray={r * Math.PI * 2 + 1}
                        stroke="#45BD4E"
                        strokeWidth="0.4"
                        fill="none"
                        className="circle-path" />
                )}



            <circle
                style={{
                    animationDelay: `${layer * 0.1 + 0.5}s`
                }}
                cx={loc.x}
                cy={loc.y}
                r={r - 0.1}
                fill='#474747'
                className="circle-fill" />

            <Text text={text} circle={data} r={r} />
        </>
    );
}

export default Circle;
