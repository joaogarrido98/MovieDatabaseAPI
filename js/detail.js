$(document).ready(function () {
    var url_string = window.location.href;
    var url = new URL(url_string);
    var movieId = url.searchParams.get("movie");
    enlarge();

    $.ajax({
        url: "https://api.themoviedb.org/3/movie/" + movieId,
        type: "GET",
        dataType: "JSON",
        data: {
            api_key: "f7598fda063f671ed1a42ea9387b6526",
            language: "en-US",
        },
        success: function (resposta) {
            var img = resposta["poster_path"];
            var imdb = "https://www.imdb.com/title/" + resposta["imdb_id"];
            var imgref;
            var year = resposta["release_date"];
            var average = resposta["vote_average"];
            var res = year.split("-", 1);
            var totalrate = resposta["vote_count"];
            if (img != null) {
                imgref = "http://image.tmdb.org/t/p/w500" + img;
                $("#img").attr("src", imgref);
            } else {
                imgref = "resources/default_img.jpg";
                $("#img").attr("src", imgref);
            }
            var title = resposta["original_title"];
            if (title != "") {
                $("#titlemovie").text(title);
            } else {
                title = "---";
                $("#titlemovie").text(title);
            }
            var status = resposta["status"];
            if (status != "") {
                $("#status").text(status);
            } else {
                status = "Unknown";
                $("#status").text(status);
            }
            var revenue = resposta["revenue"];
            if (revenue != "") {
                $("#revenue").text(revenue + "€");
            } else {
                revenue = "Unknown";
                $("#revenue").text(revenue);
            }
            var budget = resposta["budget"];
            if (budget != "") {
                $("#budget").text(budget + "€");
            } else {
                budget = "Unknown";
                $("#budget").text(budget);
            }
            var genresarr = resposta["genres"];
            var pcsarr = resposta["production_companies"];
            var pcarr = resposta["production_countries"];
            var homepage = resposta["homepage"];
            var tagline = resposta["tagline"];
            if (tagline != "") {
                $("#tagline").text('"' + tagline + '"');
            } else {
                tagline = ""
                $("#tagline").text(tagline);
            }

            var runtime = resposta["runtime"];
            var overview = resposta["overview"];
            var languagearr = resposta["spoken_languages"];
            $("#language").text(languagearr[0].name + " |");
            for (let i = 0; i < genresarr.length; i++) {
                $("#genres").append(genresarr[i].name + " | ");
            }
            for (let i = 0; i < pcsarr.length; i++) {
                $("#pcs").append(pcsarr[i].name + " | ");
            }
            for (let i = 0; i < pcarr.length; i++) {
                $("#pc").append(pcarr[i].name + " | ");
            }
            $("#homepage").attr("href", homepage);
            $("#overview").text(overview);
            $("#titlemovie").append("<span id='date'> (" + res + ")</span>");
            $("#average").text(average);
            $("#totalrate").text("Total: " + totalrate);
            $("#runtime").text(runtime + "min | ");
            $("#imdb").attr("href", imdb);
            getVideo(movieId);
            getKeyword(movieId);
            getCredits(movieId);
            getRecommendation(movieId);
            getReviews(movieId);
            console.log(resposta);
        },
        error: function (erro) {
            console.log(erro);
        }
    });

    function getVideo(movieId) {
        $.ajax({
            type: 'GET',
            url: 'https://api.themoviedb.org/3/movie/' + movieId + "/videos",
            data: {
                api_key: 'f7598fda063f671ed1a42ea9387b6526',
                language: "en-US",
            },
            success: function (data) {
                var video = data["results"][0];
                if (video != null) {
                    var videoId = video.key;
                    embedVideo(videoId)
                }
            },
            error: function (response) {
                console.log("Request Failed");
            }
        });
    }
    function embedVideo(videoId) {
        $('#iframe').attr('src', 'https://www.youtube.com/embed/' + videoId);
    }
    function getKeyword(movieId) {
        $.ajax({
            url: "https://api.themoviedb.org/3/movie/" + movieId + "/keywords",
            type: "GET",
            dataType: "JSON",
            data: {
                api_key: "f7598fda063f671ed1a42ea9387b6526",
                language: "en-US",
            },
            success: function (resposta) {
                var keyarr = resposta["keywords"];
                if (keyarr.length > 5) {
                    for (let i = 0; i < 5; i++) {
                        $("#keywords").append(keyarr[i]["name"] + " | ");
                    }
                } else {
                    for (let i = 0; i < keyarr.length; i++) {
                        $("#keywords").append(keyarr[i]["name"] + " | ");
                    }
                }

            },
            error: function (erro) {
                console.log("Request Failed");
            }
        });
    }
    function getCredits(movieId) {
        $.ajax({
            url: "https://api.themoviedb.org/3/movie/" + movieId + "/credits",
            type: "GET",
            dataType: "JSON",
            data: {
                api_key: "f7598fda063f671ed1a42ea9387b6526",
            },
            success: function (resposta) {
                var castarr = resposta["cast"];
                if (castarr.length > 15) {
                    for (let i = 0; i < 15; i++) {
                        var image = castarr[i].profile_path;
                        if (image == null) {
                            image = "resources/default_img.jpg";
                            $('<tr style="border-bottom: 1px solid #ddd;" id="' + i + '"></tr>').appendTo("#cast");
                            $('<td><img src="' + image + '" style="width:60px; height:70px;"></td><td>' + castarr[i].name + '</td><td>' + castarr[i].character + '</td>').appendTo("tr[id$='" + i + "']");
                        } else {
                            $('<tr style="border-bottom: 1px solid #ddd;" id="' + i + '"></tr>').appendTo("#cast");
                            $('<td><img src="http://image.tmdb.org/t/p/w185' + image + '" style="width:60px; height:70px;"></td><td>' + castarr[i].name + '</td><td>' + castarr[i].character + '</td>').appendTo("tr[id$='" + i + "']");
                        }

                    }
                } else {
                    for (let i = 0; i < castarr.length; i++) {
                        var image = castarr[i].profile_path;
                        if (image == null) {
                            image = "resources/default_img.jpg";
                            $('<tr style="border-bottom: 1px solid #ddd;" id="' + i + '"></tr>').appendTo("#cast");
                            $('<td><img src="' + image + '" style="width:60px; height:70px;"></td><td>"' + castarr[i].name + '"</td><td>' + castarr[i].character + '</td>').appendTo("tr[id$='" + i + "']");
                        } else {
                            $('<tr style="border-bottom: 1px solid #ddd;" id="' + i + '"></tr>').appendTo("#cast");
                            $('<td><img src="http://image.tmdb.org/t/p/w185' + image + '" style="width:60px; height:70px;"></td><td>' + castarr[i].name + '</td><td>' + castarr[i].character + '</td>').appendTo("tr[id$='" + i + "']");
                        }

                    }
                }
            },
            error: function (erro) {
                console.log("Request Failed");
            }
        });
    }
    function getRecommendation(movieId) {
        $.ajax({
            url: "https://api.themoviedb.org/3/movie/" + movieId + "/recommendations",
            type: "GET",
            dataType: "JSON",
            data: {
                api_key: "f7598fda063f671ed1a42ea9387b6526",
                language: "en-US",
            },
            success: function (resposta) {
                console.log(resposta);
                var recarr = resposta["results"];
                if (recarr.length > 6) {
                    for (let i = 0; i < 3; i++) {
                        var image = recarr[i].poster_path;
                        if (image == null) {
                            image = "resources/default_img.jpg";
                            $('<td><img src="' + image + '" class="imgrec">').appendTo("#first");
                        } else {
                            $('<td><img src="http://image.tmdb.org/t/p/w185' + image + '" class="imgrec"></td>').appendTo("#first");
                        }
                    }
                    for (let i = 3; i < 6; i++) {
                        var image = recarr[i].poster_path;
                        if (image == null) {
                            image = "resources/default_img.jpg";
                            $('<td><img src="' + image + '" class="imgrec">').appendTo("#second");
                        } else {
                            $('<td><img src="http://image.tmdb.org/t/p/w185' + image + '" class="imgrec"></td>').appendTo("#second");
                        }
                    }
                } else {
                    for (let i = 0; i < 3; i++) {
                        var image = recarr[i].poster_path;
                        if (image == null) {
                            image = "resources/default_img.jpg";
                            $('<td><img src="' + image + '" class="imgrec"></td>').appendTo("#first");
                        } else {
                            $('<td><img src="http://image.tmdb.org/t/p/w185' + image + '" class="imgrec"></td>').appendTo("#first");
                        }
                    }
                    for (let i = 3; i < recarr.length; i++) {
                        var image = recarr[i].poster_path;
                        if (image == null) {
                            image = "resources/default_img.jpg";
                            $('<td><img src="' + image + '" class="imgrec"></td>').appendTo("#second");
                        } else {
                            $('<td><img src="http://image.tmdb.org/t/p/w185' + image + '" class="imgrec"></td>').appendTo("#second");
                        }
                    }
                }


            },
            error: function (erro) {
                console.log("Request Failed");
            }
        });
    }
    function getReviews(movieId) {
        $.ajax({
            url: "https://api.themoviedb.org/3/movie/" + movieId + "/reviews",
            type: "GET",
            dataType: "JSON",
            data: {
                api_key: "f7598fda063f671ed1a42ea9387b6526",
            },
            success: function (resposta) {
                var reviewarr = resposta["results"];
                if (reviewarr == 0) {
                    $(".reviews").css("display", "none");
                } else {
                    if (reviewarr.length > 10) {
                        for (let i = 0; i < 10; i++) {
                            var ids = i + "re";
                            $('<tr style="border-bottom: 1px solid #ddd;" id="' + ids + '"></tr>').appendTo("#review");
                            $('<td>' + reviewarr[i].author + '</td><td>' + reviewarr[i].content + '</td><td><a href="' + reviewarr[i].url + '"><button>Click for more!</button></a></td>').appendTo("tr[id$='" + ids + "']");
                        }
                    } else {
                        for (let i = 0; i < reviewarr.length; i++) {
                            var ids = i + "re";
                            $('<tr style="border-bottom: 1px solid #ddd;" id="' + ids + '"></tr>').appendTo("#review");
                            $('<td style="padding:10px; width:20%;">' + reviewarr[i].author + '</td><td style="width: 70%; text-align:left;">' + reviewarr[i].content + '</td><td style="width: 10%;"><a href="' + reviewarr[i].url + '"><button class="btn">More!</button></a></td>').appendTo("tr[id$='" + ids + "']");
                        }
                    }
                }
            },
            error: function (erro) {
                console.log("Request Failed");
            }
        });
    }
});

function enlarge() {
    let modal = document.getElementById("myModal");
    let modalImg = document.getElementById("img01");
    let captionText = document.getElementById("caption");
    document.getElementById("img").addEventListener("click", () => {
        modal.style.display = "block";
        modalImg.src = document.getElementById("img").src;
        captionText.innerHTML = document.getElementById("img").alt;
    });
    document.getElementsByClassName("close")[0].addEventListener("click", () => {
        modal.style.display = "none";
    });
}