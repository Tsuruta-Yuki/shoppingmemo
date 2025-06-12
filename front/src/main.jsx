import {createRoot} from 'react-dom/client'
import {ThemeProvider, CssBaseline} from "@mui/material";
import theme from "./theme";
import AppLayout from "./components/AppLayout.jsx";
import {StartForm} from "./components/StartForm.jsx";
import {BrowserRouter, Route, Routes} from "react-router";
import {App} from "./App.jsx";
import Item from "./components/Item.jsx";

createRoot(document.getElementById('root')).render(
    <ThemeProvider theme={theme}>
        <CssBaseline/>
        <AppLayout>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<StartForm/>}/>
                    <Route path="/main" element={<App/>}/>
                    <Route path="/item" element={<Item/>}/>
                </Routes>
            </BrowserRouter>
        </AppLayout>
    </ThemeProvider>
)
