// OffCanvasWrapper.tsx
import React, { ReactNode } from 'react';
import { Offcanvas } from 'react-bootstrap';

interface OffCanvasWrapperProps {
    show: boolean;
    handleClose: () => void;
    title: string;
    children: ReactNode;
    className?: string;
    placement?: 'start' | 'end' | 'top' | 'bottom';
}

const OffCanvasWrapper: React.FC<OffCanvasWrapperProps> = ({
    show,
    handleClose,
    title,
    children,
    className = '',
    placement = 'end'
}) => {
    return (
        <Offcanvas show={show} onHide={handleClose} className={`modal_sec_main ${className}`} placement={placement}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>{title}</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                {children}
            </Offcanvas.Body>
        </Offcanvas>
    );
};

export default OffCanvasWrapper;
