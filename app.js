import express from 'express'
import * as db from './util/database.js'

const PORT = 8080;

const app = express();
app.use(express.json());

app.get('/notes', (req, res) =>{
    try{
        const notes = db.getAllNotes();
        res.status(200).json(notes);
    }
    catch(e){
        res.status(500).json({message: `${e}`});
    }
});

app.get('/notes/:id', (req, res) =>{
    try{
        const note = db.getNote(req.params.id);
        if(!note){
            res.status(404).json({message: 'Note not found'});
        }
        res.status(200).json(note);
    }
    catch(e){
        res.status(500).json({message: `${e}`});
    }
});

app.post('/notes', (req, res) =>{
    try{
        const {title, content} = req.body;
        if(!title || !content){
            res.status(400).json({message: 'Invalid format!'});
        }

        const savedNote = db.saveNote(title, content);
        if(savedNote.changes != 1){
            return res.status(501).json({message: 'Note save failed!'});
        }
        
        res.status(201).json({id: savedNote.lastInsertRowid});
    }
    catch(e){
        res.status(500).json({message: `${e}`});
    }
});

app.delete('/notes/:id', (req, res) =>{
    try{
        const deletedNote = db.deleteNote(req.params.id);
        if(deletedNote.changes != 1){
            return res.status(404).json({message: 'Note delete fail!'});
        }

        res.status(204).json({message: ''});
    }
    catch(e){
        res.status(500).json({message: `${e}`});
    }
});

app.listen(PORT, () =>{
    console.log(`Server runs on ${PORT}`)
});