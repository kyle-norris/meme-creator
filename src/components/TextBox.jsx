import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Group, Text, Transformer } from "react-konva";

export default function TextBox() {
    const textRef = useRef(null);
    const groupRef = useRef(null);
    const transformRef = useRef(null);
    const [isTransformable, setIsTransformable] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [position, setPosition] = useState({
        x: 50,
        y: 50,
    });

    useEffect(() => {
        if (isTransformable == true) {
            transformRef.current.nodes([textRef.current]);
        }

    }, [isTransformable]);


    return (
        <Group
            ref={groupRef}
            onMouseOver={(e) => {
                setIsTransformable(true);
                e.target.getStage().container().style.cursor = 'pointer';
            }}
            onMouseLeave={(e) => {
                e.target.getStage().container().style.cursor = 'default';
                setIsTransformable(false);
            }}>
            <Text
                ref={textRef}
                text="Draggable Text"
                x={position.x}
                y={position.y}
                draggable
                fontSize={30}
                fill={isDragging ? 'green' : 'white'}
                className={isDragging ? 'cool' : ''}
                onDragStart={(e) => {
                    e.target.getStage().container().style.cursor = 'grabbing';
                    setIsDragging(true);
                }}
                onDragEnd={(e) => {
                    e.target.getStage().container().style.cursor = 'pointer';
                    setIsDragging(false);
                    setPosition({
                        x: e.target.x(),
                        y: e.target.y(),
                    });
                }}
            />
            {isTransformable &&
                <Transformer
                    ref={transformRef}
                />
            }
        </Group>
    )
}