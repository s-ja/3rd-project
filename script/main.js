var todos = [];
    // timer script
$(function(){
    var itemCheck = localStorage.getItem("todoItem");
    if (itemCheck == null){
        localStorage.setItem("todoItem", []);
    } else {
        var _storage = JSON.parse(localStorage.getItem("todoItem"));
        loadData(_storage);
        todos = _storage;
    };
    $("#inputBtn").click(function(){
        todoInput(toLocal);
    });

    $(document).on("click", ".delete-bt", function(){
        var tg = $(this);
        var STORAGE = loadCurrentData()
        var indexTg = $(".delete-bt").index(tg);
        STORAGE.splice(indexTg, 1);
        // localStorage.clear();
        localStorage.setItem("todoItem", JSON.stringify(STORAGE));
        todos = STORAGE;
        updateList(STORAGE);
    });
});
function checkForm(){
    if($("#todoText").val() === "") {
        alert("할일을 입력하세요");
        $("#todoText").focus();
        return false;
    }
    if($("#num").val() === "") {
        alert("시간을 입력하세요");
        $("#num").focus();
        return false;
    }
}
function clearInput(){
    $("#todoText").val(null);
    $("#num").val(null);
    $("#todoText").focus();
};
function todoInput(toLocal){
    var _todo = {title: $("#todoText").val(), time: $("#num").val()};
    clearInput();
    todos.push(_todo);
    toLocal(todos, loadData);
    return todos;
};
function toLocal(_todo, loadData){
    localStorage.setItem("todoItem", JSON.stringify(_todo));
    _storage = JSON.parse(localStorage.getItem("todoItem"));
    loadData(_storage);
};
function loadData(_storage){
    var data = _storage;
    // console.log(data);
    updateList(data);
};
function updateList(data){
    var htmlString = '';
    $.each(data, function (index, todo){
        // console.log(todo, index);
        htmlString +=
        `<li>
            <ul class="added_works list${index}">
                <li>
                    <i class="fa-solid fa-bars"></i>
                </li>
                <li>
                    <ul class="setlist">
                        <li>${todo.title}</li>
                        <li>${todo.time}</li>
                    </ul>
                </li>
                <li>
                    <button class="edit-bt">
                        <span class="material-icons">border_color</span>
                    </button>
                </li>
                <li>
                    <button class="delete-bt">
                        <span class="material-icons">delete</span>
                    </button>
                </li>
            </ul>
        </li>`;
    });
    $(".added_list").html(htmlString);
}
$(function(){
    $("#startBtn").click(function(){
        var todos = loadCurrentData();
        var todo1st = Number(todos[0].time)
        clock(todo1st);
    });
   
});
function loadCurrentData(){
    var _storage = JSON.parse(localStorage.getItem("todoItem"));
    return _storage;
}
function clock(_storage){
    console.log(_storage);

    $("#example-timer").circletimer({
        // 타이머 완료 후 작동하는 것
        onComplete: function() {
            alert("Time is up!");
        },
        // 타이머를 작동시키는 것?
        onUpdate: function(elapsed) {
            $("#time-elapsed").html(Math.round(elapsed));
        },
        timeout: 60000 * _storage
    });

    // 시작 버튼
    $("#example-timer").circletimer("start");

    $("#start").on("click", function() {
        $("#example-timer").circletimer("start");
    });

    // 일시정지 버튼
    $("#pause").on("click", function() {
        $("#example-timer").circletimer("pause");
    });

    // 멈춤 버튼
    $("#stop").on("click", function() {
        $("#example-timer").circletimer("stop");
    });

    $("#add").on("click", function() {
        $("#example-timer").circletimer("add", 1000);
    });
};
// timer script end
