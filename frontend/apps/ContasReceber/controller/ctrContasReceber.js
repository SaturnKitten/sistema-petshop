const { Cookie } = require("express-session");

const axios = require("axios");

const ManutContasReceber = async (req, res) =>
  (async () => {
    if (req.method == "POST") {
      const formData = req.body;

   
      if (!validate.Validar(formData)) {
        return res
          .status(400)
          .json({ status: "error", msg: "Dados de entrada validados" });
      }

  
      const resp = await axios
        .post(process.env.SERVIDOR_PETSHOPBack + "/ContaReceber", formData, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .catch((error) => {
          return res
            .status(400)
            .json({ status: "error", msg: error.response.data.msg });
        });

      if (!resp.data) {
        return;
      }


      return res.json({ status: "ok", msg: "Conta registrada com sucesso!" });
    } else {
     
      var parametros = { title: "PetShop - Manutenção de Contas a Receber" };
      res.render("financeiro/contasReceber/view/vwContaReceber.njk", {
        parametros,
      });
    }
  })();

module.exports = {
  ManutContasReceber,
};
