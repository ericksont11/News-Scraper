
$(document).ready(function(){
$("#btn").click( ()=> {

console.log("yes")
$.getJSON("/articles", data => {

  for (let i = 0; i < data.length; i++) {

    $("#articles").append("<div class='col s12 m7'><h5 class='header'>"
    +data[i].title+"</h5><div class='card horizontal'><div class='card-image'><img src="
    +data[i].img+"></div><div class='card-stacked'><div class='card-content'><p>"
    +data[i].teaser+"</p></div><div class='card-action'><a href="+data[i].link+">"+data[i].link+"</a></div></div></div></div>");
  }
});


})

})