import {useNavigate} from "react-router";
import {Box, Button, TextField, Typography} from "@mui/material";
import logo from "../assets/logo.png";
import {useState} from "react";

let userID = 0;

function StartForm() {
    const [input, setInput] = useState("");
    const navigate = useNavigate(); //フック。関数などイベント内で動的に遷移。

    const setinput = (e) => {
        setInput(e.target.value);
    };


    async function handleRegister() {

        await fetch('/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "username": input
            }),
        });

        let response = await fetch(`/api/users/${input}`);
        response = await response.json();

        userID = response[0].id
        navigate("/main");
    }


    return (

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
            <Typography variant={"h3"}>お買い物メモ</Typography>
            <Box
                component={"img"}
                src={logo}
                alt="買い物"
                style={{
                    width: "100%", // size調整
                    // maxWidth: "300px",
                    height: "auto",
                    mb: 4,
                }}
            ></Box>

            <TextField
                label="名前を入力"
                onChange={setinput}
            />

            <Button onClick={handleRegister}>提出</Button>
        </Box>
    );
}

export {StartForm, userID};