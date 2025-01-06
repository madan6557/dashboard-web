import React, { useContext, useState, useEffect } from "react";
import './EditDetails.css';
import { NumericField, OptionField, DateField } from "../../components/FieldInput/FieldInput";
import Image from "../../components/Image/Image";
import { QRCode, Cross, Save, Trash } from "../../components/Icons/Icon";
import { DataIDContext } from "../../context/SelectedIDContext";
import { getSelectedApprovedPlants } from "../../api/controller/plantsController";
import { DataOptionContext } from "../../context/dataOptionContext";

const EditDetails = ({ onClose, data }) => {
    const { selectedRowData } = useContext(DataIDContext);
    const { dataOption } = useContext(DataOptionContext);
    const [plantDetails, setPlantDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [tooltipText, setTooltipText] = useState("");

    const fetchData = async () => {
        if (selectedRowData) {
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
                            <OptionField id="species" title="Species" value={plantDetails.id_species} optionItem={dataOption.tb_species}/>
                            <DateField id="plantingDate" title="Planting Date" value={plantDetails.plantingDate}/>
                            <OptionField id="activity" title="Activity" value={plantDetails.id_activity} optionItem={dataOption.tb_activity}/>
                            <OptionField id="skppkh" title="SKPPKH" value={plantDetails.id_sk} optionItem={dataOption.tb_sk}/>
                            <NumericField id="height" title="Height" value={plantDetails.height} suffix="cm" readonly={true}/>
                            <NumericField id="diameter" title="Diameter" value={plantDetails.diameter} suffix="cm" readonly={true}/>
                            <OptionField id="status" title="Status" value={plantDetails.id_status} optionItem={dataOption.tb_status}/>
                            <OptionField id="plot" title="Plot" value={plantDetails.id_rehabilitationPlot} optionItem={dataOption.tb_rehabilitationPlot}/>
                            <NumericField id="easting" title="Easting" value={plantDetails.easting} suffix="m"/>
                            <NumericField id="northing" title="Northing" value={plantDetails.northing} suffix="m"/>
                            <NumericField id="elevation" title="Elevation" value={plantDetails.elevation} suffix="m"/>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default EditDetails;
