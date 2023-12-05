import { Request, Response } from "express";
import { ObjectId } from "mongodb";

const getNotes = async (req: Request, res: Response) => {
    try {
        const notes = await req.db.collection('notes').find({}).toArray();
        res.send({ status: 'success', message: 'Notes fetched successfully', data: notes });
    } catch (error) {
        console.log(error);
        res.send({ status: 'error', message: 'Server Error' });
    }
}

const addNote = async (req: Request, res: Response) => {
    const { title, content } = req.body;
    const note = { title, content };
    try {
        const result = await req.db.collection('notes').insertOne(note);
        res.send({ status: 'success', message: 'Note added successfully', data: result});
    } catch (error) {
        console.log(error);
        res.send({ status: 'error', message: 'Server Error' });
    }
}

const deleteNote = async (req: Request, res: Response) => {
        const { id } = req.params;
        const query = { _id: new ObjectId(id) };
    try {
        const result = await req.db.collection('notes').deleteOne(query);
        res.send({ status: 'success', message: 'Note deleted successfully', data: result});
    } catch (error) {
        console.log(error);
        res.send({ status: 'error', message: 'Server Error' });
    }
}

export default {getNotes, addNote, deleteNote};