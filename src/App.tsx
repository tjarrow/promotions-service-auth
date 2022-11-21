import { LoginForm } from "./components/LoginForm";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { CadastroForm } from "./components/CadastroForm";
import { Route, Switch } from "react-router-dom";
import { LoginModal } from "./components/Modal";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import store from "./store";

function App() {

    return (
        <>
            <Header/>
            <Switch>
                <Route exact path="/" component={LoginForm}/>
                <Route exact path="/cadastro-form" component={CadastroForm}/>
            </Switch>
            <Footer/>
        </>
    );
}

export default App;
