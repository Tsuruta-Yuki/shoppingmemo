import {useEffect, useState} from "react";
import Modal from "react-modal";
import {
    Box,
    Typography,
    Button,
    Stack,
    IconButton,
    CircularProgress, TextField, FormControlLabel,
} from "@mui/material";
import {listID} from "../App.jsx";
import Radio from '@mui/material/Radio';

function Item() {
    const [editModalIsOpen, setEditModalIsOpen] = useState(false);
    const [input, setInput] = useState("");
    const [numinput, setNumInput] = useState(0);
    const [mountFlag, setmountFlag] = useState(false);
    const [Item, setItem] = useState([]);
    const [checkednum, setCheckednum] = useState(0);
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
        console.log(e.currentTarget.dataset.index)
        setCheckednum(e.currentTarget.dataset.index);
        console.log(checkednum)

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
                <h1>買い物リスト</h1>
                {Item.map((obj) =>


                    <Box style={{border: "1px solid black", padding: 4}} key={obj.id} index={obj.id}
                    >
                        {/*<Radio data-index={obj.id} checked={false} onClick={handleClick}/>*/}
                        <input
                            type="checkbox"
                            className="mr-2"
                            checked={obj.done}
                            onChange={() => handleClick(obj.id)}
                        />

                        {obj.itemName} {obj.number}

                        <IconButton aria-label="delete" data-index={obj.id} onClick={itemDelete}>
                            🗑️
                        </IconButton>

                    </Box>
                )}

                <Button onClick={openModal}>商品を追加</Button>
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