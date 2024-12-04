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
    selectedSubmenu
}) => {
    console.log("Is Selected: "+selectedSubmenu);
    console.log("Is Open: "+isOpen);
    return (
        <div className="wrapper">
            {/* Menu utama */}
            <div
                className={`button-wrapper ${isSelected ? 'selected' : ''}`} // Menambahkan kelas 'selected' jika menu utama dipilih
                onClick={onClick} // Trigger onClick di button-wrapper utama
            >
                <div className="icon">
                    <NoIcon /> {/* Render ikon untuk menu utama */}
                </div>
                <p className="title">{title}</p>
                <div className="icon" id="chevron">
                    {submenu.length > 0 ? <Chevron /> : null} {/* Render Chevron hanya jika ada submenu */}
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
