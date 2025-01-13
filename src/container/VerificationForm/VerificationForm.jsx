import React, { useContext, useState, useEffect } from "react";
import "./VerificationForm.css";
import { TextField, NumericField } from "../../components/FieldInput/FieldInput";
import { QRCode, Cross } from "../../components/Icons/Icon";
import { DataIDContext } from "../../context/SelectedIDContext";
import { getSelectedApprovedPlants } from "../../api/controller/approvedPlantsController";
import { getPlantImage } from "../../api/controller/imageController";
import NoImage from "../../assets/images//No Image.jpg";
import Image from "../../components/Image/Image";
import ActionButton from "../../components/ActionButton/ActionButton";

const VerificationForm = ({ onClose, onAction }) => {
    const { selectedRowData } = useContext(DataIDContext);
    const [plantDetails, setPlantDetails] = useState(null);
    const [plantImage, setPlantImage] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = async () => {
        if (selectedRowData) {
            setIsLoading(true);
            try {
                const response = await getSelectedApprovedPlants(selectedRowData, false);
                setPlantDetails(response);

                const imageURL = await getPlantImage(response.images);
                setPlantImage(imageURL);
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
            {/* Repeat the shimmer structure for all fields */}
            {Array(9).fill().map((_, index) => (
                <div key={index} className="shimmer-field">
                    <div className="shimmer-title"></div>
                    <div className="shimmer-input"></div>
                </div>
            ))}
        </div>
    );

    const renderPlantDetails = () => (
        <>
            <p className="verificationForm-form-title">Title Here</p>
            <p className="verificationForm-form-date">{plantDetails.dateModified}</p>
            <div className="verificationForm-image-wrapper">
                <Image alt="Plant Image" src={plantImage || NoImage} />
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
    );

    return (
        <div className="verificationForm-wrapper">
            <div className="verificationForm-header-wrapper">
                <div className="verificationForm-qrCode">
                    <div className="icon">
                        <QRCode />
                    </div>
                    <p className="value">{selectedRowData}</p>
                </div>
                <div className="verificationForm-header-button">
                    <div className="verificationForm-close-button" onClick={onClose}>
                        <Cross />
                    </div>
                </div>
            </div>
            <div className="verificationForm-form-container">
                <div className="verificationForm-field-wrapper">
                    <div className="verificationForm-form-wrapper">
                        {isLoading ? renderShimmer() : renderPlantDetails()}
                    </div>
                    <div className="verificationForm-form-wrapper">
                        {isLoading ? renderShimmer() : renderPlantDetails()}
                    </div>
                </div>
                <div className="verificationForm-footer-button-wrapper">
                    <div className="verificationForm-footer-button">
                        <ActionButton title="Reject" type="danger" />
                    </div>
                    <div className="verificationForm-footer-button">
                        <ActionButton title="Approve" type="confirm" />
                    </div>
                </div>
            </div>

        </div>
    );
};

export default VerificationForm;
