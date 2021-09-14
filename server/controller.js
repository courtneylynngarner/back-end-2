const houses = require("./db.json");
let globalId = 4;

module.exports = {
  getHouses: (req, res) => {
    res.status(200).send(houses);
  },
  deleteHouse: (req, res) => {
    const { id } = req.params;
    let index = houses.findIndex((elem) => elem.id === +id);
    houses.splice(index, 1);
    res.status(200).send(houses);
  },
  createHouse: (req, res) => {
    const { address, price, imageURL } = req.body;
    let newHouse = {
      id: globalId,
      address,
      price,
      imageURL,
    };
    if (!address || !price || !imageURL) {
      res.status(400).send("Incomplete Information");
    } else {
      houses.push(newHouse);
      globalId++;
      res.status(200).send(houses);
    }
  },
  updateHouse: (req, res) => {
    const { id } = req.params;
    const { type } = req.body;
    let index = houses.findIndex((elem) => elem.id === +id);

    if (houses[index].price <= 10000 && type === "minus") {
      res.status(400).send(`Cant't go below $0.00`);
    } else if (type === "minus") {
      houses[index].price -= 10000;
      res.status(200).send(houses);
    } else if (type === "plus") {
      houses[index].price += 10000;
      res.status(200).send(houses);
    } else {
      res.sendStatus(400);
    }
  },
};
