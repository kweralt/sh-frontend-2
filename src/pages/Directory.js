// import { hi } from "date-fns/locale";
import React, { useEffect, useState } from "react";
import Controls from "../components/controls/Controls";
import {
  Search,
  Add,
  Close,
  EditOutlined,
  PeopleOutlineTwoTone,
  Map
} from "@material-ui/icons";
import Popup from "../components/Popup";
import Notification from "../components/Notification";
import ConfirmDialog from "../components/ConfirmDialog";
import ContentWrapper from "../components/ContentWrapper";
import PageHeader from "../components/PageHeader";
import {
  Paper,
  makeStyles,
  TableBody,
  TableRow,
  TableCell,
  Toolbar,
  InputAdornment,
} from "@material-ui/core";
import useTable from "../components/useTable";
import OutletForm from "../components/OutletForm";
import matchSorter from "match-sorter";
import _ from "underscore";

const headCells = [
    { id: "institution", label: "Institution"},
    { id: "outletName", label: "Outlet Name"},
    { id: "unitNumber", label: "Unit Number"},
    { id: "tenantName", label: "Tenant Name"},
    { id: "tenantEmail", label: "Tenant Email"},
    { id: "tenancyStart", label: "Tenancy Start"},
    { id: "tenancyEnd", label: "Tenancy End"},
    { id: "actions", label: "Actions", disableSorting: true}
];

export default function Directory() {
    const [records, setRecords] = useState([]);
    const [recordForEdit, setRecordForEdit] = useState(null);
    const [filterFunction, setFilterFunction] = useState({
        fn: (items) => {
            return items;
        }
    });
    const [openPopUp, setOpenPopUp] = useState(false);
    const [notify, setNotify] = useState({
        isOpen: false,
        message: "",
        type: ""
    });
    const [confirmDialog, setConfirmDialog] = useState({
        isOpen: false,
        title: "",
        subTitle: ""
    });


    const getRecords = async () => {
        const api = "http://localhost:8080/directory/outlets";
        const response = await fetch(api, {
            mode: "cors",
            method: "GET",
            headers: {
                "Access-Control-Allow-Origin": "http://localhost:8080"
              }
        });
        const getResponse = await response.json();
        console.log(getResponse);
        setRecords(getResponse);
        
    };


    useEffect(() => {
        getRecords();
    }, []);


    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(records, headCells, filterFunction);


    const handleSearch = (e) => {
        let target = e.target;
        setFilterFunction({
            fn: (items) => {
                if (target.value === "") return items;
                else {
                    return items.filter((x) => 
                        x.outletname.toLowerCase().includes(target.value.toLowerCase())
                    );
                }
            }
        });
    };


    const addOrEdit = (outlet,  resetForm) => {
        console.log(outlet.outletid);
        if (outlet.outletid === 0) {
            console.log("Add new outlet"); // TODO: Connect with /directory/outlets/add
        } else {
            resetForm();
            setRecordForEdit(null);
            setOpenPopUp(false);
            // useEffect();
            setNotify({
                isOpen: true,
                message: "Submitted successfully",
                type: "success"
            });
        }
    };
    
    
    const openInPopUp = (item) => {
        setRecordForEdit(item);
        setOpenPopUp(true);
      };


    return (
        <ContentWrapper>
            <PageHeader
                title="Directory of Retail Outlets"
                subTitle="hello"
                icon={<Map fontSize="large"/>}
            />
            <Paper>
                <Toolbar>
                    <Controls.Input
                        label="Filter by outlet name"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search/>
                                </InputAdornment>
                            )
                        }}
                        onChange={handleSearch}
                    />
                    <Controls.Button
                        text="Add outlet"
                        variant="outlined"
                        startIcon={<Add/>}
                        onClick={null}
                    />
                </Toolbar>
                <TblContainer>
                    <TblHead/>
                    <TableBody>
                        {recordsAfterPagingAndSorting().map((item) => (
                            <TableRow key={item.outletid}>
                                <TableCell>{item.institutionname}</TableCell>
                                <TableCell>{item.outletname}</TableCell>
                                <TableCell>{item.unitnumber}</TableCell>
                                <TableCell>{item.tenantname}</TableCell>
                                <TableCell>{item.email}</TableCell>
                                <TableCell>{item.tenancystart}</TableCell>
                                <TableCell>{item.tenancyend}</TableCell>
                                <TableCell>
                                    <Controls.ActionButton
                                        color="primary"
                                        onClick={() => {
                                            openInPopUp(item);
                                        }}>
                                            <EditOutlined fontSize="small"/>
                                    </Controls.ActionButton>
                                    <Controls.ActionButton
                                        color="secondary"
                                        onClick={() => {
                                            setConfirmDialog({
                                                isOpen: true,
                                                title: "Are you sure you want to delete this record?",
                                                subTitle: "You can't undo this operation",
                                                onConfirm: () => {
                                                    console.log("Record deleted");
                                                }
                                            });
                                        }}>
                                            <Close fontSize="small"/>
                                    </Controls.ActionButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TblPagination/>
                </TblContainer>
            </Paper>
            <Popup
                openPopup={openPopUp}
                setOpenPopup={setOpenPopUp}
                title={"Retail Outlet Form"}
            >
                <OutletForm recordForEdit={null} addOrEdit={addOrEdit}/>
            </Popup>
            <Notification
                notify={notify} 
                setNotify={setNotify} 
            />
            <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            />
        </ContentWrapper>
    );
}