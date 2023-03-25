const noteRoutes = require("express").Router();
const Notes = require("../model/noteSchema");
noteRoutes.delete("/deleteall/:email", async (req, res) => {
  try {
    console.log("delete rouest");
    const deleteAll = await Notes.deleteMany({ email: req.params.email });
    res.send(deleteAll);
  } catch (error) {
    res.send(error);
  }
});

noteRoutes.delete("/delete/:id", async (req, res) => {
  try {
    const unwantedNote = await Notes.findByIdAndDelete({ _id: req.params.id });
    res.status(204).send("Deleted");
  } catch (error) {
    res.status(404).send("ID not found");
  }
});
noteRoutes.put("/update/:id", async (req, res) => {
  try {
    const update = await Notes.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    res.status(200).json({
      status: "Sucess",
      updatedNotes: update,
    });
  } catch (error) {
    res.status(404).json({
      status: "Failed",
      error: error.message,
    });
  }
});
noteRoutes.get("/:email", async (req, res) => {
  try {
    const allNotes = await Notes.find({ email: req.params.email });
    res.status(200).json({
      status: "Success",
      notes: allNotes,
    });
  } catch (error) {
    res.send(error);
  }
});
noteRoutes.post("/", async (req, res) => {
  console.log(req.body);
  try {
    let dateNow = Date.now();
    let date = new Date(dateNow);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const newPost = await Notes.create({
      title: req.body.title,
      email: req.body.email,
      description: req.body.description,
      date: `${day}/${month}/${year}  ${hours}:${minutes}:${seconds}`,
    });
    res.status(200).json({
      status: "Success",
      post: newPost,
    });
  } catch (error) {
    res.status(400).send(error);
  }
});
module.exports = noteRoutes;
