import React, { useContext, useState, useEffect } from "react";
import './EditDetails.css';
import { TextField, NumericField, OptionField, DateField } from "../../components/FieldInput/FieldInput";
import Image from "../../components/Image/Image";
import { QRCode, Cross, Save, Trash } from "../../components/Icons/Icon";
import { DataIDContext } from "../../context/SelectedIDContext";
import { getSelectedApprovedPlants } from "../../api/controller/plantsController";

const EditDetails = ({ onClose, data }) => {
    const { selectedRowData } = useContext(DataIDContext);
    const [plantDetails, setPlantDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [tooltipText, setTooltipText] = useState("");

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await getSelectedApprovedPlants(selectedRowData, false);
            console.log(response);
            setPlantDetails(response);
        } catch (error) {
            console.error("Error fetching plants:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line
    }, [selectedRowData]);

    const handleMenuHover = (title) => {
        setTooltipText(title);
    };

    const handleMenuLeave = () => {
        setTooltipText(""); // Clear tooltip when mouse leaves
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
                >
                    <Save />
                    {tooltipText === "Save" && (
                        <div className="detail-tooltip">
                            <p>{tooltipText}</p>
                        </div>
                    )}
                </div>

                <div className="detail-close-button" onClick={onClose}>
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
                            <TextField id="species" title="Species" value={plantDetails.plant} />
                            <DateField id="plantingDate" title="Planting Date" value={plantDetails.plantingDate} />
                            <TextField id="activity" title="Activity" value={plantDetails.activity} />
                            <TextField id="skppkh" title="SKPPKH" value={plantDetails.skppkh} />
                            <NumericField id="height" title="Height" value={plantDetails.height} suffix="cm" readonly={true} />
                            <NumericField id="diameter" title="Diameter" value={plantDetails.diameter} suffix="cm" readonly={true} />
                            <TextField id="status" title="Status" value={plantDetails.status} />
                            <TextField id="plot" title="Plot" value={plantDetails.rehabilitationPlot}/>
                            <TextField id="easting" title="Easting" value={plantDetails.easting} />
                            <TextField id="northing" title="Northing" value={plantDetails.northing} />
                            <TextField id="elevation" title="Elevation" value={plantDetails.elevation} />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default EditDetails;
