import React, { useState, useEffect, useContext, useImperativeHandle, forwardRef } from 'react';
import './Table.css';
import CardTable from "../../../components/CardTable/CardTable";
import { searchApprovedPlants } from "../../../api/controller/approvedPlantsController";
import { DataIDContext } from "../../../context/SelectedIDContext";
import { SiteIDContext } from "../../../context/SiteIDContext";
import ExportForm from '../../../container/ExportForm/ExportForm';

const Table = forwardRef(({ onRowClick }, ref) => {
    const [tableHead] = useState(["Plant ID", "Species", "Planting Date", "Activities", "Location", "Status"]);
    const [orderOptions] = useState([
        { text: "Modified Date", value: "dateModified" },
        { text: "ID", value: "id_plant" },
        { text: "Species", value: "plant" },
        { text: "Planting Date", value: "plantingDate" },
        { text: "Location", value: "location" },
        { text: "Status", value: "status" }
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
    const [isExportFormVisible, setIsExportFormVisible] = useState(false);
    const [shouldRender, setShouldRender] = useState(false);

    const fetchTableData = async () => {
        setIsLoading(true);
        const config = {
            page: currentPage,
            rows: rowsPerPage,
            orderBy: orderBy,
            sort: sortOrder,
            search: searchTerm,
            site: parseInt(selectedSite)
        };

        try {
            const response = await searchApprovedPlants(config);
            setTableItems(response.data);
            setTotalPages(response.totalPages);
        } catch (error) {
            console.error("Error fetching plants:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useImperativeHandle(ref, () => ({
        fetchTableData,
        setIsLoading: () => {
            setIsLoading({ value: true, timestamp: Date.now() });
        },
    }));

    useEffect(() => {
        if(selectedSite){
            fetchTableData();
        }
        // eslint-disable-next-line
    }, [currentPage, rowsPerPage, orderBy, sortOrder, searchTerm, selectedSite]);

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
        if (onRowClick) {
            onRowClick(); 
        }
        setSelectedRowData(item.id_plant);
    };

    const handleExportForm = () => {
        if (isExportFormVisible) {
            setIsExportFormVisible(false);
            setTimeout(() => setShouldRender(false), 500); // Wait for animation to finish
        } else {
            setShouldRender(true);
            setTimeout(() => setIsExportFormVisible(true), 10); // Small delay to ensure transition applies
        }
    };

    return (
        <div className="table-container">
           {shouldRender && (
                <div className={`exportForm-container ${isExportFormVisible ? '' : 'hidden'}`}>
                    <ExportForm onClose={() => handleExportForm()} />
                </div>
            )}
            <CardTable
                tableHead={tableHead}
                tableItems={tableItems}
                orderOptions={orderOptions}
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={handlePageChange}
                onOrderChange={handleOrderChange}
                onRowsChange={handleRowsChange}
                onSortChange={handleSortChange}
                onSearchChange={handleSearchChange}
                onRowClick={handleRowClick}
                onLoading={isLoading}
                onExport={handleExportForm}
            />
        </div>
    );
});

export default Table;
