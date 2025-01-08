declare module 'react-image' {
    import * as React from 'react';

    interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
        src: string;
        alt?: string;
        // Add other props as needed
    }

    export const Img: React.FC<ImageProps>;
    export default Img;
}