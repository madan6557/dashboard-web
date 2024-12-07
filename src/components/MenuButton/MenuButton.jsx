import React from "react";
import './MenuButton.css';
import { NoIcon, Chevron, Dot } from '../Icons/Icon';
const colors = ["--primary-red", "--primary-orange", "--primary-green", "--primary-blue"]; // Warna untuk ikon

const MenuButton = ({
    title,
    submenu = [],
    isSelected,
    isOpen,
    onClick,
    onSubmenuClick,
    selectedSubmenu,
    icon = <NoIcon />, // Ikon default
    selectedIcon, // Ikon saat selected (opsional)
    onMouseEnter, 
    onMouseLeave
}) => {
    const displayIcon = isSelected && selectedIcon ? selectedIcon : icon; // Gunakan selectedIcon jika isSelected = true

    return (
        <div className="button-container">
            {/* Menu utama */}
            <div
                className={`button-wrapper ${isSelected ? 'selected' : ''}`}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                onClick={onClick}
            >
                <div className="icon">
                    {displayIcon}
                </div>
                <p className="title">
                    {title}
                </p>
                <div className="icon" id="chevron">
                    {submenu.length > 0 ? <Chevron /> : null}
                </div>
            </div>

            {isOpen && submenu.length > 0 && (
                <div className="submenu">
                    {submenu.map((item, index) => (
                        <div
                            key={index}
                            className={`button-wrapper ${selectedSubmenu === item.title ? 'selected' : ''}`} // Pilih submenu yang aktif
                            onClick={() => onSubmenuClick(item.title)} // Menangani klik submenu
                        >
                            <div
                                className="icon"
                                style={{ color: `var(${colors[index % colors.length]})` }} // Warna berurutan dan berulang untuk submenu
                            >
                                <Dot /> {/* Ikon submenu */}
                            </div>
                            <p className="title">{item.title}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MenuButton;
