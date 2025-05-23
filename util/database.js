import Database from "better-sqlite3";

const db = new Database('./data/database.sqlite');

db.prepare(`CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY AUTOINCREMENT, title STRING, content STRING)`).run();

export const getAllNotes = () => db.prepare(`SELECT * FROM notes`).all();
export const getNote = (id) => db.prepare(`SELECT * FROM notes WHERE id = ?`).get(id);
export const saveNote = (title,content) => db.prepare(`INSERT INTO notes (title, content) values (?,?)`).run(title,content);
export const deleteNote = (id) => db.prepare(`DELETE FROM notes WHERE id = ?`).run(id);

const notes = [
    {title: 'elso', content: 'egy'},
    {title: 'masodik', content: 'ketto'},
    {title: 'harmadik', content: 'harom'},
    {title: 'negyedik', content: 'negy'},
];

//for(const note of notes){
//   saveNote(note.title, note.content);
//}