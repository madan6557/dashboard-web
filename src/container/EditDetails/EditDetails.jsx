import React, { useContext, useState, useEffect } from "react";
import './EditDetails.css';
import { NumericField, OptionField, DateField } from "../../components/FieldInput/FieldInput";
import Image from "../../components/Image/Image";
import { QRCode, Cross, Save, Trash } from "../../components/Icons/Icon";
import { DataIDContext } from "../../context/SelectedIDContext";
import { deleteApprovedPlants, getSelectedApprovedPlants, patchApprovedPlants } from "../../api/controller/approvedPlantsController";
import { DataOptionContext } from "../../context/dataOptionContext";
import { useConfirmation } from "../../context/ActionConfirmationContext";
import { renameFile } from "../../utils/renameImage";
import { getPlantImage, uploadImage } from "../../api/controller/imageController";
import NoImage from "../../assets/images//No Image.jpg";
import { dateFormat } from "../../utils/dateFormat";

const EditDetails = ({ onClose, onDelete, onAction, onUpdate }) => {
    const { selectedRowData } = useContext(DataIDContext);
    const { dataOption } = useContext(DataOptionContext);
    const [plantDetails, setPlantDetails] = useState(null);
    const [plantImage, setPlantImage] = useState(null);
    const [newPlantImage, setNewPlantImage] = useState(null);
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
            setPlantImage(null);
            setNewPlantImage(null);
            setPlantDetails(null);

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

                const imageURL = await getPlantImage(response.images);
                setPlantImage(imageURL);

            } catch (error) {
                console.error("Error fetching plants:", error);
            } finally {
                setIsLoading(false);
            }
        }
    };

    const updateData = async () => {
        const renamedImageFile = newPlantImage ? renameFile(newPlantImage, selectedRowData) : null;
        const formatedDate = dateFormat(plantingDate, 'yyyy-mm-dd hh-mm-ss', '+0');
        console.log(new Date(plantingDate).toISOString());
        console.log(new Date(formatedDate).toISOString());
        console.log(new Date().toISOString());
        const updatedData = {
            id_species: parseInt(species, 10),
            id_activity: parseInt(activity, 10),
            id_location: parseInt(plantDetails.id_location, 10),
            id_rehabilitationPlot: parseInt(plot, 10),
            id_sk: parseInt(skppkh, 10),
            id_status: parseInt(status, 10),
            id_workDecree: plantDetails.id_workDecree,
            id_areaStatus: plantDetails.id_areaStatus,
            diameter: parseFloat(diameter),
            height: parseFloat(height),
            plantingDate: new Date(formatedDate).toISOString(),
            dateModified: new Date().toISOString(),
            latitude: plantDetails.latitude,
            longitude: plantDetails.longitude,
            elevation: String(elevation),
            easting: String(easting),
            northing: String(northing),
            images: String(renamedImageFile ? renamedImageFile.name : plantDetails.images),
            compass: plantDetails.compass,
            id_action: 4,
        };

        setIsLoading(true);
        try {
            await patchApprovedPlants(parseInt(selectedRowData, 10), updatedData)
            if (renamedImageFile) { await uploadImage(renamedImageFile) };

            await fetchData();

            setUnsavedChanges(false);
            onAction(`Data ${selectedRowData} updated successfully`, 'success');
        } catch (error) {
            console.error("Error saving data:", error);
            onAction(`Failed to save changes. Please try again.`, 'failed');
        } finally {
            setIsLoading(false);
        }
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
            "Are you sure you want to save the changes?", "confirm",
            async () => {
                try {
                    onUpdate();
                    await updateData();
                } catch (error) {
                    console.error("Error saving data:", error);
                    onAction(`Error saving data ${selectedRowData}`, 'failed');
                }
            }
        );
    };

    const handleDeleteData = () => {
        requestConfirmation(
            "Data will be deleted permanently. Are you sure you want to perform this action?", "danger",
            async () => {
                try {
                    onUpdate();
                    await deleteApprovedPlants(selectedRowData);
                    onDelete();
                    onAction(`Data ${selectedRowData} deleted succesfully`, 'success');
                } catch (error) {
                    console.error("Error deleting data:", error);
                    onAction(`Error deleting data ${selectedRowData} deleted succesfully`, 'failed');
                }
            }
        );
    }

    const handleClose = () => {
        if (unsavedChanges) {
            console.log("There are unsaved changes.");
            // Additional logic can be added here (e.g., show confirmation dialog)
            requestConfirmation(
                "There are unsaved changes. Keep countinue?", "confirm",
                () => {
                    onClose();
                }, true
            );
        } else {
            onClose();
        }
    };

    const handleImageUpload = (file) => {
        setNewPlantImage(file);
        const fileURL = URL.createObjectURL(file);
        setPlantImage(fileURL);
        handleInputChange(); // Menandai perubahan sebagai belum disimpan
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
                            <Image imageEditable={true} onAction={onAction} onImageUpload={handleImageUpload} src={plantImage ? plantImage : NoImage} />
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
