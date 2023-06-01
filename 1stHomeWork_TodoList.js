function createInputItem() {
    var todo_item = document.createElement("div");
    todo_item.className = "input-group mb-1 todo_item";

    var group_text1 = document.createElement("span");
    group_text1.className = "input-group-text";
    group_text1.innerHTML = "-";

    var form_control = document.createElement("input");
    form_control.className = "form-control";
    form_control.setAttribute("oninput", "checkInput(this)");
    console.log(form_control.oninput);
    form_control.dataset.activeFunction = "true";

    var group_text2 = document.createElement("span");
    group_text2.className = "input-group-text";

    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "btn btn-sm";

    var img = document.createElement("img");
    img.src = "file-text.svg";

    btn.appendChild(img);
    group_text2.appendChild(btn);
    todo_item.appendChild(group_text1);
    todo_item.appendChild(form_control);
    todo_item.appendChild(group_text2);

    return todo_item;
}

function createTodoCard(todoObject){
    var cardContainer = document.createElement('div');
    cardContainer.className = 'card mt-2';
    var cardTitle = document.createElement('h5');
    cardTitle.className = 'card-header';
    cardTitle.innerHTML = todoObject.title;
    var cardBody = document.createElement('div');
    cardBody.className = 'card-body';
    
    for(var todoText_index = 0; todoText_index < todoObject.Items.length; todoText_index++){
        var todoLi = document.createElement('li');
        todoLi.innerHTML = todoObject.Items[todoText_index];
        cardBody.appendChild(todoLi);
    }

    cardContainer.appendChild(cardTitle);
    cardContainer.appendChild(cardBody);

    return cardContainer;
}

function checkInput(inputEl) {
    var todo_item = document.getElementsByClassName("input-group mb-1 todo_item");

    if (inputEl.value && inputEl.dataset.activeFunction == "true") {
        var container = document.getElementById("todo_item_container");
        if (todo_item.length == 1) {
            container.appendChild(createInputItem());
        } else if (todo_item.length > 1 && !inputEl.parentElement.nextElementSibling) {
            container.appendChild(createInputItem());
        }
        inputEl.dataset.activeFunction = "false";
    } else if (inputEl.value == "" && inputEl.parentElement.nextElementSibling.getElementsByClassName('form-control')[0].value == "") {
        inputEl.parentElement.nextElementSibling.remove();
        inputEl.dataset.activeFunction = "true";
        var previous_input = inputEl.parentElement.previousElementSibling.getElementsByClassName('form-control')[0]
        if (todo_item.length > 2 && previous_input.value == ""){
            inputEl.parentElement.remove();
            previous_input.dataset.activeFunction = 'true';
        }
    }
}

function save_todo(){
    var todoTitle = document.getElementById('todo_title').value;
    var todoContentObject = new Object();
    todoContentObject.title = todoTitle;
    var todoContentsList = new Array();
    var todoContentsItem = document.getElementsByClassName('form-control');
    
    for (var index = 1;index < todoContentsItem.length;index++){
        var todo_value = todoContentsItem[index].value;
        if (todo_value){
            todoContentsList.push(todo_value);
        }
    }
    todoContentObject.Items = todoContentsList;

    console.log(todoContentObject);
    var localTodo = localStorage.getItem("todo");
    if (!localTodo) {
        var localTodo = []
        localTodo.push(todoContentObject);
        localStorage.setItem('todo', JSON.stringify(localTodo));
        
    } else {
        var localTodo = JSON.parse(localStorage.getItem('todo'));
        localTodo.push(todoContentObject);
        localStorage.setItem('todo', JSON.stringify(localTodo));
    }

    document.getElementById('todo_content').appendChild(createTodoCard(todoContentObject));

    document.getElementById('todo_title').value = "";
    var form_controls = document.getElementsByClassName('form-control');
    form_controls[1].value = "";
    form_controls[1].dataset.activeFunction = "true";
    while(form_controls.length > 2){
        form_controls[form_controls.length-1].parentElement.remove();
    }
}


var localstorage_todo = JSON.parse(localStorage.getItem('todo'));
for (var todo_index = 0; todo_index < localstorage_todo.length; todo_index++){
    var todo_item = localstorage_todo[todo_index];
    document.getElementById('todo_content').appendChild(createTodoCard(todo_item));
}