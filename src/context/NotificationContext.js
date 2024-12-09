import React, { createContext, useContext, useState } from "react";

const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);

    const addNotification = (message, type = "info") => {
        const date = new Date();
        const hours = String(date.getHours() % 12 || 12).padStart(2, '0'); // Format jam (12-hour clock)
        const minutes = String(date.getMinutes()).padStart(2, '0'); // Format menit
        const period = date.getHours() >= 12 ? "PM" : "AM"; // AM/PM
        const time = `${hours}:${minutes} ${period}`;
        
        setNotifications((prev) => [
            ...prev,
            { id: Date.now(), message, type, time },
        ]);
    };

    const removeNotification = (id) => {
        if (id) {
            setNotifications((prev) => prev.filter((notif) => notif.id !== id));
        } else {
            setNotifications([]); // This will clear all notifications
        }
    };
    

    return (
        <NotificationContext.Provider
            value={{ notifications, addNotification, removeNotification }}
        >
            {children}
        </NotificationContext.Provider>
    );
};
