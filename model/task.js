var db = require("../connection");

var Task = {
    getAllTask:function (callback) {
        return db.query("SELECT * FROM task", callback);
    },
    getTaskById:function (id, callback) {
        return db.query("select * from task where Id=?", [id], callback);
    },
    addTask:function (Task, callback) {
        // return db.query("SELECT * FROM task", callback);
        return db.query("insert into task values (?,?,?)", [Task.Id, Task.Title, Task.Status], callback);
    },
    deleteTask:function (id, callback) {
        return db.query("delete from task where Id=?", [id], callback);
    },
    updateTask:function (id, Task, callback) {
        return db.query("update task set Title=?, Status=? where Id=?", [Task.Title, Task.Status, id], callback);
    }
};

module.exports=Task;