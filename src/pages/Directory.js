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


const getAllOutlets =  async () => {
    const response = await fetch("http://localhost:8080/directory/outlets", {
        mode: "cors",
        method: "GET",
        headers: {
            "Access-Control-Allow-Origin": "http://localhost:8080"
          }
    });
    return response.json();
}

export default function Directory() {
    // const [data, setData] = useState(null);

    useEffect(() => {
        getAllOutlets()
        .then((res) => {
            console.log(res);
        })
    }, []);

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
                        label="Filter by..."
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search/>
                                </InputAdornment>
                            )
                        }}
                        onChange={null} // TODO: Please add something here
                    />
                    <Controls.Button
                        text="Add outlet"
                        variant="outlined"
                        startIcon={<Add/>}
                        onClick={null}
                    />
                </Toolbar>
            </Paper>
        </ContentWrapper>
    );
}