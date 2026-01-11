'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { BLUR_DATA_URL } from '@/shared/lib/images/blurDataUrl';

type Props = {
    src: string;
    alt: string;
    className?: string;
    fill?: boolean;
    width?: number;
    height?: number;

    priority?: boolean;
};

export function ProductImage({
    src,
    alt,
    className,
    fill = true,
    width,
    height,
    priority,
}: Props) {
    const fallback = '/images/placeholder.jpg';
    const [currentSrc, setCurrentSrc] = useState(src || fallback);

    useEffect(() => {
        setCurrentSrc(src || fallback);
    }, [src]);


    return (
        <Image
            className={className}
            src={currentSrc}
            alt={alt}
            fill={fill}
            width={fill ? undefined : width}
            height={fill ? undefined : height}
            sizes="(max-width: 560px) 100vw, (max-width: 1100px) 50vw, 33vw"
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
            onError={() => {
                setCurrentSrc(fallback);
            }}
        />
    );
}
