//Arquivo app/login/controller/ctlLogin.js

axios = require("axios");

const Login = async (req, res) => {
    let resp;

    if (req.method == "POST" && req.body.username !== "") {
        console.log("[ctlLogin.js] Valor ServidorPETSHOP:", process.env.SERVIDOR_PETSHOP);
        resp = await axios.post(process.env.SERVIDOR_PETSHOP + "/Login", {
            username: req.body.username,
            password: req.body.password
        });
        if (!resp.data.auth) {
            res.render("login/login", {
                title: "Login",
                message: resp.data.message
            });
        } else {
            session = req.session;
            session.isLogged = true;
            session.userName = req.body.username;
            session.token = resp.data.token;
            return res.redirect("/");
        }
    }
    res.render("login/login", { title: "Login", message: "", });
}

function Logout(req, res) {
    session = req.session;
    session.isLogged = false;
    session.token = false;
    res.redirect("/Login");
}
module.exports = {
    Login,
    Logout,
};
