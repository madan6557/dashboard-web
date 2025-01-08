import React, { createContext, useContext, useState, useCallback } from "react";
import ConfirmationMessage from "../components/ConfirmationMessage/ConfirmationMessage";

// Membuat context untuk konfirmasi
const ConfirmationContext = createContext();

// Hook untuk mengakses context
export const useConfirmation = () => useContext(ConfirmationContext);

// ConfirmationProvider untuk mengelola state dan menampilkan konfirmasi
export const ConfirmationProvider = ({ children }) => {
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [message, setMessage] = useState("");
    const [type, setType] = useState("");
    const [onConfirm, setOnConfirm] = useState(() => () => {});

    // Menggunakan useCallback untuk memastikan bahwa fungsi onConfirm tidak berubah secara terus menerus
    const requestConfirmation = useCallback((msg, type="primary", onConfirmAction) => {
        // Mengecek apakah user sudah memilih untuk tidak menampilkan konfirmasi lagi
        if (sessionStorage.getItem('confirmationCheckbox') === 'true') {
            onConfirmAction(); // Langsung eksekusi jika sudah diingat
        } else {
            setMessage(msg);
            setType(type);
            setOnConfirm(() => onConfirmAction);
            setShowConfirmation(true);
        }
    }, []);

    // Fungsi untuk menangani konfirmasi
    const handleConfirm = () => {
        onConfirm();
        setShowConfirmation(false);
    };

    // Fungsi untuk menangani pembatalan
    const handleCancel = () => {
        setShowConfirmation(false);
        sessionStorage.removeItem("confirmationCheckbox");
    };

    return (
        <ConfirmationContext.Provider value={requestConfirmation}>
            {children}
            {showConfirmation && (
                <ConfirmationMessage 
                    message={message} 
                    type={type}
                    onConfirm={handleConfirm} 
                    onCancel={handleCancel}
                />
            )}
        </ConfirmationContext.Provider>
    );
};
