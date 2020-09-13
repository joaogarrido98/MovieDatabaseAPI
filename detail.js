document.addEventListener("DOMContentLoaded", () => {
    const api = "f7598fda063f671ed1a42ea9387b6526";
    let url_string = window.location.href;
    let url = new URL(url_string);
    let movieId = url.searchParams.get("movie");
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
            let img = resposta["poster_path"];
            let imdb = "https://www.imdb.com/title/" + resposta["imdb_id"];
            let imgref;
            let year = resposta["release_date"];
            let average = resposta["vote_average"];
            let res = year.split("-", 1);
            let totalrate = resposta["vote_count"];
            if (img != null) {
                imgref = "http://image.tmdb.org/t/p/w500" + img;
                $("#img").attr("src", imgref);
            } else {
                imgref = "resources/default_img.jpg";
                $("#img").attr("src", imgref);
            }
            let title = resposta["original_title"];
            if (title != "") {
                $("#titlemovie").text(title);
            } else {
                title = "---";
                $("#titlemovie").text(title);
            }
            let status = resposta["status"];
            if (status != "") {
                $("#status").text(status);
            } else {
                status = "Unknown";
                $("#status").text(status);
            }
            let revenue = resposta["revenue"];
            if (revenue != "") {
                $("#revenue").text(revenue + "€");
            } else {
                revenue = "Unknown";
                $("#revenue").text(revenue);
            }
            let budget = resposta["budget"];
            if (budget != "") {
                $("#budget").text(budget + "€");
            } else {
                budget = "Unknown";
                $("#budget").text(budget);
            }
            let genresarr = resposta["genres"];
            let pcsarr = resposta["production_companies"];
            let pcarr = resposta["production_countries"];
            let homepage = resposta["homepage"];
            let tagline = resposta["tagline"];
            if (tagline != "") {
                $("#tagline").text('"' + tagline + '"');
            } else {
                tagline = ""
                $("#tagline").text(tagline);
            }

            let runtime = resposta["runtime"];
            let overview = resposta["overview"];
            let languagearr = resposta["spoken_languages"];
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
            getVideo(movieId, api);
            getKeyword(movieId, api);
            getCredits(movieId, api);
            getRecommendation(movieId, api);
            getReviews(movieId, api);
        },
        error: function (erro) {
            console.log(erro);
        }
    });

    function getCredits(movieId) {
        $.ajax({
            url: "https://api.themoviedb.org/3/movie/" + movieId + "/credits",
            type: "GET",
            dataType: "JSON",
            data: {
                api_key: "f7598fda063f671ed1a42ea9387b6526",
            },
            success: function (resposta) {
                let castarr = resposta["cast"];
                if (castarr.length > 15) {
                    for (let i = 0; i < 15; i++) {
                        let image = castarr[i].profile_path;
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
                        let image = castarr[i].profile_path;
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
                let recarr = resposta["results"];
                if (recarr.length > 6) {
                    for (let i = 0; i < 3; i++) {
                        let image = recarr[i].poster_path;
                        if (image == null) {
                            image = "resources/default_img.jpg";
                            $('<td><img src="' + image + '" class="imgrec">').appendTo("#first");
                        } else {
                            $('<td><img src="http://image.tmdb.org/t/p/w185' + image + '" class="imgrec"></td>').appendTo("#first");
                        }
                    }
                    for (let i = 3; i < 6; i++) {
                        let image = recarr[i].poster_path;
                        if (image == null) {
                            image = "resources/default_img.jpg";
                            $('<td><img src="' + image + '" class="imgrec">').appendTo("#second");
                        } else {
                            $('<td><img src="http://image.tmdb.org/t/p/w185' + image + '" class="imgrec"></td>').appendTo("#second");
                        }
                    }
                } else {
                    for (let i = 0; i < 3; i++) {
                        let image = recarr[i].poster_path;
                        if (image == null) {
                            image = "resources/default_img.jpg";
                            $('<td><img src="' + image + '" class="imgrec"></td>').appendTo("#first");
                        } else {
                            $('<td><img src="http://image.tmdb.org/t/p/w185' + image + '" class="imgrec"></td>').appendTo("#first");
                        }
                    }
                    for (let i = 3; i < recarr.length; i++) {
                        let image = recarr[i].poster_path;
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

function getReviews(movieId, api) {
    fetch(`https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${api}`)
        .then(response => response.json())
        .then(response => {
            let reviewarr = response["results"];
            if (reviewarr === 0) {
                document.querySelector(".reviews").style.display = "none";
            } else {
                for (let i = 0; i < reviewarr.length; i++) {
                    let ids = "review" + i;
                    let tr = document.createElement("tr");
                    tr.id = ids;
                    tr.className = "tr_review";
                    document.querySelector("#review").appendChild(tr);
                    let td_author = document.createElement("td");
                    td_author.className = "td_author";
                    td_author.textContent = reviewarr[i].author;
                    let td_content = document.createElement("td");
                    td_content.className = "td_content";
                    td_content.textContent = reviewarr[i].content;
                    let td_button = document.createElement("td");
                    td_button.className = "td_button";
                    let anchor = document.createElement("a");
                    anchor.href = reviewarr[i].url;
                    let btn = document.createElement("button");
                    btn.className = "btn";
                    btn.textContent = "More!";
                    anchor.appendChild(btn);
                    td_button.appendChild(anchor);
                    tr.appendChild(td_author);
                    tr.appendChild(td_content);
                    tr.appendChild(td_button);
                }

            }
        });
}

function embedVideo(videoId) {
    let iframe = document.querySelector('#iframe');
    iframe.src = 'https://www.youtube.com/embed/' + videoId;
}

function getKeyword(movieId, api) {
    fetch(`https://api.themoviedb.org/3/movie/${movieId}/keywords?api_key=${api}`)
        .then(response => response.json())
        .then(response => {
            let keyarr = response["keywords"];
            for (let i = 0; i < keyarr.length; i++) {
                document.querySelector("#keywords").append(keyarr[i]["name"] + " | ");
            }
        });
}

function getVideo(movieId, api) {
    fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${api}`)
    .then(response => response.json())
    .then(response => {
        let video = response["results"][0];
        if (video != null) {
            let videoId = video.key;
            embedVideo(videoId)
        }
    });
}