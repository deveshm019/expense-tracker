import model from "../models/model.js";

async function createCategories(req, res) {
  const { type, color } = req.body;
  try {
    const Create = new model.Categories({
      type: type,
      color: color,
    });
    const savedCategory = await Create.save();
    return res.json(savedCategory);
  } catch (error) {
    return res
      .status(400)
      .json({ message: `Error while creating categories! ${error.message}` });
  }
}

async function getCategories(req, res) {
  let data = await model.Categories.find().select("-_id type color ");
  return res.json(data);
}

async function createTransaction(req, res) {
  try {
    if (!req.body) {
      return res.status(400).json("Data not provided!");
    }
    const { name, type, amount } = req.body;
    const create = new model.Transaction({
      name: name,
      type: type,
      amount: amount,
      date: new Date(),
    });
    const savedTransaction = await create.save();
    return res.json(savedTransaction);
  } catch (error) {
    return res.status(400).json({ message: `Error: ${error.message}` });
  }
}

async function getTransaction(req, res) {
  let data = await model.Transaction.find();
  return res.json(data);
}

async function deleteTransaction(req, res) {
  try {
    if (!req.body) {
      return res.status(400).json({ message: "Data not received!" });
    }
    const result = await model.Transaction.deleteOne(req.body);
    if (result.deletedCount === 0) {
      return res
        .status(404)
        .json({ message: "No transaction found to delete!" });
    }
    return res.json({ message: "Transaction deleted successfully!" });
  } catch (error) {
    return res.status(500).json({
      message: `Failed to delete transaction! Error: ${error.message}`,
    });
  }
}

async function getLabels(req, res) {
  model.Transaction.aggregate([
    {
      $lookup: {
        from: "categories",
        localField: "type",
        foreignField: "type",
        as: "categoriesInfo",
      },
    },
    {
      $unwind: "$categoriesInfo",
    },
  ])
    .then((result) => {
      let data = result.map(v=>Object.assign({},{_id: v._id, name: v.name, type: v.type, amount: v.amount, color: v.categoriesInfo["color"]}));
      res.json(data);
    })
    .catch((error) => {
      res.status(400).json(`Lookup collection error: ${error}`);
    });
}

// 02:00:00 done

export default {
  createCategories,
  getCategories,
  createTransaction,
  getTransaction,
  deleteTransaction,
  getLabels,
};
