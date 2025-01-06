import React, { useContext, useState, useEffect } from "react";
import './Details.css';
import { TextField } from "../../components/FieldInput/FieldInput";
import Image from "../../components/Image/Image";
import { QRCode, Cross, PencileAltOutline } from "../../components/Icons/Icon";
import { DataIDContext } from "../../context/SelectedIDContext";
import { getSelectedApprovedPlants } from "../../api/controller/plantsController";

const Details = ({ onClose, onEdit }) => {
    const { selectedRowData } = useContext(DataIDContext);
    const [plantDetails, setPlantDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

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

    const renderShimmer = () => (
        <div className="shimmer-fields">
            <div className="shimmer-image"></div>
            <div className="shimmer-field">
                <div className="shimmer-title"></div>
                <div className="shimmer-input"></div>
            </div>
            <div className="shimmer-field">
                <div className="shimmer-title"></div>
                <div className="shimmer-input"></div>
            </div>
            <div className="shimmer-field">
                <div className="shimmer-title"></div>
                <div className="shimmer-input"></div>
            </div>
            <div className="shimmer-field">
                <div className="shimmer-title"></div>
                <div className="shimmer-input"></div>
            </div>
            <div className="shimmer-field">
                <div className="shimmer-title"></div>
                <div className="shimmer-input"></div>
            </div>
            <div className="shimmer-field">
                <div className="shimmer-title"></div>
                <div className="shimmer-input"></div>
            </div>
            <div className="shimmer-field">
                <div className="shimmer-title"></div>
                <div className="shimmer-input"></div>
            </div>
            <div className="shimmer-field">
                <div className="shimmer-title"></div>
                <div className="shimmer-input"></div>
            </div>
            <div className="shimmer-field">
                <div className="shimmer-title"></div>
                <div className="shimmer-input"></div>
            </div>
        </div>
    );

    return (
        <div className="details-wrapper">
            <div className="details-header-wrapper">
                <div className="qrCode">
                    <div className="icon">
                        <QRCode />
                    </div>
                    <p className="value">{selectedRowData}</p>
                </div>
                <div className="edit-button" onClick={onEdit}>
                    <PencileAltOutline />
                </div>
                <div className="close-button" onClick={onClose}>
                    <Cross />
                </div>
            </div>
            <div className="form-wrapper">
                {isLoading ? (
                    renderShimmer()
                ) : (
                    <>
                        <div className="image-wrapper">
                            <Image alt="Plant Image" />
                        </div>
                            <TextField id="species" title="Species" value={plantDetails.plant} readonly={true} />
                            <TextField id="plantingDate" title="Planting Date" value={plantDetails.plantingDate} readonly={true} />
                            <TextField id="activity" title="Activity" value={plantDetails.activity} readonly={true} />
                            <TextField id="skppkh" title="SKPPKH" value={plantDetails.skppkh} readonly={true} />
                            <TextField id="height" title="Height" value={plantDetails.height} readonly={true} />
                            <TextField id="diameter" title="Diameter" value={plantDetails.diameter} readonly={true} />
                            <TextField id="status" title="Status" value={plantDetails.status} readonly={true} />
                            <TextField id="plot" title="Plot" value={plantDetails.rehabilitationPlot} readonly={true} />
                            <TextField id="easting" title="Easting" value={plantDetails.easting} readonly={true} />
                            <TextField id="northing" title="Northing" value={plantDetails.northing} readonly={true} />
                            <TextField id="elevation" title="Elevation" value={plantDetails.elevation} readonly={true} />
                    </>
                )}
            </div>
        </div>
    );
}

export default Details;
