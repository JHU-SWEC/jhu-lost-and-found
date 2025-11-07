import { Request, Response } from "express";
import Item from "../models/Item";

export const getItems = async (req: Request, res: Response) => {
  try {
    const { found } = req.query;

    // if found is defined, filter by it
    const filter = found !== undefined ? { found: found === "true" } : {};

    const items = await Item.find(filter).sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

export const createItem = async (req: Request, res: Response) => {
  try {
    const item = new Item({
      ...req.body,
      user: req.body.user || "Anonymous",
    });
    const savedItem = await item.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};
