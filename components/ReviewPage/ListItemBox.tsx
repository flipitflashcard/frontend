import React, { useRef, useEffect, Fragment } from 'react';

// import MUI
import { Button } from '@mui/material';

interface ListItemProps {
    label: string,
    type: string,
    description: string,
    example: string,
    id: string | number;
    index: number;
    onEditAction: (id: string | number, label: string, type: string) => void;
    onDeleteAction: (id: string | number) => void;
}

interface UseSwipeOptions {
    completedThreshold?: number;
}

const ListItemBox = ({ id, index, label, type, description, example, onDeleteAction, onEditAction }: ListItemProps) => {

    const useSwipe = (
        { completedThreshold = 50 }: UseSwipeOptions = {}
    ) => {
        const ref = useRef<HTMLDivElement>(null);
        const startX = useRef<number | null>(null);
        const currentX = useRef<number>(0);
        const isSwipeComplete = useRef<boolean>(false);
        const isDragging = useRef<boolean>(false);

        useEffect(() => {
            if (ref.current) {
                ref.current.style.transition = "transform 150ms ease-out";
                ref.current.addEventListener('touchstart', handleTouchStart, { passive: false });
                ref.current.addEventListener('mousedown', handleMouseDown);
                document.addEventListener('touchend', resetHandler);
                document.addEventListener('mouseup', resetHandler);
            }

            return () => {
                if (ref.current) {
                    ref.current.removeEventListener('touchstart', handleTouchStart);
                    ref.current.removeEventListener('mousedown', handleMouseDown);
                }
                document.removeEventListener('touchend', resetHandler);
                document.removeEventListener('mouseup', resetHandler);
            };
        }, []);

        const handleTouchStart = (e: TouchEvent) => {
            e.preventDefault();
            startX.current = e.touches[0].clientX;
            isDragging.current = false;
            document.addEventListener('touchmove', handleTouchMove, { passive: false });
        };

        const handleMouseDown = (e: MouseEvent) => {
            e.preventDefault();
            startX.current = e.clientX;
            isDragging.current = false;
            document.addEventListener('mousemove', handleMouseMove);
        };

        const handleTouchMove = (e: TouchEvent) => {
            e.preventDefault();
            if (startX.current === null) return;
            const touchX = e.touches[0].clientX;
            const diff = touchX - startX.current;
            isDragging.current = true;
            updateSwipePosition(diff);
        };

        const handleMouseMove = (e: MouseEvent) => {
            e.preventDefault();
            if (startX.current === null) return;
            const diff = e.clientX - startX.current;
            isDragging.current = true;
            updateSwipePosition(diff);
        };

        const updateSwipePosition = (diff: number) => {
            if (!ref.current) return;

            currentX.current = diff;
            if (diff > 0) {
                ref.current.style.transform = `translateX(${diff}px)`;
                isSwipeComplete.current = Math.abs(diff) >= completedThreshold;
            }

        };

        const resetHandler = () => {
            document.removeEventListener('touchmove', handleTouchMove);
            document.removeEventListener('mousemove', handleMouseMove);

            if (isSwipeComplete.current) {
                isSwipeComplete.current = false;
                scrollOutOfView(currentX.current < 0);
            } else {
                if (!ref.current) return;
                ref.current.style.transition = "transform 150ms ease-out";
                ref.current.style.transform = "translateX(0)";
            }

            startX.current = null;
            currentX.current = 0;
            isDragging.current = false;
        };

        const scrollOutOfView = (isLeft: boolean) => {
            const TRANSITION_TIME = 300;

            if (ref.current) {
                ref.current.style.transition = `transform ${TRANSITION_TIME}ms ease-out`;
                ref.current.style.transform = `translateX(${200}px)`;
            }
        };

        return { ref };
    };

    const { ref } = useSwipe();

    return (
        <Fragment>
            <div className="list-item" style={index !== 0 ? { margin: '40px 0' } : { marginTop: '0' }} /*onClick={() => goToReviewPage(label)}*/>
                <div className='card-global-page-review mt-4' ref={ref}>
                    <div className='d-flex fex-row align-items-center'>
                        <h3 className='me-3 fw-bold'>{label}</h3>
                        <span className='border-type'>{type}</span>
                    </div>
                    <div className='mt-3'>
                        {description}
                    </div>
                    <div className='mt-3'>
                        {example}
                    </div>
                </div>
                <div className="list-item__option">
                    <div className='action__design' id={`action__design__${index}`}>
                        <Button
                            className='delete__btn__review me-4'
                            sx={{ "& .MuiButton-startIcon": { margin: "0px" } }}
                            startIcon={<svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M12.7466 22.5C11.3916 22.5 10.0706 22.485 8.7636 22.458C7.0916 22.425 5.9346 21.341 5.7456 19.629C5.4306 16.789 4.8916 10.095 4.8866 10.028C4.8526 9.61503 5.1606 9.25303 5.5736 9.22003C5.9806 9.20903 6.3486 9.49503 6.3816 9.90703C6.3866 9.97503 6.9246 16.646 7.2366 19.464C7.3436 20.437 7.8686 20.939 8.7946 20.958C11.2946 21.011 13.8456 21.014 16.5956 20.964C17.5796 20.945 18.1116 20.453 18.2216 19.457C18.5316 16.663 19.0716 9.97503 19.0776 9.90703C19.1106 9.49503 19.4756 9.20703 19.8846 9.22003C20.2976 9.25403 20.6056 9.61503 20.5726 10.028C20.5666 10.096 20.0246 16.807 19.7126 19.622C19.5186 21.369 18.3646 22.432 16.6226 22.464C15.2896 22.487 14.0036 22.5 12.7466 22.5Z" fill="#133266" />
                                <path fillRule="evenodd" clipRule="evenodd" d="M21.208 7.48932H4.25C3.836 7.48932 3.5 7.15332 3.5 6.73932C3.5 6.32532 3.836 5.98932 4.25 5.98932H21.208C21.622 5.98932 21.958 6.32532 21.958 6.73932C21.958 7.15332 21.622 7.48932 21.208 7.48932Z" fill="#133266" />
                                <path fillRule="evenodd" clipRule="evenodd" d="M17.9404 7.48931C16.8024 7.48931 15.8144 6.67831 15.5904 5.56231L15.3474 4.34631C15.2964 4.16131 15.0854 4.00031 14.8454 4.00031H10.6124C10.3724 4.00031 10.1614 4.16131 10.1004 4.39231L9.86739 5.56231C9.64439 6.67831 8.6554 7.48931 7.5174 7.48931C7.1034 7.48931 6.7674 7.15331 6.7674 6.73931C6.7674 6.3253 7.1034 5.98931 7.5174 5.98931C7.9434 5.98931 8.3134 5.68531 8.3974 5.26731L8.6404 4.05131C8.8874 3.11931 9.6944 2.50031 10.6124 2.50031H14.8454C15.7634 2.50031 16.5704 3.11931 16.8074 4.00631L17.0614 5.26731C17.1444 5.68531 17.5144 5.98931 17.9404 5.98931C18.3544 5.98931 18.6904 6.3253 18.6904 6.73931C18.6904 7.15331 18.3544 7.48931 17.9404 7.48931Z" fill="#133266" />
                            </svg>
                            }
                            onClick={() => onDeleteAction(id)}
                        >Delete</Button>
                        <Button
                            className='edit__btn__review'
                            sx={{ "& .MuiButton-startIcon": { margin: "0px" } }}
                            startIcon={<svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M13.28 4.29479C14.0557 3.36779 15.45 3.23186 16.3962 3.99173C16.4485 4.03296 18.1295 5.33879 18.1295 5.33879C19.169 5.96719 19.492 7.30311 18.8494 8.32259C18.8153 8.37718 9.31195 20.2645 9.31195 20.2645C8.99578 20.6589 8.51583 20.8918 8.00291 20.8973L4.36353 20.943L3.54353 17.4723C3.42866 16.9843 3.54353 16.4718 3.8597 16.0773L13.28 4.29479Z" stroke="#133266" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M11.5208 6.50092L16.9731 10.688" stroke="#133266" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            }
                            onClick={() => onEditAction(id, label, type)}
                        >Edit</Button>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default ListItemBox;
