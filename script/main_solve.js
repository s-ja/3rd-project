// 할 일 배열 생성
var todos = [];
$(function(){
    // 로컬스토리지에서 "todoItem"을 가져옴
    var itemCheck = localStorage.getItem("todoItem");
    // 만약 그 todoItem이 비어 있다면
    if (itemCheck !== null){
        // _storage에 로컬스토리지 todoItem을 배열로 가져옴
        var _storage = JSON.parse(localStorage.getItem("todoItem"));
            // 배열을 loadData()로 보냄
            // loadData(): 배열을 updateList()로 보내는 함수
            // updateList(): 배열에 있는 title과 time을 html에 출력하는 함수
        // = 로컬스토리지에서 가져온 배열을 html에 출력함
        loadData(_storage);
        // 이거 넣으니까 갱신 안 된 배열이 출력되는게 고쳐졌는데 원리는 잘 모르겠습니다
        todos = _storage;
    };
    $("#inputBtn").click(function(){
        // 리스트 추가 버튼을 누르면 checkForm()
        // checkForm(): title와 time에 값이 있는지 없는지를 판별
        // 비어 있지 않을 경우 = 입력이 되어 있을 경우에 todoInput()
        if (checkForm() !== false){
        // todoInput(): 입력된 값을 배열에 저장하고 로컬스토리지로 전송 - 이후 html에 출력하는 loadData()까지 호출하는 함수
        todoInput(toLocal);
        }
    });
    // 옵션 버튼을 눌러서 리스트와 블러를 show/hide
    $(".option_btn").click(function(){
        if ($(".manipulation").hasClass("effect_on")){
            $(".todo_list, .theme_btn").fadeOut();
            $(".manipulation").removeClass("effect_on")
        } else {
            $(".todo_list, .theme_btn").fadeIn();
            $(".manipulation").addClass("effect_on")
        }
    })
    // 삭제 버튼을 누르면...
        // (document).on("click")인 이유: 삭제 버튼이 동적으로 생성되는 (눌러서 만들어지는) 객체이기 때문
    $(document).on("click", ".delete-bt", function(){
        var tg = $(this);
        // STOGARE에 loadCurrentData()의 값을 넣음
            // loadCurrentData(): _storage에 로컬스토리지의 값을 받아온뒤 return시킴
        var STORAGE = loadCurrentData()
        // 누른 delete-bt의 index값을 indexTg에 넣음
        var indexTg = $(".delete-bt").index(tg);
        // STORAGE(= 로컬스토리지에서 받아온 배열)에서 indexTg번째를 하나 잘라냄
        STORAGE.splice(indexTg, 1);
        // 자르고 남은 STORAGE 배열을 로컬스토리지에 다시 넣음
        localStorage.setItem("todoItem", JSON.stringify(STORAGE));
        // 기억 안 남 이것도 오류 고친다고 넣은듯
        todos = STORAGE;
        // STORAGE(indexTg번째가 잘려있는 상태 그대로임)를 html에 출력함
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
    // 입력한 값을 폼에서 지우는 함수
    // 배열이나 로컬스토리지는 그대로이다
    $("#todoText").val(null);
    $("#num").val(null);
    $("#todoText").focus();
};
function todoInput(toLocal){
    // 입력된 값을 배열에 저장하고 로컬스토리지로 전송 - 이후 html에 출력하는 loadData()까지 호출하는 함수
    // _todo에 폼에 입력한 title값과 time값을 배열로 저장함
    var _todo = {title: $("#todoText").val(), time: $("#num").val()};
    // 배열로 저장했으니 입력했던 텍스트와 숫자를 지워줌
    clearInput();
    // todos(=맨 처음 생성했던 배열)에 방금 입력한 title과 time을 맨 마지막 배열에 넣어줌
    todos.push(_todo);
    // 그걸 이제 toLocal로 보내줌
        // toLoca(): 로컬스토리지에 배열을 저장하고 그것을 다시 불러오는 함수
    toLocal(todos, loadData);
    return todos;
};
function toLocal(_todo, loadData){
    localStorage.setItem("todoItem", JSON.stringify(_todo));
    _storage = JSON.parse(localStorage.getItem("todoItem"));
    loadData(_storage);
    // 로컬스토리지에 배열을 저장하고 다시 불러온 뒤 LoadData()로 보내줌
};
function loadData(_storage){
    // loadData(): 배열을 updateList()로 보내는 함수
    var data = _storage;
    updateList(data);
    // updateList(): 배열에 있는 title과 time을 html에 출력하는 함수
    // = 로컬스토리지에서 가져온 배열을 html에 출력함
};
// 입력한 할일과 시간을 works to do 에 입력(갱신)
function updateList(data){
    // 출력할 html을 변수에 넣을때 해당 변수에 아무것도 없다고 먼저 설정해줘야 undefind가 함께 출력되는 오류를 막을 수 있음
    var htmlString = '';
    $.each(data, function (index, todo){
        // 출력할 html의 내용
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
    // added_list에 상단의 html을 출력
    $(".added_list").html(htmlString);
}
$(function(){
    $("#startBtn").click(function(){
        // 재생 버튼을 누르면 todos 배열에 로컬스토리지 값을 가져옴
        var todos = loadCurrentData();
        // todo1st는 방금 가져본 로컬스토리지 값의 0번째 인덱스의 time key의 값
        var todo1st = Number(todos[0].time)
        // 이거는 필요 없는 코드
        $(".quote").addClass("d_none");
        // clock()에 time 그거 집어 넣음
            // clock(): circletimer 함수 작동 시키는 거
        clock(todo1st);
        // listOutput()에 todos 배열 넣음
            //listOutput(): 타이머 그래프 위에 html출력하는 그거
        listOutput(todos);
        return todos;
    });
   
});
function loadCurrentData(){
    // 로컬에 있는거 가져오는 거
    var _storage = JSON.parse(localStorage.getItem("todoItem"));
    return _storage;
}
function listOutput(todos){
    // 가져온 배열에서 0번째 인덱스의 title과 time을 html에 출력하는 함수
    var todoTitle = todos[0].title
    var todoTime = todos[0].time
    var titleAndTime = ''
    titleAndTime += 
        `<ul>
            <li>${todoTitle}</li>
            <li>${todoTime}</li>
        </ul>`;
    $(".list-output").html(titleAndTime);
    // 왜 return 했는지 기억 안 남
    return todoTitle;
}
function clock(todo1st){
    $("#example-timer").circletimer({
        // 타이머 완료 후 (원이 완전히 없어졌을 때) 작동하는 것
        onComplete: function() {
            // 재생이 끝나면 현재 로컬스토리지 값을 currentTodo 배열로 가져옴
            var currentTodo = JSON.parse(localStorage.getItem("todoItem"));
            // 가져온 배열의 맨 첫번째 (0번)를 자름
            currentTodo.shift();
            // 자르고 남은 걸 다시 로컬스토리지에 넣음
            localStorage.setItem("todoItem", JSON.stringify(currentTodo));
            // 걍 콘솔 찍은거
            console.log(currentTodo);
            // 만약 가져온 배열이 비어있지 않다면
            if (currentTodo.length !== 0){
                // 다음 재생할거 타이머 위에 출력
                listOutput(currentTodo);
                // 그리고 리스트 다시 출력
                updateList(currentTodo);
                // 리스트 갱신 했으니까 재생
                $("#startBtn").click();
            } else {
                // 근데 가져온 배열이 비어 있으면 다음 html을 출력
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
                // 왜 옵션 버튼 클릭하게 했는지 기억 안 남
                $(".option_btn").click();
            }
        },
        onUpdate: function(elapsed) {
            $("#time-elapsed").html(Math.round(elapsed));
        },
        // 남은 원의 면적을 측정하여 남은 시간을 표시
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