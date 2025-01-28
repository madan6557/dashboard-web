import React, { useState, useContext, useImperativeHandle, forwardRef, useEffect } from "react";
import './Verification.css';
import CardTable from "../../../components/CardTable/CardTable"
import FloorButton from "../../../components/FloorButton/FloorButton"
import { DataIDContext } from "../../../context/SelectedIDContext";
import { SiteIDContext } from "../../../context/SiteIDContext";
import { searchUnverifedPlants} from "../../../api/controller/verificationPlantsController";
import { searchDraftPlants } from "../../../api/controller/draftPlantsController";
import { searchRejectedPlants } from "../../../api/controller/rejectedPlantsController";

const Verification = forwardRef(({ onRowClick, onTabChange }, ref) => {
    const [tableHead, setTableHead] = useState(["ID", "Plant ID", "Species", "Activities", "Location", "Uploader", "Upload Date", "Verification"]);
    const [orderOptions] = useState([
        { text: "Modified Date", value: "dateModified" },
        { text: "Plant ID", value: "id_plant" },
        { text: "Species", value: "plant" },
        { text: "Planting Date", value: "plantingDate" },
        { text: "Location", value: "location" },
        { text: "Status", value: "status" },
        { text: "Uploader", value: "username" },
    ]);
    const [tableItems, setTableItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [sortOrder, setSortOrder] = useState('desc');
    const [orderBy, setOrderBy] = useState(orderOptions[0].value);
    const [searchTerm, setSearchTerm] = useState('');
    const { setSelectedRowData } = useContext(DataIDContext);
    const { selectedSite } = useContext(SiteIDContext);
    const [isLoading, setIsLoading] = useState(false);

    // Tambahkan state untuk menyimpan FloorButton yang sedang dipilih
    const [selectedTab, setSelectedTab] = useState("Unverified");

    const fetchTableData = async () => {
        setIsLoading(true);
        onTabChange();
        const controller = new AbortController();
        const signal = controller.signal;

        const config = {
            page: currentPage,
            rows: rowsPerPage,
            orderBy: orderBy,
            sort: sortOrder,
            search: searchTerm,
            site: parseInt(selectedSite),
            signal // Tambahkan signal ke konfigurasi
        };

        try {
            let response;
            if (selectedTab === "Unverified") {
                setTableHead(["ID", "Plant ID", "Species", "Activities", "Location", "Uploader", "Upload Date", "Verification"]);
                response = await searchUnverifedPlants(config);
            } else if (selectedTab === "Rejected") {
                setTableHead(["ID", "Plant ID", "Species", "Activities", "Location", "Uploader", "Modified At", "Verification"]);
                response = await searchRejectedPlants(config);
            } else if (selectedTab === "Draft") {
                setTableHead(["ID", "Plant ID", "Species", "Activities", "Location", "Uploader", "Modified At", "Progress"]);
                response = await searchDraftPlants(config);
            }

            if (!signal.aborted) {
                setTableItems(response.data);
                setTotalPages(response.totalPages);
            }

        } catch (error) {
            if (error.name !== 'AbortError') {
                console.error("Error fetching plants:", error);
            }
        } finally {
            if (!signal.aborted) {
                setIsLoading(false);
            }
        }

        return controller;
    };

    // Expose fetchTableData to the parent component
    useImperativeHandle(ref, () => ({
        fetchTableData,
        setIsLoading: () => {
            setIsLoading({ value: true, timestamp: Date.now() });
        },
    }));

    useEffect(() => {
        let controller;

        const fetchAndSetData = async () => {
            controller = await fetchTableData();
        };

        fetchAndSetData();

        return () => {
            if (controller) {
                controller.abort(); // Batalkan permintaan sebelumnya jika ada
            }
        };
        // eslint-disable-next-line
    }, [currentPage, rowsPerPage, orderBy, sortOrder, searchTerm, selectedSite, selectedTab]);


    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleOrderChange = (order) => {
        setOrderBy(order);
    };

    const handleRowsChange = (rows) => {
        setRowsPerPage(rows);
    };

    const handleSortChange = (sort) => {
        setSortOrder(sort);
    };

    const handleSearchChange = (search) => {
        setSearchTerm(search);
    };

    const handleRowClick = (item) => {
        if (selectedTab === "Unverified") {
            setSelectedRowData(item.id_verification);
        } else if (selectedTab === "Rejected") {
            setSelectedRowData(item.id_reject);
        } else if (selectedTab === "Draft") {
            setSelectedRowData(item.id_draft);
        }
        onRowClick(selectedTab);
    };

    return (
        <div className="verification-container">
            <div className="floorButton-container">
                {/* FloorButton dengan kondisi selected */}
                <FloorButton
                    title="Unverified"
                    isSelected={selectedTab === "Unverified"}
                    onClick={() => setSelectedTab("Unverified")}
                />
                <FloorButton
                    title="Rejected"
                    isSelected={selectedTab === "Rejected"}
                    onClick={() => setSelectedTab("Rejected")}
                />
                <FloorButton
                    title="Draft"
                    isSelected={selectedTab === "Draft"}
                    onClick={() => setSelectedTab("Draft")}
                />
            </div>
            <CardTable
                tableHead={tableHead}
                tableItems={tableItems}
                orderOptions={orderOptions}
                totalPages={totalPages} // Assuming total items is 100 for this example
                currentPage={currentPage}
                onPageChange={handlePageChange}
                onOrderChange={handleOrderChange}
                onRowsChange={handleRowsChange}
                onSortChange={handleSortChange}
                onSearchChange={handleSearchChange}
                onRowClick={handleRowClick}
                onLoading={isLoading}
                onRefresh={fetchTableData}
            />
        </div>
    );
});

export default Verification;
