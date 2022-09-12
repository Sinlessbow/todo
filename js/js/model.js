export default class Model {
    constructor(){
        this.controller = null;
        this.todos = JSON.parse(localStorage.getItem('todos'));
        if(!this.todos || this.todos.length < 1){
            this.todos = [];
            this.currentId = 1;
        }else{
            this.currentId = this.todos[this.todos.length - 1].id + 1;
        }
    }

    setController(controller){
        this.controller = controller;
    }

    getTodos(){
        return this.todos.map((todo)=> ({...todo}));
    }

    findTodo(id){
        return this.todos.findIndex( (todo) => todo.id === id  );
    }

    saveTodo(title, description){
        const todo = {
            id: this.currentId++,
            title,
            description,
            completed: false,
        };

        this.todos.push(todo);
        this.save();
        return { ...todo }
    }

    saveEdit(id, title, description, completed){
        
        const todoEdit = {
            id,
            title,
            description,
            completed,
        };

        console.log(todoEdit);

        const index = this.findTodo(id);
        this.todos[index] = todoEdit;
        this.save();
        this.controller.clearForm();
        this.controller.updateRow(todoEdit);
    }

    removeTodo(id){
        const index = this.findTodo(id);
        this.todos.splice(index, 1);
        this.save();
    }

    toogleCompleted(id){
        const index = this.findTodo(id);
        const todo = this.todos[index];
        todo.completed = !todo.completed;
        this.save();
    }

    save(){
        localStorage.setItem('todos', JSON.stringify(this.todos))
    }


}