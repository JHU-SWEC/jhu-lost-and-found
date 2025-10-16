import { Request, Response } from 'express';
import Item from '../models/Item';

export const getItems = async (req: Request, res: Response) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

export const createItem = async (req: Request, res: Response) => {
  try {
    const item = new Item(req.body);
    const savedItem = await item.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};
