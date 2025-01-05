import React, { createContext, useState } from 'react';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [selectedRowData, setSelectedRowData] = useState(null);

    return (
        <DataContext.Provider value={{ selectedRowData, setSelectedRowData }}>
            {children}
        </DataContext.Provider>
    );
};
