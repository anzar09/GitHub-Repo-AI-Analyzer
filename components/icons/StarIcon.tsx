import React from 'react';

const StarIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.321h5.365a.563.563 0 0 1 .328 1.004l-4.253 3.13a.563.563 0 0 0-.184.64l1.52 4.673a.563.563 0 0 1-.816.623l-4.48-2.61a.563.563 0 0 0-.642 0l-4.48 2.61a.563.563 0 0 1-.816-.623l1.52-4.673a.563.563 0 0 0-.184-.64L2.038 9.935a.563.563 0 0 1 .328-1.004h5.365a.563.563 0 0 0 .475-.321L11.48 3.5Z" />
    </svg>
);

export default StarIcon;
