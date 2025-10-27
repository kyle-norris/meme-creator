
import useImage from "use-image";
import { Image } from "react-konva";
import { useEffect, useRef } from "react";

export default function URLImage({ src, handleSizeChange, ...params }) {
    const imageRef = useRef(null);
    const [image] = useImage(src);

    useEffect(() => {
        if (image) {
            var width = image.width;
            var height = image.height;
            var aspectRatio = width / height;

            var newWidth = imageRef.current.getStage().width();
            var newHeight = newWidth / aspectRatio;
            imageRef.current.width(newWidth);
            imageRef.current.height(newHeight);
            imageRef.current.cropHeight(newHeight);

            handleSizeChange(newWidth, newHeight, width, height)
        }
    }, [image])

    return (
        <Image ref={imageRef} image={image} {...params} />
    );
};