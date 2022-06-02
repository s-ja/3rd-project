var todos = [];
$(function(){
    // timer script
    function checkForm(){
        if($("#todoText").val() === "") {
            alert("할일을 입력하세요");
            $("#todoText").focus();
            return false;
        }
        if($("#todoTime").val() === "") {
            alert("시간을 입력하세요");
            $("#todoTime").focus();
            return false;
        }
    }
    function clearInput(){
        $("#todoText").val(null);
        $("#todoTime").val(null);
        $("#todoText").focus();
    }
    function todoInput(toLocal){
        var _todo = {title: $("#todoText").val(), time: $("#todoTime").val()};
        clearInput();
        todos.push(_todo);
        toLocal(todos, loadData);
    }
    function toLocal(_todo, loadData){
        localStorage.setItem("todoItem", JSON.stringify(_todo));
        var _storage = JSON.parse(localStorage.getItem("todoItem"));
        loadData(_storage);
    }
    function loadData(_storage){
        var data = _storage;
        data.forEach(function(todo, index){
            console.log(todo.title, todo.time, index)
            var htmlString;
            // $("#lists").html("")
            for(var i=0; i<=index; i++){
                htmlString += `<li>${todo.title} <span>${todo.time}</span></li>`
            }
            $("#lists").html(htmlString)
        })
    }
    // 타이머 시작 버튼을 누르기 전까진 타이머 관련 함수는 동작하면 안 됨
    $("#inputBtn").click(function(){
        // 할일과 시간을 읽어온다
       todoInput(toLocal);
        // 입력한 시간을 inputVal에 저장
        var inputVal = $("#num").val();

        // 타이머에 입력된 것(=inputVal)이 숫자인지 확인 
        if(jQuery.isNumeric(inputVal)){
            // 숫자가 맞으면 타이머를 작동
            $("#example-timer").circletimer({
                // 타이머 완료 후 작동하는 것
                onComplete: function() {
                    alert("Time is up!");
                },
                // 타이머를 작동시키는 것?
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
        } else {
            checkForm();
        };
    });
    // timer script end

});