import React, { createContext, useState } from 'react';

export const DataIDContext = createContext();

export const DataIDProvider = ({ children }) => {
    const [selectedRowData, setSelectedRowData] = useState(null);

    return (
        <DataIDContext.Provider value={{ selectedRowData, setSelectedRowData }}>
            {children}
        </DataIDContext.Provider>
    );
};
