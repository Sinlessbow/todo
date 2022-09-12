import FormTodo from "./components/form-todo.js";

export default class Controller {
    constructor(){
        this.model = null;
        this.table = document.getElementById('table');
        this.formTodo = new FormTodo();
        this.formTodo.onClick( (title, description) => this.addTodo(title,description) );
    }

    setModel(model){
        this.model = model;
    }

    render(){
        const todos = this.model.getTodos();
        todos.forEach(todo => this.createRow(todo));
    }

    toogleCompleted(id){
        this.model.toogleCompleted(id);
    }

    addTodo(title, description){
        const todo = this.model.saveTodo(title, description);
        this.createRow(todo);
        this.clearForm();
    }

    removeTodo(id){
        this.model.removeTodo(id);
        document.getElementById(id).remove();
    }

    editTodo(id){
        const todosList = this.model.getTodos();
        const todoEdit = todosList[this.model.findTodo(id)];
        this.formTodo.title.value = todoEdit.title;
        this.formTodo.description.value = todoEdit.description;
        this.formTodo.btn.innerHTML = 'Edit';
        this.formTodo.btn.onclick = () => this.model.saveEdit(todoEdit.id, this.formTodo.title.value, this.formTodo.description.value, todoEdit.completed);
    }

    clearForm(){
        this.formTodo.title.value = '';
        this.formTodo.description.value = '';
    }

    updateRow(todo){
        const row = document.getElementById(todo.id);
        row.innerHTML = `
            <td>${todo.title}</td>
            <td>${todo.description}</td>
            <td class="text-center"> </td>
            <td class="text-right"> </td>
        `;

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = todo.completed;
        checkbox.onclick = () => this.toogleCompleted(todo.id);
        row.children[2].appendChild(checkbox);

        const editBtn = document.createElement('button');
        editBtn.classList.add('btn', 'btn-success', 'mb-1', 'ml-1');
        editBtn.innerHTML = '<i class="fa fa-pencil-square-o"></i>';
        editBtn.onclick = () => this.editTodo(todo.id);
        row.children[3].appendChild(editBtn);

        const removeBtn = document.createElement('button');
        removeBtn.classList.add('btn', 'btn-danger', 'mb-1', 'ml-1');
        removeBtn.innerHTML = '<i class="fa fa-trash"></i>';
        removeBtn.onclick = () => this.removeTodo(todo.id);
        row.children[3].appendChild(removeBtn);


        this.formTodo.btn.innerHTML = 'Add';
    }

    createRow(todo){
        const row = table.insertRow();
        row.setAttribute('id', todo.id);
        row.innerHTML = `
            <td> ${todo.title} </td>
            <td> ${todo.description} </td>
            <td class="text-center"> </td>
            <td class="text-right"> </td>
        `;

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = todo.completed;
        checkbox.onclick = () => this.toogleCompleted(todo.id);
        row.children[2].appendChild(checkbox);

        const editBtn = document.createElement('button');
        editBtn.classList.add('btn', 'btn-info', 'mb-1', 'ml-1');
        editBtn.innerHTML = '<i class="fa fa-pencil-square-o"></i>';
        editBtn.onclick = () => this.editTodo(todo.id);
        row.children[3].appendChild(editBtn);

        const removeBtn = document.createElement('button');
        removeBtn.classList.add('btn', 'btn-danger', 'mb-1', 'ml-1');
        removeBtn.innerHTML = '<i class="fa fa-trash"></i>';
        removeBtn.onclick = () => this.removeTodo(todo.id);
        row.children[3].appendChild(removeBtn);

        

        
    }
}