var todos = [];
    // timer script
$(function(){
    var itemCheck = localStorage.getItem("todoItem");
    // console.log(itemCheck);
    if (itemCheck !== null){
        var _storage = JSON.parse(localStorage.getItem("todoItem"));
        loadData(_storage);
        todos = _storage;
        // $("#landingBtn").addClass("d-none");
        // $("#inputBtn, #startBtn").removeClass("d-none");
    };
    $("#inputBtn").click(function(){
        // checkForm();
        if (checkForm() !== false){
        todoInput(toLocal);
        }
    });
    // $("#landingBtn").click(function(){
    //     checkForm();
    //     todoInput(toLocal);
    //     $("#landingBtn").addClass("d-none");
    //     $("#inputBtn, #startBtn").removeClass("d-none");
    //     $(".quote").addClass("d-none");
    //     var todos = loadCurrentData();
    //     var todo1st = Number(todos[0].time);
    //     listOutput(todos);
    //     clock(todo1st);
    // })
    $(".option_btn").click(function(){
        if ($(".manipulation").hasClass("effect_on")){
            $(".todo_list, .theme_btn").fadeOut();
            $(".manipulation").removeClass("effect_on")
        } else {
            $(".todo_list, .theme_btn").fadeIn();
            $(".manipulation").addClass("effect_on")
        }
    })
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
// 할일과 시간의 입력창이 비어있을 경우 경고 호출
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
    // console.log(_todo);
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
// 입력한 할일과 시간을 works to do 에 입력(갱신)
function updateList(data){
    var htmlString = '';
    $.each(data, function (index, todo){
        // console.log(todo, index);
        htmlString +=
        `<li>
            <ul class="added_works list${index}">
                <li>
                    <ul class="setlist">
                        <li>${todo.title}</li>
                        <li>${todo.time}</li>
                    </ul>
                </li>
                <li>
                    <button class="delete-bt">
                        <span class="material-icons md-24">delete</span>
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
        $(".quote").addClass("d_none");
        clock(todo1st);
        // console.log(todo1st);
        listOutput(todos);
        return todos;
    });
   
});
function loadCurrentData(){
    var _storage = JSON.parse(localStorage.getItem("todoItem"));
    return _storage;
}
function listOutput(todos){
    var todoTitle = todos[0].title
    var todoTime = todos[0].time
    var titleAndTime = ''
    titleAndTime += 
        `<ul>
            <li>${todoTitle}</li>
            <li>${todoTime}</li>
        </ul>`;
    $(".list-output").html(titleAndTime);
    // console.log(titleAndTime);
    return todoTitle;
}
function clock(todo1st){
    // console.log(_storage);
    $("#example-timer").circletimer({
        // 타이머 완료 후 (원이 완전히 없어졌을 때) 작동하는 것
        onComplete: function() {
            var currentTodo = JSON.parse(localStorage.getItem("todoItem"));
            currentTodo.shift();
            localStorage.setItem("todoItem", JSON.stringify(currentTodo));
            console.log(currentTodo);
            if (currentTodo.length !== 0){
                listOutput(currentTodo);
                updateList(currentTodo);
                $("#startBtn").click();
            } else {
                // alert("끝")
                $("#example-timer").html(
                    `<div id="ct-circle-container">
                        <svg>
                            <circle r="25%" cx="50%" cy="50%" stroke-dasharray="158%" style="stroke-dashoffset: 0%;"></circle>
                        </svg>
                    </div>`
                )
                $(".list-output").html(
                    `<ul>
                        <li>ALL CLEAR</li>
                        <li>*</li>
                    </ul>`
                )
                $(".option_btn").click();
            }
        },
        // 남은 원의 면적을 측정하여 남은 시간을 표시
        onUpdate: function(elapsed) {
            $("#time-elapsed").html(Math.round(elapsed));
        },
        timeout: 60000 * todo1st
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