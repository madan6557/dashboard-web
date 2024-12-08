import React, { createContext, useContext, useState } from "react";

const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);

    const addNotification = (message, type = "info") => {
        const date = new Date();
        const time = `${date.getHours()}:${date.getMinutes()} ${date.getHours() >= 12 ? "PM" : "AM"}`;
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
