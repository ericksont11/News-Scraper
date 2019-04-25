
$(document).ready(function(){

  let splitterArray = []
  let counter = 0

  $('.modal').modal();
  $("#next").hide()
  $("#previous").hide()
  $("#next2").hide()
  $("#previous2").hide()


  $(document).on("click", ".delete-comment", function() {
    let title = []
    const button = $(this).attr("data-id")
    const noteId =  $(this).attr("data-idnum")
    $("#"+button).remove()
    $(".collection-item").each(function() {
      let string = ($(this).text()).substring(16)
      string = string.substring(0, string.length-1)
      console.log(string)
      title.push(string)
    });
    title = title.join("|")
    console.log(title)


    $.ajax({
      url: '/update/'+noteId,
      type: 'PUT',
      data: {
        title,
      }
      }).then(data=>{

      })
})

  $("#btn").click(function() {
    $("#next").show()
    $("#previous").show()
    $(".loading-screen").hide()
    $.getJSON("/npr", data => {
      console.log(data.length)
      console.log(data.length-10)
      for (let i = (data.length-1); i > (data.length-11); i--) {
        $("#articles").append("<div class='col l6 articles' id="+data[i]._id+"><div class='card'><h5 class='header card-header' id="+data[i]._id+">"
        +data[i].title+"</h5><div class='card-image'><img src="
        +data[i].img+" class='caption-image'></div><div class='card-stacked'><div class='card-content'><p>"
        +data[i].teaser+"</p></div><div class='card-action'><a href="+data[i].link+">"
        +data[i].link+"<a class='waves-effect waves-light btn modal-trigger comments' id="+data[i]._id+" href='#modal1'>View Comments</a></a></div></div></div></div>");
      }
    });

  })

  $(".npr-tab").click(function() {
    $("#articles").empty()
    counter = 0
    $("#next").show()
    $("#previous").show()
    $("#next2").hide()
    $("#previous2").hide()
    $(".loading-screen").hide()
    $.getJSON("/npr", data => {
      for (let i = (data.length-1); i > (data.length-11); i--) {
        $("#articles").append("<div class='col l6 articles' id="+data[i]._id+"><div class='card'><h5 class='header card-header' id="+data[i]._id+">"
        +data[i].title+"</h5><div class='card-image'><img src="
        +data[i].img+" class='caption-image'></div><div class='card-stacked'><div class='card-content'><p>"
        +data[i].teaser+"</p></div><div class='card-action'><a href="+data[i].link+">"
        +data[i].link+"<a class='waves-effect waves-light btn modal-trigger comments' id="+data[i]._id+" href='#modal1'>View Comments</a></a></div></div></div></div>");
      }
    });
  })

  $("#btn2").click(function() {
    $("#next2").show()
    $("#previous2").show()
    $(".loading-screen").hide()
    $.getJSON("/undefeated", data => {
      for (let i = (data.length-1); i > (data.length-11); i--) {
        $("#articles").append("<div class='col l6 articles' id="+data[i]._id+"><div class='card undefeated-card'><h5 class='undefeated-header header card-header' id="+data[i]._id+">"
        +data[i].title+"</h5><div class='card-image'><img src="
        +data[i].img+" class='caption-image'></div><div class='card-stacked'><div class='card-content'><p>"
        +data[i].teaser+"</p></div><div class='card-action'><a href="+data[i].link+">"
        +data[i].link+"<a class='waves-effect waves-light btn modal-trigger comments' id="+data[i]._id+" href='#modal1'>View Comments</a></a></div></div></div></div>");
      }
    });
  })

  $(".undefeated-tab").click(function() {
    $("#articles").empty()
    counter = 0
    $("#next2").show()
    $("#previous2").show()
    $("#next").hide()
    $("#previous").hide()
    $(".loading-screen").hide()
    $.getJSON("/undefeated", data => {
      console.log(data.length)
      console.log(data.length-10)
      for (let i = (data.length-1); i > (data.length-11); i--) {
        $("#articles").append("<div class='col l6 articles' id="+data[i]._id+"><div class='card undefeated-card'><h5 class='header undefeated-header card-header' id="+data[i]._id+">"
        +data[i].title+"</h5><div class='card-image'><img src="
        +data[i].img+" class='caption-image'></div><div class='card-stacked'><div class='card-content'><p>"
        +data[i].teaser+"</p></div><div class='card-action'><a href="+data[i].link+">"
        +data[i].link+"<a class='waves-effect waves-light btn modal-trigger comments' id="+data[i]._id+" href='#modal1'>View Comments</a></a></div></div></div></div>");
      }
    });
  })

  $("#next").click(function() {
    $("#articles").empty()
    $.getJSON("/npr", data => {
      if (counter < data.length-10) {
        counter = counter + 10
        for (let i = (data.length-1-counter); i > (data.length-11-counter); i--) {
          $("#articles").append("<div class='col l6 articles' id="+data[i]._id+"><div class='card'><h5 class='header card-header' id="+data[i]._id+">"
          +data[i].title+"</h5><div class='card-image'><img src="
          +data[i].img+" class='caption-image'></div><div class='card-stacked'><div class='card-content'><p>"
          +data[i].teaser+"</p></div><div class='card-action'><a href="+data[i].link+">"
          +data[i].link+"<a class='waves-effect waves-light btn modal-trigger comments' id="+data[i]._id+" href='#modal1'>View Comments</a></a></div></div></div></div>");
        }
      } else  {
        for (let i = (data.length-1-counter); i > (data.length-11-counter); i--) {
          $("#articles").append("<div class='col l6 m8 s10 offset-m2 offset-s1 articles' id="+data[i]._id+
          "><div class='card'><h5 class='header card-header' id="+data[i]._id+">"
          +data[i].title+"</h5><div class='card-image'><img src="
          +data[i].img+" class='caption-image'></div><div class='card-stacked'><div class='card-content'><p>"
          +data[i].teaser+"</p></div><div class='card-action'><a href="+data[i].link+">"
          +data[i].link+"<a class='waves-effect waves-light btn modal-trigger comments' id="+data[i]._id+" href='#modal1'>View Comments</a></a></div></div></div></div>");
        }
      }
    });
  })

  $("#next2").click(function() {
    $("#articles").empty()
    $.getJSON("/undefeated", data => {
      if (counter < data.length-10) {
        counter = counter + 10
        for (let i = (data.length-1-counter); i > (data.length-11-counter); i--) {
          $("#articles").append("<div class='col l6 articles' id="+data[i]._id+"><div class='undefeated-card card'><h5 class='undefeated-header header card-header' id="+data[i]._id+">"
          +data[i].title+"</h5><div class='card-image'><img src="
          +data[i].img+" class='caption-image'></div><div class='card-stacked'><div class='card-content'><p>"
          +data[i].teaser+"</p></div><div class='card-action'><a href="+data[i].link+">"
          +data[i].link+"<a class='waves-effect waves-light btn modal-trigger comments' id="+data[i]._id+" href='#modal1'>View Comments</a></a></div></div></div></div>");
        }
      } else  {
        for (let i = (data.length-1-counter); i > (data.length-11-counter); i--) {
          $("#articles").append("<div class='col l6 m8 s10 offset-m2 offset-s1 articles' id="+data[i]._id+
          "><div class='undefeated-card card'><h5 class='undefeated-header header card-header' id="+data[i]._id+">"
          +data[i].title+"</h5><div class='card-image'><img src="
          +data[i].img+" class='caption-image'></div><div class='card-stacked'><div class='card-content'><p>"
          +data[i].teaser+"</p></div><div class='card-action'><a href="+data[i].link+">"
          +data[i].link+"<a class='waves-effect waves-light btn modal-trigger comments' id="+data[i]._id+" href='#modal1'>View Comments</a></a></div></div></div></div>");
        }
      }
    });
  })

  $("#previous").click(function() {
    $("#articles").empty()
    $.getJSON("/npr", data => {
      console.log(counter)
      if (counter > 0) {
          counter = counter - 10
        for (let i = (data.length-1-counter); i > (data.length-11-counter); i--) {
          $("#articles").append("<div class='col l6 m8 s10 offset-m2 offset-s1 articles' id="+data[i]._id+
          "><div class='card'><h5 class='header card-header' id="+data[i]._id+">"
          +data[i].title+"</h5><div class='card-image'><img src="
          +data[i].img+" class='caption-image'></div><div class='card-stacked'><div class='card-content'><p>"
          +data[i].teaser+"</p></div><div class='card-action'><a href="+data[i].link+">"
          +data[i].link+"<a class='waves-effect waves-light btn modal-trigger comments' id="+data[i]._id+" href='#modal1'>View Comments</a></a></div></div></div></div>");
        }
      } else if (counter === 0) {
        for (let i = (data.length-1-counter); i > (data.length-11-counter); i--) {
          $("#articles").append("<div class='col l6 m8 s10 offset-m2 offset-s1 articles' id="+data[i]._id+
          "><div class='card'><h5 class='header card-header' id="+data[i]._id+">"
          +data[i].title+"</h5><div class='card-image'><img src="
          +data[i].img+" class='caption-image'></div><div class='card-stacked'><div class='card-content'><p>"
          +data[i].teaser+"</p></div><div class='card-action'><a href="+data[i].link+">"
          +data[i].link+"<a class='waves-effect waves-light btn modal-trigger comments' id="+data[i]._id+" href='#modal1'>View Comments</a></a></div></div></div></div>");
        }
      }
    });
  })

  $("#previous2").click(function() {
    $("#articles").empty()
    $.getJSON("/undefeated", data => {
      console.log(counter)
      if (counter > 0) {
          counter = counter - 10
        for (let i = (data.length-1-counter); i > (data.length-11-counter); i--) {
          $("#articles").append("<div class='col l6 m8 s10 offset-m2 offset-s1 articles' id="+data[i]._id+
          "><div class='undefeated-card card'><h5 class='undefeated-header header card-header' id="+data[i]._id+">"
          +data[i].title+"</h5><div class='card-image'><img src="
          +data[i].img+" class='caption-image'></div><div class='card-stacked'><div class='card-content'><p>"
          +data[i].teaser+"</p></div><div class='card-action'><a href="+data[i].link+">"
          +data[i].link+"<a class='waves-effect waves-light btn modal-trigger comments' id="+data[i]._id+" href='#modal1'>View Comments</a></a></div></div></div></div>");
        }
      } else if (counter === 0) {
        for (let i = (data.length-1-counter); i > (data.length-11-counter); i--) {
          $("#articles").append("<div class='col l6 m8 s10 offset-m2 offset-s1 articles' id="+data[i]._id+
          "><div class='undefeated-card card'><h5 class='undefeated-header header card-header' id="+data[i]._id+">"
          +data[i].title+"</h5><div class='card-image'><img src="
          +data[i].img+" class='caption-image'></div><div class='card-stacked'><div class='card-content'><p>"
          +data[i].teaser+"</p></div><div class='card-action'><a href="+data[i].link+">"
          +data[i].link+"<a class='waves-effect waves-light btn modal-trigger comments' id="+data[i]._id+" href='#modal1'>View Comments</a></a></div></div></div></div>");
        }
      }
    });
  })

  $(document).on("click", ".modal-trigger", function() {
    $("#notes").empty();
    splitterArray = []
    const thisId = $(this).attr("id");

    $.ajax({
      method: "GET",
      url: "/articles/" + thisId
    })
      .then(data => {
        $("#notes").append("<input id='titleinput' name='title' placeholder='Type your comments here!'>");
        $("#notes").append("<h6 id='notetitle'></h6>");
        $("#notes").append("<a class='waves-effect waves-light btn' id='savenote' data-id="+thisId+">Leave a comment</a>");
  
        if (data.note) {
          $("#savenote").attr("data-note", data.note._id)
          splitter = (data.note.title).split("|")
          for (i=0; i < (splitter.length); i++){
              $("#notetitle").prepend("<li class='collection-item' id='link"+i
              +"'> User commented: "+splitter[i]+"<button data-id='link"+i
              +"' class='delete-comment' data-article="+data._id+" data-num='"+i+"' data-idnum='"+data.note._id+"'>X</button></li>");
              splitterArray.push(splitter[i])
          }
        }
      });

  });

  $(document).on("click", "#savenote", function() {
    const thisId = $(this).attr("data-id");
    const noteId = $(this).attr("data-note");
    if ($("#titleinput").val() !== "") {
      if (splitterArray.length >= 1) {
        var title = splitterArray.join("|") + "|" + $("#titleinput").val().trim()
      }
      else {
        var title = $("#titleinput").val().trim()
      }
      $.ajax({
        url: '/delete/'+noteId,
        type: 'post',
        }).then(data=>{


        
      $.ajax({
        method: "POST",
        url: "/articles/" + thisId,
        data: {
          title,
        }
      })

        .then(() => {
          $("#notes").empty();
          splitterArray=[]
          $.ajax({
            method: "GET",
            url: "/articles/" + thisId
          })
            .then(data => {

              $("#notes").append("<input id='titleinput' name='title' placeholder='Type your comment here!'>");
              $("#notes").append("<h6 id='notetitle'></h6>");
              $("#notes").append("<a class='waves-effect waves-light btn' id='savenote' data-note="+data.note._id+" data-id="+data._id+">Leave a comment</a>");
        
              if (data.note) {
                splitter= (data.note.title).split("|")
                for (i=0; i < splitter.length; i++){
                  $("#notetitle").prepend("<li class='collection-item' id='link"+i
                  +"'>User commented: "+splitter[i]+"<button data-id='link"+i
                  +"' class='delete-comment' data-article="+data._id+" data-num='"+i+"' data-idnum='"+data.note._id+"'>X</button></li>");
                  splitterArray.push(splitter[i])
                }
              }
            });
        });
      })
      $("#titleinput").val("");
      $("#bodyinput").val("");
    }
  });

})