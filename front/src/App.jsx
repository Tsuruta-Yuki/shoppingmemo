import {useEffect, useState} from "react";
import Modal from "react-modal";
import {
    Box,
    Typography,
    Button,
    Stack,
    IconButton,
    CircularProgress, TextField,
} from "@mui/material";
import {userID} from "./components/StartForm.jsx";
import {useNavigate} from "react-router";
import {QRCodeCanvas} from 'qrcode.react';

let flag = false;
let listID = 0;
let url = '';

// const lists = [];

function App() {
    const [editModalIsOpen, setEditModalIsOpen] = useState(false);
    const [qrModalIsOpen, setQRModalIsOpen] = useState(false);
    const [input, setInput] = useState("");
    const [mountFlag, setmountFlag] = useState(false);
    const [list, setList] = useState([]);
    const navigate = useNavigate();

    const customStyles = {
        content: {
            top: "30%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            width: "80%",
            transform: "translate(-50%, -50%)",

        },
    };


    function openModal() {
        setEditModalIsOpen(true);
    }

    function closeModal() {
        setEditModalIsOpen(false);
    }

    function openQRModal(e) {
        console.log(e.currentTarget.dataset.index);
        url = `http://localhost:5173/main/${e.currentTarget.dataset.index}`;
        setQRModalIsOpen(true);
    }

    function closeQRModal() {
        setQRModalIsOpen(false);
    }


    async function listRegister() {
        await fetch('/api/lists', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "ownerID": userID,
                "title": input,
            })
        });
        setEditModalIsOpen(false);
        setmountFlag(!mountFlag);

    }

    function setinput(e) {
        setInput(e.target.value);
    }

    function gotoitems(e) {
        listID = e.currentTarget.dataset.index;
        navigate("/item");
    }

    function edit() {

    }

    async function listDelete(e) {
        await fetch(`api/lists/${(e.currentTarget.dataset.index)}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({}),
        });

        setmountFlag(!mountFlag);
    }

    async function fetchLists() {
        const templist = []
        let getArray = await fetch(`/api/lists/${userID}`);
        getArray = await getArray.json();
        templist.length = 0;
        for (const obj of getArray) {
            templist.push(obj);
        }

        setList(templist);
    }

    useEffect(() => {
        console.log('useEffect');
        fetchLists();

        console.log('mountFlag', mountFlag);


    }, [mountFlag]);


    return (
        <Box width={"390px"}>
            <Typography variant={"h4"} textAlign={"center"} paddingTop={"10px"}>
                リスト一覧
            </Typography>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column", // 縦並び
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                    px: 2,
                    textAlign: "center",
                    margin: "5px",
                    marginTop: "30px"
                }}
            >


                {list.map((obj) =>


                    <Box style={{
                        border: "1px solid #2196f3",
                        borderRadius: '16px',
                        padding: 5,
                        margin: "10px",
                        width: '100%'
                    }} key={obj.id}
                         index={obj.id}
                    >{obj.title}
                        <IconButton aria-label="edit" data-index={obj.id} onClick={edit}>
                            ✏️
                        </IconButton>
                        <IconButton aria-label="item" data-index={obj.id} onClick={gotoitems}>
                            🛒
                        </IconButton>
                        <IconButton aria-label="edit" data-index={obj.id} onClick={openQRModal}>
                            📲
                        </IconButton>
                        <IconButton aria-label="delete" data-index={obj.id} onClick={listDelete}>
                            🗑️
                        </IconButton>

                    </Box>
                )}


                <Button onClick={openModal}>リストを追加</Button>
            </Box>

            <Modal isOpen={editModalIsOpen} style={customStyles} ariaHideApp={false}>
                <TextField
                    label="リスト名を入力"
                    onChange={setinput}
                    fullWidth={true}
                />

                <Button onClick={listRegister}>追加</Button>
                <Button onClick={closeModal}>中止</Button>
            </Modal>


            <Modal isOpen={qrModalIsOpen} style={customStyles} contentLabel="QRコード" ariaHideApp={false}>

                <Box sx={{display: 'flex', justifyContent: 'center'}}>

                    <QRCodeCanvas
                        value={url}
                        size={128}
                        bgColor={"#FFFFFF"}
                        fgColor={"#000000"}
                        level={"M"}
                        marginSize={4}
                    />


                </Box>

                <Button onClick={closeQRModal}>閉じる</Button>
            </Modal>

        </Box>
    );
}

export {App, listID};
