$(function(){

    // timer script

    // 타이머 시작 버튼을 누르기 전까진 타이머 관련 함수는 동작하면 안 됨
    $("#inputBtn").click(function(){
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
            alert("숫자만 입력해주세요");
        };
    });
    // timer script end

});