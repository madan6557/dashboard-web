import React, { createContext, useContext, useEffect, useState } from "react";

const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState(() => {
        // Load notifications from sessionStorage on initialization
        const storedNotifications = sessionStorage.getItem("notifications");
        return storedNotifications ? JSON.parse(storedNotifications) : [];
    });

    const addNotification = (message, type = "info") => {
        const date = new Date();
        const hours = String(date.getHours() % 12 || 12).padStart(2, '0'); // Format jam (12-hour clock)
        const minutes = String(date.getMinutes()).padStart(2, '0'); // Format menit
        const period = date.getHours() >= 12 ? "PM" : "AM"; // AM/PM
        const time = `${hours}:${minutes} ${period}`;

        const newNotification = { id: Date.now(), message, type, time };

        setNotifications((prev) => {
            const updatedNotifications = [...prev, newNotification];
            sessionStorage.setItem("notifications", JSON.stringify(updatedNotifications)); // Save to sessionStorage
            return updatedNotifications;
        });
    };

    const removeNotification = (id) => {
        setNotifications((prev) => {
            const updatedNotifications = id
                ? prev.filter((notif) => notif.id !== id)
                : []; // Clear all notifications if id is not provided

            sessionStorage.setItem("notifications", JSON.stringify(updatedNotifications)); // Update sessionStorage
            return updatedNotifications;
        });
    };

    useEffect(() => {
        // Sync sessionStorage changes on component mount (optional)
        const storedNotifications = sessionStorage.getItem("notifications");
        if (storedNotifications) {
            setNotifications(JSON.parse(storedNotifications));
        }
    }, []);

    return (
        <NotificationContext.Provider
            value={{ notifications, addNotification, removeNotification }}
        >
            {children}
        </NotificationContext.Provider>
    );
};
