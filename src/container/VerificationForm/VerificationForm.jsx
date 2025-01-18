import React, { useContext, useState, useEffect } from "react";
import "./VerificationForm.css";
import { TextField, NumericField, AreaField } from "../../components/FieldInput/FieldInput";
import { QRCode, Cross } from "../../components/Icons/Icon";
import { DataIDContext } from "../../context/SelectedIDContext";
import NoImage from "../../assets/images//No Image.jpg";
import Image from "../../components/Image/Image";
import ActionButton from "../../components/ActionButton/ActionButton";
import { compareSelectedVerificationPlants, verifyPlant } from "../../api/controller/verificationPlantsController";
import { getPlantImage } from "../../api/controller/imageController";
import { useConfirmation } from "../../context/ActionConfirmationContext";
import { dateFormat } from "../../utils/dateFormat";

const VerificationForm = ({ onClose, onAction }) => {
    const { selectedRowData } = useContext(DataIDContext);
    const [verificationPlantDetails, setVerificationPlantDetails] = useState(null);
    const [approvePlantDetails, setApprovePlantDetails] = useState(null);
    const [verificationPlantImage, setVerificationPlantImage] = useState(null);
    const [approvePlantImage, setApprovePlantImage] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isCommentVisible, setIsCommentVisible] = useState(false);
    const [isCommentAnimating, setIsCommentAnimating] = useState(false);
    const requestConfirmation = useConfirmation();
    const [comment, setComment] = useState('');

    const fetchData = async () => {
        if (selectedRowData) {
            setIsLoading(true);
            try {
                const { verification, approve } = await compareSelectedVerificationPlants(selectedRowData, false);
                setVerificationPlantDetails(verification);
                setVerificationPlantImage(await getPlantImage(verification.images));

                if (approve) {
                    setApprovePlantDetails(approve);
                    setApprovePlantImage(await getPlantImage(approve.images));
                }
            } catch (error) {
                console.error("Error fetching plants:", error);
            } finally {
                setIsLoading(false);
            }
        }
    };

    const rejectData = async () => {
        if (selectedRowData) {
            setIsLoading(true);
            const formatedDateModified = dateFormat(new Date(), 'yyyy-mm-dd hh-mm-ss', '+0');
            console.log(formatedDateModified);
            const data = {
                date_modified: new Date(formatedDateModified).toISOString(),
                id_action: 3,
                comment: comment
            };
            try {
                await verifyPlant(selectedRowData, data);
                onAction(`Data ${verificationPlantDetails.id_plant} rejected successfully`, 'success');
            } catch (error) {
                console.error("Error fetching plants:", error);
                onAction(`Failed to reject. Please try again.`, 'failed');
            } finally {
                setIsLoading(false);
            }
        }
    };

    const approveData = async () => {
        if (selectedRowData) {
            setIsLoading(true);
            const formatedDateModified = dateFormat(new Date(), 'yyyy-mm-dd hh-mm-ss', '+0');
            console.log(formatedDateModified);
            const data = {
                date_modified: new Date(formatedDateModified).toISOString(),
                id_action: 2,
            };
            try {
                await verifyPlant(selectedRowData, data);
                onAction(`Data ${verificationPlantDetails.id_plant} approved successfully`, 'success');
            } catch (error) {
                onAction(`Failed to approve. Please try again.`, 'failed');
            } finally {
                setIsLoading(false);
            }
        }
    };


    useEffect(() => {
        fetchData();
        setVerificationPlantImage(null);
        setApprovePlantImage(null);
        // eslint-disable-next-line
    }, [selectedRowData]);

    const handleRejectClick = () => {
        setIsCommentVisible(true);
    };

    const handleCancel = () => {
        setComment("");
        setIsCommentAnimating(true); // Mulai animasi keluar
        setTimeout(() => {
            setIsCommentVisible(false);
            setIsCommentAnimating(false);
        }, 300); // Durasi animasi sesuai CSS
    };

    const handleConfirm = () => {
        requestConfirmation(
            "Are you sure you want to reject this data?",
            "danger",
            async () => {
                try {
                    // Add your rejection logic here
                    await rejectData();
                    setIsCommentVisible(false);
                    onClose();
                } catch (error) {
                    console.error("Error rejecting data:", error);
                    // Handle error notification here if needed
                }
            }
        );
    };

    const handleApprove = () => {
        requestConfirmation(
            "Are you sure you want to approve this data?",
            "confirm",
            async () => {
                try {
                    await approveData();
                    onClose();
                } catch (error) {
                    console.error("Error approving data:", error);
                    // Handle error notification here if needed
                }
            }
        );
    };

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };

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
            <p className="verificationForm-form-title">Current Data</p>
            <p className="verificationForm-form-date">{verificationPlantDetails.dateModified}</p>
            <div className="verificationForm-image-wrapper">
                <Image alt="Plant Image" src={verificationPlantImage || NoImage} />
            </div>
            <TextField id="species" title="Species" value={verificationPlantDetails.plant} readonly={true} />
            <TextField id="plantingDate" title="Planting Date" value={verificationPlantDetails.plantingDate} readonly={true} />
            <TextField id="activity" title="Activity" value={verificationPlantDetails.activity} readonly={true} />
            <TextField id="skppkh" title="SKPPKH" value={verificationPlantDetails.skppkh} readonly={true} />
            <NumericField id="height" title="Height" value={verificationPlantDetails.height} suffix="cm" readonly={true} />
            <NumericField id="diameter" title="Diameter" value={verificationPlantDetails.diameter} suffix="cm" readonly={true} />
            <TextField id="status" title="Status" value={verificationPlantDetails.status} readonly={true} />
            <TextField id="plot" title="Plot" value={verificationPlantDetails.rehabilitationPlot} readonly={true} />
            <NumericField id="easting" title="Easting" value={verificationPlantDetails.easting} suffix="m" readonly={true} />
            <NumericField id="northing" title="Northing" value={verificationPlantDetails.northing} suffix="m" readonly={true} />
            <NumericField id="elevation" title="Elevation" value={verificationPlantDetails.elevation} suffix="m" readonly={true} />
        </>
    );

    const renderPreviousPlantDetails = () => {
        if (!approvePlantDetails) {
            return (
                <>
                    <p className="verificationForm-form-title">Previous Data</p>
                    <p className="verificationForm-form-date">Not Found</p>
                    <div className="verificationForm-image-wrapper">
                        <Image alt="Plant Image" src={NoImage} />
                    </div>
                    <TextField id="species" title="Species" value="" placeholder="Species" readonly={true} />
                    <TextField id="plantingDate" title="Planting Date" value="" placeholder="Planting Date" readonly={true} />
                    <TextField id="activity" title="Activity" value="" placeholder="Activity" readonly={true} />
                    <TextField id="skppkh" title="SKPPKH" value="" placeholder="SKPPKH" readonly={true} />
                    <NumericField id="height" title="Height" value="" suffix="cm" placeholder="Height" readonly={true} />
                    <NumericField id="diameter" title="Diameter" value="" suffix="cm" rplaceholder="Diameter" eadonly={true} />
                    <TextField id="status" title="Status" value="" placeholder="Status" readonly={true} />
                    <TextField id="plot" title="Plot" value="" placeholder="Plot" readonly={true} />
                    <NumericField id="easting" title="Easting" value="" suffix="m" placeholder="Easting" readonly={true} />
                    <NumericField id="northing" title="Northing" value="" suffix="m" placeholder="Northing" readonly={true} />
                    <NumericField id="elevation" title="Elevation" value="" suffix="m" placeholder="Elevation" readonly={true} />
                </>
            );
        }
        return (
            <>
                <p className="verificationForm-form-title">Previous Data</p>
                <p className="verificationForm-form-date">{approvePlantDetails.dateModified}</p>
                <div className="verificationForm-image-wrapper">
                    <Image alt="Plant Image" src={approvePlantImage || NoImage} />
                </div>
                <TextField id="species" title="Species" value={approvePlantDetails.plant} readonly={true} />
                <TextField id="plantingDate" title="Planting Date" value={approvePlantDetails.plantingDate} readonly={true} />
                <TextField id="activity" title="Activity" value={approvePlantDetails.activity} readonly={true} />
                <TextField id="skppkh" title="SKPPKH" value={approvePlantDetails.skppkh} readonly={true} />
                <NumericField id="height" title="Height" value={approvePlantDetails.height} suffix="cm" readonly={true} />
                <NumericField id="diameter" title="Diameter" value={approvePlantDetails.diameter} suffix="cm" readonly={true} />
                <TextField id="status" title="Status" value={approvePlantDetails.status} readonly={true} />
                <TextField id="plot" title="Plot" value={approvePlantDetails.rehabilitationPlot} readonly={true} />
                <NumericField id="easting" title="Easting" value={approvePlantDetails.easting} suffix="m" readonly={true} />
                <NumericField id="northing" title="Northing" value={approvePlantDetails.northing} suffix="m" readonly={true} />
                <NumericField id="elevation" title="Elevation" value={approvePlantDetails.elevation} suffix="m" readonly={true} />
            </>
        );
    };

    return (
        <div className="verificationForm-wrapper">
            <div className="verificationForm-header-wrapper">
                <div className="verificationForm-qrCode">
                    <div className="icon">
                        <QRCode />
                    </div>
                    <p className="value">{verificationPlantDetails ? verificationPlantDetails.id_plant : null}</p>
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
                        {isLoading ? renderShimmer() : renderPreviousPlantDetails()}
                    </div>
                    <div className="verificationForm-form-wrapper">
                        {isLoading ? renderShimmer() : renderPlantDetails()}
                    </div>
                </div>
                <div className="verificationForm-footer-button-wrapper">
                    {isCommentVisible && (
                        <div className={`verification-comment-container ${isCommentAnimating ? "fade-out" : "fade-in"}`}>
                            <AreaField
                                id="comment"
                                placeholder="Enter the reason for rejection..."
                                title="Comment"
                                rows={10}
                                value={comment}
                                onChange={handleCommentChange}
                            />
                            <div className="verificationForm-footer-button-wrapper">
                                <div className="verificationForm-footer-button">
                                    <ActionButton title="Cancel" type="ghost" onClick={handleCancel} />
                                </div>
                                <div className="verificationForm-footer-button">
                                    <ActionButton title="Confirm" type="confirm" onClick={handleConfirm} disabled={!comment.trim()} />
                                </div>
                            </div>
                        </div>
                    )}
                    <div className="verificationForm-footer-button">
                        <ActionButton title="Reject" type="danger" onClick={handleRejectClick} />
                    </div>
                    <div className="verificationForm-footer-button">
                        <ActionButton title="Approve" type="confirm" onClick={handleApprove} />
                    </div>
                </div>
            </div>

        </div>
    );
};

export default VerificationForm;
