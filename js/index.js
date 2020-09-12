$(document).ready(function () {
    $("#searchme").click(function () {
        $("#filmsList").html("<ul></ul>");
        var query = $("#query").val();
        if (query == "") {
            $(".error").css("display", "block");
            setTimeout(function () {
                $(".error").fadeOut(1000);
            }, 1000);
        } else {
            $("#query").val("");
            $.ajax({
                url: "https://api.themoviedb.org/3/search/movie/",
                type: "GET",
                dataType: "JSON",
                data: {
                    api_key: "f7598fda063f671ed1a42ea9387b6526",
                    language: "en-US",
                    query: query,
                    include_adult: false,
                },
                success: function (resposta) {
                    if (resposta.total_results == 0) {
                        $("#noresults").css("display", "block");
                    } else {
                        $("#noresults").css("display", "none");
                        var count = 0;
                        var img;
                        var imgref;
                        var id;
                        var title;
                        var filmes = resposta;
                        var resultados = filmes["results"];
                        for (let i = 0; i < resultados.length; i++) {
                            $("#filmsList").css("display", "block");
                            $(".container").css("display", "block");
                            $('<li class="list-inline-item" id="' + i + '"></li>').appendTo("ul");
                            img = resultados[i].poster_path;
                            id = resultados[i].id;
                            title = resultados[i].title
                            console.log(resultados[i]);
                            imgref = "http://image.tmdb.org/t/p/w185" + img;
                            href = "detail.html?movie=" + id;
                            if (img != null) {
                                $('<div class="poster"><a href="' + href + '"><img id="' + id + '" src="' + imgref + '"/></a><div class="text-descr"><p>"' + title + '"</p></div></div>').appendTo("li[id$='" + count + "']");
                                count = count + 1;
                            }
                        }
                    }
                },
                error: function (erro) {
                }
            });
        }
    });
});


/*document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("searchme").addEventListener("click", () => {
        document.getElementById("filmsList").innerHTML = "<ul></ul>";
        let query = document.getElementById("query").value;
        if(query === "" || query === null){
            document.querySelector(".error").style.display = "block";
            setTimeout(function () {
                document.querySelector(".error").style.display = "none";
            }, 2000);
        }else{
            document.getElementById("query").value = "";
        }
    });
});*/