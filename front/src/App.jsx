import {useEffect, useState} from "react";
import "./App.css";
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

let flag = false;
let listID = 0;

// const lists = [];

function App() {
    const [editModalIsOpen, setEditModalIsOpen] = useState(false);
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
            transform: "translate(-50%, -50%)",
            minWidth: "40%",

        },
    };

    console.log('mountFlag', mountFlag)
    console.log('!mountFlag', !mountFlag)

    function openModal() {
        setEditModalIsOpen(true);
    }

    function closeModal() {
        setEditModalIsOpen(false);
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
        <>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column", // 縦並び
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                    px: 2,
                    textAlign: "center",
                }}
            >
                <h1>リスト一覧</h1>

                {list.map((obj) =>


                    <Box style={{border: "1px solid black", padding: 4}} key={obj.id} index={obj.id}
                    >{obj.title} <br/>
                        <IconButton aria-label="delete" data-index={obj.id} onClick={edit}>
                            ✏️
                        </IconButton>
                        <IconButton aria-label="delete" data-index={obj.id} onClick={gotoitems}>
                            🛒
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
                />

                <Button onClick={listRegister}>追加</Button>
                <Button onClick={closeModal}>中止</Button>
            </Modal>
        </>
    );
}

export {App, listID};
