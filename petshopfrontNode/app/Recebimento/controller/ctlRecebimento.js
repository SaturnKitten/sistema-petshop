const { Cookie } = require("express-session");
const axios = require("axios");

const ManutRecebimento = async (req, res) =>
  (async () => {
    if (req.method == "POST") {
      const formData = req.body;


      const resp = await axios.post(process.env.SERVIDOR_SIADBack + "/InsertRecebimentos", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      }).catch(error => {
        return res.status(400).json({
          status: "error",
          msg: error.response?.data?.msg || "Erro ao registrar recebimento",
        });
      });

      if (!resp || !resp.data) {
        return;
      }

      return res.json({ status: "ok", msg: "Recebimento registrado com sucesso!" });
    } else { // GET
      var parametros = { title: "Recebimentos" };
      res.render("30200financeiro/30220recebimento/view/vwRecebimento.njk", { parametros });
    }
  })();

module.exports = {
  ManutRecebimento,
};
