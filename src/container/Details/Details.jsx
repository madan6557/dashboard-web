import React, { useContext, useState, useEffect } from "react";
import './Details.css';
import { TextField, NumericField } from "../../components/FieldInput/FieldInput";
import Image from "../../components/Image/Image";
import { QRCode, Cross, PencileAltOutline } from "../../components/Icons/Icon";
import { DataIDContext } from "../../context/SelectedIDContext";
import { getSelectedApprovedPlants } from "../../api/controller/approvedPlantsController";
import NoImage from "../../assets/images//No Image.jpg";

const Details = ({ onClose, onEdit, readonly = false }) => {
    const { selectedRowData } = useContext(DataIDContext);
    const [plantDetails, setPlantDetails] = useState(null);
    const [plantImage, setPlantImage] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = async () => {
        if (selectedRowData) {
            setIsLoading(true);
            try {
                const {data, imageBlob} = await getSelectedApprovedPlants(selectedRowData, false);
                setPlantDetails(data);
                setPlantImage(imageBlob);
            } catch (error) {
                console.error("Error fetching plants:", error);
            } finally {
                setIsLoading(false);
            }
        }
    };

    useEffect(() => {
        fetchData();
        setPlantImage(null);
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
                <div className="header-button">
                    {readonly ? '' :
                        <div className="edit-button" onClick={onEdit}>
                            <PencileAltOutline />
                        </div>
                    }
                    <div className="close-button" onClick={onClose}>
                        <Cross />
                    </div>
                </div>

            </div>
            <div className="form-wrapper">
                {isLoading ?
                    renderShimmer()
                    : (
                        <>
                            <div className="detail-image-wrapper">
                                <Image alt="Plant Image" src={plantImage ? plantImage : NoImage} />
                            </div>
                            <TextField id="species" title="Species" value={plantDetails.plant} readonly={true} />
                            <TextField id="plantingDate" title="Planting Date" value={plantDetails.plantingDate} readonly={true} />
                            <TextField id="activity" title="Activity" value={plantDetails.activity} readonly={true} />
                            <TextField id="skppkh" title="SKPPKH" value={plantDetails.skppkh} readonly={true} />
                            <NumericField id="height" title="Height" value={plantDetails.height} suffix="cm" readonly={true} />
                            <NumericField id="diameter" title="Diameter" value={plantDetails.diameter} suffix="cm" readonly={true} />
                            <TextField id="status" title="Status" value={plantDetails.status} readonly={true} />
                            <TextField id="plot" title="Plot" value={plantDetails.rehabilitationPlot} readonly={true} />
                            <NumericField id="easting" title="Easting" value={plantDetails.easting} suffix="m" readonly={true} />
                            <NumericField id="northing" title="Northing" value={plantDetails.northing} suffix="m" readonly={true} />
                            <NumericField id="elevation" title="Elevation" value={plantDetails.elevation} suffix="m" readonly={true} />
                        </>
                    )}
            </div>
        </div>
    );
}

export default Details;
