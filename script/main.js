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

    // Works to do 목록에서 할일과 시간 삭제하는 기능
    console.log($(".delete-bt").length);
    $(".delete-bt").on({
        click: function(e){
            console.dir(e);
            var tg = $(this);
            var STORAGE = loadCurrentData()
            var indexTg = $(".delete-bt").index(tg);
            STORAGE.splice(indexTg, 1);
            // localStorage.clear();
            localStorage.setItem("todoItem", JSON.stringify(STORAGE));
            todos = STORAGE;
            updateList(STORAGE);
        }
    })

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
        clock();
    });
   
});
function loadCurrentData(){
    var _storage = JSON.parse(localStorage.getItem("todoItem"));
    return _storage;
}
// 타이머 시작 버튼을 누르기 전까진 타이머 관련 함수는 동작하면 안 됨
function clock(_storage){
    // 입력한 시간을 inputVal에 저장
    var inputVal = $(_storage[0].time).val();
    $("#example-timer").circletimer({
        // 타이머 완료 후 (원이 완전히 없어졌을 때) 작동하는 것
        onComplete: function() {
            alert("Time is up!");
        },
        // 남은 원의 면적을 측정하여 남은 시간을 표시
        onUpdate: function(elapsed) {
            $("#time-elapsed").html(Math.round(elapsed));
        },
        timeout: 60000 * inputVal
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
