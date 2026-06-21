import React,{ useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { hideAlert } from '../store/alertSlice'

import css from './Alert.module.css';

export default function Alert() {
    const dispatch = useDispatch();
    const { isOpen, message, type } = useSelector(state => state.alert);

    useEffect(() => {
        if (!isOpen) return;

        const timer = setTimeout(() => {
            dispatch(hideAlert());
        }, 3000);
        return () => clearTimeout(timer);
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className={`${css.alert} ${css[type]}`}>
            <span>{message}</span>
            <button onClick={() => dispatch(hideAlert())}>X</button>
        </div>
    );
}