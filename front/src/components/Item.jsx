import {useEffect, useState} from "react";
import Modal from "react-modal";
import {
    Box,
    Typography,
    Button,
    Stack,
    IconButton,
    CircularProgress, TextField, FormControlLabel, ToggleButton, Checkbox,
} from "@mui/material";
import {listID} from "../App.jsx";
import {useNavigate} from "react-router";


function Item() {
    const [editModalIsOpen, setEditModalIsOpen] = useState(false);
    const [input, setInput] = useState("");
    const [numinput, setNumInput] = useState(0);
    const [mountFlag, setmountFlag] = useState(false);
    const [Item, setItem] = useState([]);
    const [checkednum, setCheckednum] = useState(0);
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

    function openModal() {
        setEditModalIsOpen(true);
    }

    function setinput(e) {
        setInput(e.target.value);
    }

    function setnuminput(e) {
        setNumInput(e.target.value);
    }

    function closeModal() {
        setEditModalIsOpen(false);
    }

    async function itemRegister() {
        await fetch('/api/items', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "listID": listID,
                "itemName": input,
                "number": numinput,
            })
        });
        setEditModalIsOpen(false);
        setmountFlag(!mountFlag);

    }


    async function fetchItems() {
        const templist = []
        let getArray = await fetch(`/api/items/${listID}`);
        getArray = await getArray.json();
        templist.length = 0;
        for (const obj of getArray) {
            templist.push(obj);
        }

        setItem(templist);
    }

    useEffect(() => {
        console.log('useEffect');
        fetchItems();

        console.log('mountFlag', mountFlag);


    }, [mountFlag]);

    async function itemDelete(e) {
        // console.log("e", e.target);
        // e.target.style.backgroundColor = "black";
        await fetch(`api/items/${(e.currentTarget.dataset.index)}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({}),
        });

        setmountFlag(!mountFlag);
    }

    function handleClick(e) {
        if (e.target.checked === true) {
            e.currentTarget.style.textDecoration = 'line-through';
        } else {
            e.currentTarget.style.textDecoration = '';
        }
    }


    function gotoList(e) {
        navigate("/main");
    }


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
                <h1>購入商品一覧</h1>
                {Item.map((obj) =>


                    <Box style={{border: "1px solid black", padding: 4}} key={obj.id} index={obj.id}
                    >
                        <FormControlLabel control={<Checkbox/>} onClick={handleClick}
                                          label={obj.itemName + "  " + obj.number}/>

                        <IconButton aria-label="delete" data-index={obj.id} onClick={itemDelete}>
                            🗑️
                        </IconButton>

                    </Box>
                )}

                <Button onClick={openModal}>商品を追加</Button>
                <Button onClick={gotoList}>リスト一覧へ戻る</Button>
            </Box>
            <Modal isOpen={editModalIsOpen} style={customStyles} ariaHideApp={false}>
                <TextField
                    label="商品名を入力"
                    onChange={setinput}
                />
                <TextField
                    label="個数を入力"
                    onChange={setnuminput}
                />

                <Button onClick={itemRegister}>追加</Button>
                <Button onClick={closeModal}>中止</Button>
            </Modal>

        </>


    )

}

export default Item;