require("dotenv").config();
const { quotes } = require("../models");
const axios = require("axios");

class Controller {

  static async getApiQuotes(req, res, next) {
    let fav = [true,false];
      let obj = {
        quotes:"",
        favorites:fav[Math.round(Math.random())]
      }
      let data = await axios({
        method: "GET",
        url: `https://api.kanye.rest/`,
      })
      if(data){
        obj.quotes = data.data.quote;
        try {
          await quotes.create(obj)
        } catch (err) {
          res.status(409).json(err.errors[0].message)
        }
      }
  }
  static async getAllQuotes(req,res){
      let quotesUnfav = await quotes.findAll({
                where: {
                    favorites: false
                }
            })
      let favorites = await quotes.findAll({
                where: {
                    favorites: true
                }
            })
    await res.status(200).json({quotes:quotesUnfav, favorites:favorites});
  }
  
  static async postQuotes(req, res) {

    let obj = {
      quotes : req.body.quotes,
      favorites : req.body.favorites
    };
    try {
      let data = await quotes.create(obj);
      res.status(201).json(data);
    } catch (error) {
      res.status(500).json({message: "data duplicated"});
    }
  }

  static async updateQuotes(req, res) {
    let id = req.params.id;
    let newData = {
      favorites: req.body.favorites,
    };
    try {
      let data = await quotes.update(newData, { where: { id } });
      data
        ? res.status(200).json({ messsage: "data updated" })
        : res.status(404).json({
            message: "data can't be updated / not found",
          });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async deleteQuotes(req, res) {
    let id = req.params.id;
    try {
      let data = await quotes.destroy({ where: { id } });
      data
        ? res.status(201).json({ message: "Data has been removed" })
        : res.status(404).json({ message: "error data not found" });
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
module.exports = Controller;
