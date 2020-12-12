import React, {useEffect} from "react";
import {useSelector} from "react-redux";
import {getRefLeftPanel} from "../Store/selectors/workspace-selectors";

const useOutsideClick = (ref: React.MutableRefObject<any>, cb: () => void): void => {
    //console.log('useOutsideClick')
    const refLeftPanel = useSelector(getRefLeftPanel) as React.MutableRefObject<null>;
    useEffect(() => {
        //console.log('useEffect')
        //console.log(ref)
        // cb() if clicked outside of element
        // function handleClickOutside(event: MouseEvent): void {
        //     // contains - является ли узел (event.target), на котором нажали кнопку мыши
        //     // потомком данного узла (ref.current)
        //     if (
        //         ref.current !== null
        //         && !ref.current.contains(event.target)
        //         && refLeftPanel !== null
        //         // @ts-ignore
        //         && !refLeftPanel.current.contains(event.target)
        //     ) {
        //         console.log('cb')
        //         cb();
        //     }
        // }
        // Bind the event listener
        document.addEventListener("mousedown", cb);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", cb);
        };
    }, [ref, cb]);
}

export default useOutsideClick