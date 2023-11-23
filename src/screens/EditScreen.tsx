import { Menu as MenuIcon } from "@mui/icons-material";
import {
    AppBar,
    Box,
    Divider,
    IconButton,
    Paper,
    Stack,
    Toolbar,
    Typography,
} from "@mui/material";
import React from "react";
import Header from "../components/Header";
import Outline from "../components/Outline";

const EditScreen = () => {
    return (
        <Stack height={"100vh"}>
            <Header />
            <Stack direction="row" width="100%" flexGrow={"1"}>
                <Outline />
                <Divider orientation="vertical" flexItem />
                <Box>345</Box>
            </Stack>
        </Stack>
    );
};

export default EditScreen;
