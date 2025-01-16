import React, { useContext, useEffect, useState } from "react";
import './ExportForm.css';
import { OptionField } from "../../components/FieldInput/FieldInput";
import { DataOptionContext } from "../../context/dataOptionContext";
import { SiteIDContext } from "../../context/SiteIDContext";
import ActionButton from "../../components/ActionButton/ActionButton";
import { exportPlantData } from "../../api/controller/exportController";

const ExportForm = ({ onClose }) => {
    const { dataOption } = useContext(DataOptionContext);
    const { selectedSite, setSelectedSite } = useContext(SiteIDContext);

    const [siteOptions, setSiteOptions] = useState(null);
    const [yearOptions, setYearOptions] = useState([]);
    const [isExporting, setIsExporting] = useState(false);
    const [selectedYear, setSelectedYear] = useState('');
    const [includeWatermark, setIncludeWatermark] = useState(false);
    const [isDownloadReady, setIsDownloadReady] = useState(false); // State to manage download button visibility
    const [downloadUrl, setDownloadUrl] = useState(null); // Store the download URL for the file

    const fetchData = async () => {
        setIsExporting(true);
        setIsDownloadReady(false); // Hide download button when starting a new export
    
        const config = {
            year: selectedYear,
            watermark: includeWatermark,
            site: selectedSite,
        };
    
        try {
            const response = await exportPlantData(config);
            // const blob = new Blob([response], { type: 'application/zip' });
            const url = window.URL.createObjectURL(response);
            setDownloadUrl(url); // Store the URL for download
    
            setIsDownloadReady(true); // Show download button after export is complete
        } catch (error) {
            console.error("Error exporting plants:", error);
        } finally {
            setIsExporting(false);
        }
    };

    useEffect(() => {
        if (dataOption && dataOption.tb_site) {
            setSiteOptions(dataOption.tb_site);
        }

        const currentYear = new Date().getFullYear();
        setSelectedYear(currentYear);
        const years = [];
        for (let year = 2000; year <= currentYear; year++) {
            years.push({ text: year.toString(), value: year.toString() });
        }
        setYearOptions(years);
    }, [dataOption]);

    useEffect(() => {
        if (siteOptions && siteOptions.length > 0) {
            setSelectedSite(siteOptions[0].value); // Set to the first site's value
        }
        // eslint-disable-next-line
    }, [siteOptions]);

    const handleCheckboxChange = (event) => {
        setIncludeWatermark(event.target.checked);
    };

    const handleYearChange = (event) => {
        setSelectedYear(event.target.value);
    };

    const handleSiteChange = (event) => {
        const newSite = event.target.value;
        setSelectedSite(newSite); // Update the selected site in the context
    };

    const handleExport = () => {
        fetchData();
    };

    const handleDownload = () => {
        if (downloadUrl) {
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = downloadUrl;
            a.download = `export_${selectedSite}_${selectedYear}.zip`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(downloadUrl); // Clean up the object URL after download
        }
    };

    return (
        <div className="exportForm-wrapper">
            <div className="exportForm-header-wrapper">
                <p className="exportForm-title">Export</p>
            </div>

            <div className="exportForm-option-wrapper">
                <OptionField title="Year" value={selectedYear} optionItem={yearOptions} onChange={handleYearChange} />
                <OptionField
                    title="Site"
                    value={selectedSite}
                    optionItem={siteOptions || [{ text: "Site", value: "" }] }
                    onChange={handleSiteChange}
                />
            </div>

            <div className="watermarkCheckbox">
                <input
                    type="checkbox"
                    id="watermarkCheckbox"
                    onChange={handleCheckboxChange}
                />
                <label htmlFor="watermarkCheckbox">Watermark</label>
            </div>

            <div className="exportform-button-wrapper">
                {isExporting ? (
                    <div className="progress-bar">Processing...</div>
                ) : (
                    <>
                        {isDownloadReady && (
                            <ActionButton title="Download" type="primary" onClick={handleDownload} />
                        )}
                    </>
                )}
            </div>

            <div className="exportform-button-wrapper">
                <ActionButton title="Cancel" type="ghost" onClick={onClose} />
                <ActionButton title="Export" type="confirm" onClick={handleExport} />
            </div>
        </div>
    );
};

export default ExportForm;
