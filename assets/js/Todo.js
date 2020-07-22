const URL = "http://localhost:3000/todos",
done = {
    color : "gray",
    textDecoration : "line-through"
},
normal = {
    color : "black",
    textDecoration:"none"
};

//handlin done styling

$("ul").on("click","li ",function(event){
    $(this).toggleClass("done");
    var done = $(this).attr("class").includes("done");
    var todo = $(this).text();
    save(todo,done,false);
});

//handling delete button

$("ul").on("click","li .delete",function(event){
    event.stopPropagation();
    var done = $(this).parent().attr("class").includes("done");
    var todo = $(this).parent().text();
    $(this).parent().fadeOut(500,function(){
        $(this).remove();
        Delete(todo,done);
    })

});

//adding new Todos

$("#input-field").on("keypress",function(event){
    if(event.which===13){
        var Li = "<li class=\"element\"><span class=\"delete\"><i class=\"fas fa-trash\"></i></span> <span class=\"todo\">" + $(this).val() + "</span></li>";
        $("ul").append(Li);
        save($(this).val(),false);
        $(this).val("");
    }
});

//Toggle :

$(".fa-edit").on("click",function(){
    console.log("clicked");
    $("input").slideToggle(200);

});


//connecting to server side


function loadData(){
    $.ajax({
        type: "GET",
        url: "http://localhost:3000/todos",
    }).done((data,textStatus)=>{
        var Li = "";
        data.forEach(e => {
            if(e.done){
                Li += "<li class=\"element done\"><span class=\"delete\"><i class=\"fas fa-trash\"></i></span> <span class=\"todo\">" + e.todo + "</span></li>";
            }else{
                Li += "<li class=\"element\"><span class=\"delete\"><i class=\"fas fa-trash\"></i></span> <span class=\"todo\">" + e.todo + "</span></li>";
            }
            
        }); 
        $("ul").append(Li);
    });
}
loadData();


//Saving data


function save(value, done){
    var todo = {
        todo : value.trim(),
        done : done,
        deleted : false
    };  
    $.ajax({
        type: 'POST',
        url: URL,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        data:todo,
        dataType: 'json',
    }).done((response)=>{
        console.log(response);
    })
};

//deleting


function Delete(value,done){
    var todo = {
        todo : value.trim(),
        done : done,
        deleted : false
    };  
    $.ajax({
        type: 'DELETE',
        url: URL,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        data:todo,
        dataType: 'json',
    }).done((response)=>{
        console.log(response);
    })
};