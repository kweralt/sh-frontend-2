import { useState, useEffect } from "react";
import {
    makeStyles,
    Paper,
    Typography,
    TextField,
    IconButton,
    Button,
    GridList,
    GridListTile,
} from "@material-ui/core";
import ContentWrapper from "../components/ContentWrapper";
import Notification from "../components/Notification";
import { ArrowBack } from "@material-ui/icons";
import { Link, useLocation } from "react-router-dom";
import ImageUploader from "react-images-upload";
import * as rectificationServices from "../services/rectificationServices";
// import image1 from "../img/img1.jpeg";
// import image2 from "../img/img2.jpeg";
// import image3 from "../img/img3.jpeg";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        marginBottom: theme.spacing(2),
    },
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3),
    },
    gridList: {
        flexWrap: 'nowrap',
        transform: 'translateZ(0)',
    },
    subTitle: {
        paddingLeft: theme.spacing(4),
        "& .MuiTypography-subtitle2": {
            opacity: "0.6",
        }
    },
}));

const imageExtensions = [".jpg", ".jpeg", ".gif", ".png"];

// const ttileData = [
//     {
//         image:image1,
//     },
//     {
//         image:image2,
//     },
//     {
//         image:image3,
//     },
// ]

export default function TenantSubmission() {
    const classes = useStyles();
    const {state} = useLocation();
    const [pictures, setPictures] = useState([]);
    const [tileData, setTileData] = useState([]);
    const [notes, setNotes] = useState();
    const [comments, setComments] = useState();

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        const data = await rectificationServices.getNCReport(state);
        setTileData(data.reportImageUrls);
        setComments(data.Comments);
    }

    const [notify, setNotify] = useState({
        isOpen: false,
        messsage: "Rectification Submitted!",
        type: "success",
    });

    const onDrop = (picture) => {
        setPictures(pictures.concat(picture));
    };

    const onSubmit = () => {
        //setnotify, upload images, textfield
        rectificationServices.submitRectificationImages(pictures, notes, state);
        setNotify(true);
    }
    return (
        <ContentWrapper>
        <div className={classes.root}>
            <IconButton to="/actions" component={Link}>
                <ArrowBack fontSize="large"/>
            </IconButton>
            <Typography align="center" variant='h5' gutterbottom>Audit Feedback</Typography>
            <Paper>
                <GridList classname={classes.gridList}
                cols={tileData.length}
                >
                    {tileData.map((tile) => (
                        <GridListTile key={tile.image}
                        cols={1}>
                            <img src={tile.image}/>
                        </GridListTile>
                    ))}
                </GridList>
            </Paper>
            <Paper>
                {comments != null ? <Typography
                variant="body1"
                >{comments}</Typography>:
                <div className={classes.subTitle}>
                    <Typography variant="subtitle2"
                        component="div">
                        There are no additional comments from the auditor.
                    </Typography>
                </div>}
            </Paper>
                <Typography align="center" variant='h5' gutterbottom>Rectification Report</Typography>
            <Paper>
                <TextField
                    // id="notes"
                    label="Notes"
                    placeholder="Please enter explanations if any."
                    multiline
                    fullWidth
                    rows='3'
                    onChange={(e) => setNotes(e.target.value)}
                />
            </Paper>
            <Paper>
                <ImageUploader
                    label="Rectification Photos"
                    withPreview={true}
                    onChange={onDrop}
                    imgExtension={imageExtensions}
                    maxFileSize={5242880}
                />
            </Paper>
            <Button color='primary'
            fullWidth
            variant='contained'
            onClick={onSubmit}
            component={Link}
            to={{
                pathname: "/actions",
            }}
            align='center'>Submit</Button>
            <Notification notify={notify} setNotify={setNotify}/>
        </div>
        </ContentWrapper>
    )
}