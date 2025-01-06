import React, { createContext, useState } from 'react';

export const SiteIDContext = createContext();

export const SiteIDProvider = ({ children }) => {
    const [selectedSite, setSelectedSite] = useState(null);

    return (
        <SiteIDContext.Provider value={{ selectedSite, setSelectedSite }}>
            {children}
        </SiteIDContext.Provider>
    );
};
