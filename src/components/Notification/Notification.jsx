import React from "react";
import { NoIcon } from '../Icons/Icon';
import "./Notification.css"

const Notification = ({
    message,
    type,
    isShow = false,
}) => {
    return (
        <div className="notification-wrapper">
            <div className="icon info">
                <NoIcon />
            </div>
            <div>
                <p className="message">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                <p className="show-button">Show</p>
            </div>
            <div className="close-button">
                <NoIcon />
            </div>
        </div>
    );
};

export default Notification;