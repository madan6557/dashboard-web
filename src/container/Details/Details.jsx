import React, { useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import './Details.css';
import { TextField, NumericField, AreaField } from "../../components/FieldInput/FieldInput";
import Image from "../../components/Image/Image";
import { QRCode, Cross, PencileAltOutline } from "../../components/Icons/Icon";
import { DataIDContext } from "../../context/SelectedIDContext";
import { getSelectedApprovedPlants } from "../../api/controller/approvedPlantsController";
import NoImage from "../../assets/images//No Image.jpg";
import { getSelectedDraftPlants } from "../../api/controller/draftPlantsController";
import { getSelectedRejectedPlants } from "../../api/controller/rejectedPlantsController";
import { getSelectedPlantHistoryById } from "../../api/controller/verificationPlantsController";

const Details = ({ onClose, onEdit, readonly = false, onTab, getQR }) => {
    const { selectedRowData } = useContext(DataIDContext);
    const [plantDetails, setPlantDetails] = useState(null);
    const [plantImage, setPlantImage] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isCommentVisible, setIsCommentVisible] = useState(false);
    const [plantID, setPlantID] = useState(null);
    const [isHasMap, setIsHasMap] = useState(false);
    const location = useLocation();

    const fetchData = async () => {
        if (selectedRowData) {

            setIsLoading(true);

            if (location.pathname === "/dashboard" || location.pathname === "/map") {
                setIsHasMap(false);
            } else {
                setIsHasMap(true);
            }

            try {
                if (onTab) {
                    let data;
                    let imageBlob;

                    if (onTab === "Rejected") {
                        setIsCommentVisible(true);
                        const response = await getSelectedRejectedPlants(selectedRowData);
                        data = response.data;
                        imageBlob = response.imageBlob;
                    } else if (onTab === "Draft") {
                        setIsHasMap(false);
                        setIsCommentVisible(false);
                        const response = await getSelectedDraftPlants(selectedRowData);
                        data = response.data;
                        imageBlob = response.imageBlob;
                    } else if (onTab === "History") {
                        setIsCommentVisible(false);
                        const response = await getSelectedPlantHistoryById(selectedRowData);
                        data = response.data;
                        imageBlob = response.imageBlob;
                    } else {
                        data = null;
                    }

                    setPlantDetails(data);
                    setPlantID(data.id_plant);

                    if (imageBlob) {
                        setPlantImage(imageBlob);
                    }

                    setPlantImage(imageBlob);
                } else {
                    setIsCommentVisible(false);
                    const { data, imageBlob } = await getSelectedApprovedPlants(selectedRowData);
                    setPlantImage(imageBlob);
                    setPlantDetails(data);
                    setPlantID(data.id_plant);
                }
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
        <div className="details-shimmer-fields">
            <div className="details-shimmer-image"></div>
            <div className="details-shimmer-field">
                <div className="details-shimmer-title"></div>
                <div className="details-shimmer-input"></div>
            </div>
            <div className="details-shimmer-field">
                <div className="details-shimmer-title"></div>
                <div className="details-shimmer-input"></div>
            </div>
            <div className="details-shimmer-field">
                <div className="details-shimmer-title"></div>
                <div className="details-shimmer-input"></div>
            </div>
            <div className="details-shimmer-field">
                <div className="details-shimmer-title"></div>
                <div className="details-shimmer-input"></div>
            </div>
            <div className="details-shimmer-field">
                <div className="details-shimmer-title"></div>
                <div className="details-shimmer-input"></div>
            </div>
            <div className="details-shimmer-field">
                <div className="details-shimmer-title"></div>
                <div className="details-shimmer-input"></div>
            </div>
            <div className="details-shimmer-field">
                <div className="details-shimmer-title"></div>
                <div className="details-shimmer-input"></div>
            </div>
            <div className="details-shimmer-field">
                <div className="details-shimmer-title"></div>
                <div className="details-shimmer-input"></div>
            </div>
            <div className="details-shimmer-field">
                <div className="details-shimmer-title"></div>
                <div className="details-shimmer-input"></div>
            </div>
        </div>
    );

    const handleGetQR = () => {
        getQR(plantID)
    };

    return (
        <div className="details-wrapper">
            <div className="details-header-wrapper">
                <div className="qrCode" onClick={handleGetQR}>
                    <div className="icon">
                        <QRCode />
                    </div>
                    <p className="value">{plantID || "00000000"}</p>
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
                                <Image alt="Plant Image" src={plantImage ? plantImage : NoImage} hasMap={isHasMap} onSelected={plantDetails} />
                            </div>
                            {isCommentVisible && (
                                <AreaField id="comment" title="Comment" value={plantDetails.comment || ""} readonly={true} placeholder="Comment" />
                            )}
                            <TextField id="species" title="Species" value={plantDetails.plant || ""} readonly={true} placeholder="Species" />
                            <TextField id="plantingDate" title="Planting Date" value={plantDetails.plantingDate || ""} readonly={true} placeholder="Planting Date" />
                            <TextField id="activity" title="Activity" value={plantDetails.activity || ""} readonly={true} placeholder="Activity" />
                            <TextField id="skppkh" title="SKPPKH" value={plantDetails.skppkh || ""} readonly={true} placeholder="SKPPKH" />
                            <NumericField id="height" title="Height" value={plantDetails.height || ""} suffix="cm" readonly={true} placeholder="Height" />
                            <NumericField id="diameter" title="Diameter" value={plantDetails.diameter || ""} suffix="cm" readonly={true} placeholder="Diameter" />
                            <TextField id="status" title="Status" value={plantDetails.status || ""} readonly={true} placeholder="Status" />
                            <TextField id="location" title="Location" value={plantDetails.location || ""} readonly={true} placeholder="Location" />
                            <TextField id="plot" title="Plot" value={plantDetails.rehabilitationPlot || ""} readonly={true} placeholder="Plot" />
                            <NumericField id="easting" title="Easting" value={plantDetails.easting || ""} suffix="m" readonly={true} placeholder="Easting" />
                            <NumericField id="northing" title="Northing" value={plantDetails.northing || ""} suffix="m" readonly={true} placeholder="Northing" />
                            <NumericField id="elevation" title="Elevation" value={plantDetails.elevation || ""} suffix="m" readonly={true} placeholder="Elevation" />
                            <div className="optional-field">
                                <p className="field-title">Optional</p>
                                <div className="border-line"></div>
                                <TextField id="workDecree" title="Work Decree" value={plantDetails.workDecree || ""} readonly={true} placeholder="Work Decree" />
                                <TextField id="areaStatus" title="Area Status" value={plantDetails.areaStatus || ""} readonly={true} placeholder="Area Status" />
                            </div>
                        </>
                    )}
            </div>
        </div>
    );
}

export default Details;
