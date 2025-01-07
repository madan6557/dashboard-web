import React, { useContext, useState, useEffect } from "react";
import './EditDetails.css';
import { NumericField, OptionField, DateField } from "../../components/FieldInput/FieldInput";
import Image from "../../components/Image/Image";
import { QRCode, Cross, Save, Trash } from "../../components/Icons/Icon";
import { DataIDContext } from "../../context/SelectedIDContext";
import { getSelectedApprovedPlants } from "../../api/controller/plantsController";
import { DataOptionContext } from "../../context/dataOptionContext";
import { useConfirmation } from "../../context/ActionConfirmationContext";

const EditDetails = ({ onClose, onDelete }) => {
    const { selectedRowData } = useContext(DataIDContext);
    const { dataOption } = useContext(DataOptionContext);
    const [plantDetails, setPlantDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [tooltipText, setTooltipText] = useState("");
    const [unsavedChanges, setUnsavedChanges] = useState(false);
    const requestConfirmation = useConfirmation();

    // State for each field
    const [species, setSpecies] = useState('');
    const [plantingDate, setPlantingDate] = useState('');
    const [activity, setActivity] = useState('');
    const [skppkh, setSkppkh] = useState('');
    const [height, setHeight] = useState('');
    const [diameter, setDiameter] = useState('');
    const [status, setStatus] = useState('');
    const [plot, setPlot] = useState('');
    const [easting, setEasting] = useState('');
    const [northing, setNorthing] = useState('');
    const [elevation, setElevation] = useState('');

    const fetchData = async () => {
        if (selectedRowData) {
            setIsLoading(true);
            try {
                const response = await getSelectedApprovedPlants(selectedRowData, false);
                setPlantDetails(response);
                // Initialize fields with fetched data
                setSpecies(response.id_species);
                setPlantingDate(response.plantingDate);
                setActivity(response.id_activity);
                setSkppkh(response.id_sk);
                setHeight(response.height);
                setDiameter(response.diameter);
                setStatus(response.id_status);
                setPlot(response.id_rehabilitationPlot);
                setEasting(response.easting);
                setNorthing(response.northing);
                setElevation(response.elevation);
            } catch (error) {
                console.error("Error fetching plants:", error);
            } finally {
                setIsLoading(false);
            }
        }
    };

    const updateData = async (id_plant, data) => {
        console.log(`Data ${id_plant} updated successfully`);
        console.log(data);
    }

    useEffect(() => {
        fetchData();// eslint-disable-next-line
    }, [selectedRowData]);

    const handleMenuHover = (title) => {
        setTooltipText(title);
    };

    const handleMenuLeave = () => {
        setTooltipText("");
    };

    const handleInputChange = () => {
        setUnsavedChanges(true);
    };

    const handleSaveChanges = async () => {
        requestConfirmation(
            "Are you sure you want to save the changes?",
            async () => {
                const uuid = localStorage.getItem('userId');
                const updatedData = {
                    id_plant: parseInt(selectedRowData, 10),
                    id_species: parseInt(species, 10),
                    id_activity: parseInt(activity, 10),
                    id_location: parseInt(plantDetails.id_location, 10),
                    id_sk: parseInt(skppkh, 10),
                    id_status: parseInt(status, 10),
                    diameter: parseFloat(diameter),
                    height: parseFloat(height),
                    plantingDate: plantingDate ? plantingDate.split('T')[0] : '',
                    dateModified: new Date().toISOString(),
                    elevation: String(elevation),
                    easting: String(easting),
                    northing: String(northing),
                    images: String(plantDetails.images),
                    id_action: 4,
                    uuid: String(uuid),
                };
    
                setIsLoading(true);
                try {
                    await updateData(selectedRowData, updatedData);
                    await fetchData();
                    setUnsavedChanges(false);
                } catch (error) {
                    console.error("Error saving data:", error);
                    alert("Failed to save changes. Please try again."); // Feedback to user
                } finally {
                    setIsLoading(false);
                }
            }
        );
    };

    const handleDeleteData = () => {
        requestConfirmation(
            "Data will be deleted permanently. Are you sure you want to perform this action?",
            () => {
                console.log(`Data ${selectedRowData} deleted succesfully`);
                onDelete();
            }
        );
    }

    const handleClose = () => {
        if (unsavedChanges) {
            console.log("There are unsaved changes.");
            // Additional logic can be added here (e.g., show confirmation dialog)
            requestConfirmation(
                "There are unsaved changes. Keep countinue?",
                () => {
                    onClose();
                }
            );
        } else {
            onClose();
        }
    };

    return (
        <div className="edit-details-wrapper">
            <div className="edit-details-header-wrapper">
                <div className="qrCode">
                    <div className="icon">
                        <QRCode />
                    </div>
                    <p className="value">{selectedRowData}</p>
                </div>
                <div
                    className="detail-delete-button"
                    onMouseEnter={() => handleMenuHover("Delete")}
                    onMouseLeave={handleMenuLeave}
                    onClick={handleDeleteData}
                >
                    <Trash />
                    {tooltipText === "Delete" && (
                        <div className="detail-tooltip">
                            <p>{tooltipText}</p>
                        </div>
                    )}
                </div>
                <div
                    className="detail-save-button"
                    onMouseEnter={() => handleMenuHover("Save")}
                    onMouseLeave={handleMenuLeave}
                    onClick={handleSaveChanges}
                >
                    <Save />
                    {tooltipText === "Save" && (
                        <div className="detail-tooltip">
                            <p>{tooltipText}</p>
                        </div>
                    )}
                </div>
                <div className="detail-close-button" onClick={handleClose}>
                    <Cross />
                </div>
            </div>
            <div className="detail-form-wrapper">
                {isLoading ? (
                    <div className="shimmer-wrapper">
                        <div className="shimmer-image"></div>
                        <div className="shimmer-fields">
                            {Array.from({ length: 11 }).map((_, index) => (
                                <div key={index} className="shimmer-placeholder">
                                    <div className="shimmer-line-title"></div>
                                    <div className="shimmer-line-input"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="detail-image">
                            <Image imageEditable={true} />
                        </div>
                        <div className="detail-input-wrapper">
                            <OptionField id="species" title="Species" value={species} optionItem={dataOption.tb_species} onChange={(e) => { setSpecies(e.target.value); handleInputChange(); }} />
                            <DateField id="plantingDate" title="Planting Date" value={plantingDate} onChange={(e) => { setPlantingDate(e.target.value); handleInputChange(); }} />
                            <OptionField id="activity" title="Activity" value={activity} optionItem={dataOption.tb_activity} onChange={(e) => { setActivity(e.target.value); handleInputChange(); }} />
                            <OptionField id="skppkh" title="SKPPKH" value={skppkh} optionItem={dataOption.tb_sk} onChange={(e) => { setSkppkh(e.target.value); handleInputChange(); }} />
                            <NumericField id="height" title="Height" value={height} suffix="cm" onChange={(e) => { setHeight(e.target.value); handleInputChange(); }} />
                            <NumericField id="diameter" title="Diameter" value={diameter} suffix="cm" onChange={(e) => { setDiameter(e.target.value); handleInputChange(); }} />
                            <OptionField id="status" title="Status" value={status} optionItem={dataOption.tb_status} onChange={(e) => { setStatus(e.target.value); handleInputChange(); }} />
                            <OptionField id="plot" title="Plot" value={plot} optionItem={dataOption.tb_rehabilitationPlot} onChange={(e) => { setPlot(e.target.value); handleInputChange(); }} />
                            <NumericField id="easting" title="Easting" value={easting} suffix="m" onChange={(e) => { setEasting(e.target.value); handleInputChange(); }} />
                            <NumericField id="northing" title="Northing" value={northing} suffix="m" onChange={(e) => { setNorthing(e.target.value); handleInputChange(); }} />
                            <NumericField id="elevation" title="Elevation" value={elevation} suffix="m" onChange={(e) => { setElevation(e.target.value); handleInputChange(); }} />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default EditDetails;
