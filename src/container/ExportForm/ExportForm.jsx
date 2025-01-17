import React, { useContext, useEffect, useState, useRef } from "react";
import './ExportForm.css';
import { OptionField } from "../../components/FieldInput/FieldInput";
import { DataOptionContext } from "../../context/dataOptionContext";
import { SiteIDContext } from "../../context/SiteIDContext";
import ActionButton from "../../components/ActionButton/ActionButton";
import { exportPlantData } from "../../api/controller/exportController";
import { Cross } from "../../components/Icons/Icon";

const ExportForm = ({ onClose }) => {
    const { dataOption } = useContext(DataOptionContext);
    const { selectedSite, setSelectedSite } = useContext(SiteIDContext);

    const [siteOptions, setSiteOptions] = useState(null);
    const [yearOptions, setYearOptions] = useState([]);
    const [isExporting, setIsExporting] = useState(false);
    const [selectedYear, setSelectedYear] = useState('');
    const [includeWatermark, setIncludeWatermark] = useState(false);
    const [isDownloadReady, setIsDownloadReady] = useState(false);
    const [downloadUrl, setDownloadUrl] = useState(null);
    const [progress, setProgress] = useState(0); // State for progress
    const abortControllerRef = useRef(null);
    const wsRef = useRef(null);

    const cleanupDownloadUrl = () => {
        if (downloadUrl) {
            window.URL.revokeObjectURL(downloadUrl);
            setDownloadUrl(null);
        }
    };

    const fetchData = async () => {
        setIsExporting(true);
        setIsDownloadReady(false);

        cleanupDownloadUrl();

        abortControllerRef.current = new AbortController();
        const signal = abortControllerRef.current.signal;

        const config = {
            year: selectedYear,
            watermark: includeWatermark,
            id_site: parseInt(selectedSite),
        };

        try {
            const response = await exportPlantData(config, signal);
            const url = window.URL.createObjectURL(response);
            setDownloadUrl(url);
            setIsDownloadReady(true);
        } catch (error) {
            if (error.name === 'AbortError') {
                console.log('Export aborted');
            } else {
                console.error("Error exporting plants:", error);
            }
        } finally {
            setIsExporting(false);
        }
    };

    const handleExport = () => {
        fetchData();
    };

    const handleCancelExport = () => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }
        if (wsRef.current) {
            wsRef.current.send("cancel");
        }
        setIsExporting(false);
    };

    const handleDownload = () => {
        if (downloadUrl) {
            const selectedOption = siteOptions.find(option => option.value === selectedSite);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = downloadUrl;
            a.download = `export_${selectedOption.text}_${selectedYear}.zip`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(downloadUrl);
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
        // eslint-disable-next-line
    }, [dataOption]);

    useEffect(() => {
        if (siteOptions && siteOptions.length > 0) {
            setSelectedSite(siteOptions[0].value);
        }
        // eslint-disable-next-line
    }, [siteOptions]);

    useEffect(() => {
        wsRef.current = new WebSocket('ws://your-server-url');
        wsRef.current.onopen = () => console.log('WebSocket connection opened');
        wsRef.current.onmessage = (event) => {
            const message = JSON.parse(event.data);
            if (message.type === 'progress') {
                setProgress(message.progress);
            }
        };
        wsRef.current.onclose = () => console.log('WebSocket connection closed');

        return () => {
            cleanupDownloadUrl();
            if (wsRef.current) {
                wsRef.current.close();
            }
        };
        // eslint-disable-next-line
    }, []);

    const handleCheckboxChange = (event) => {
        setIncludeWatermark(event.target.checked);
    };

    const handleYearChange = (event) => {
        setSelectedYear(event.target.value);
    };

    const handleSiteChange = (event) => {
        setSelectedSite(event.target.value);
    };

    return (
        <div className="exportForm-wrapper">
            <div className="exportForm-close-button" onClick={() => {
                cleanupDownloadUrl();
                onClose();
            }}>
                <Cross />
            </div>
            <div className="exportForm-header-wrapper">
                <p className="exportForm-title">Export</p>
            </div>

            <div className="exportForm-option-wrapper">
                <OptionField title="Planted Year" value={selectedYear} optionItem={yearOptions} onChange={handleYearChange} />
                <OptionField
                    title="Site"
                    value={selectedSite}
                    optionItem={siteOptions || [{ text: "Site", value: "" }]}
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
                    <div className="progress-bar">
                        Processing... {progress}%
                    </div>
                ) : (
                    <>
                        {isDownloadReady && (
                            <ActionButton title="Download" type="primary" onClick={handleDownload} />
                        )}
                    </>
                )}
            </div>

            <div className="exportform-button-wrapper">
                <ActionButton title="Cancel" type="ghost" onClick={handleCancelExport} />
                <ActionButton title="Export" type="confirm" onClick={handleExport} disabled={isExporting} />
            </div>
        </div>
    );
};

export default ExportForm;
