import React, { createContext, useState} from 'react';

export const DataOptionContext = createContext();

export const DataOptionProvider = ({ children }) => {
    const [dataOption, setDataOption] = useState(null);

    return (
        <DataOptionContext.Provider value={{ dataOption, setDataOption }}>
            {children}
        </DataOptionContext.Provider>
    );
};
