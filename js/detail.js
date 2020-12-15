document.addEventListener("DOMContentLoaded", () => {
    const api = "f7598fda063f671ed1a42ea9387b6526";
    let url_string = window.location.href;
    let url = new URL(url_string);
    let movieId = url.searchParams.get("movie");
    enlarge();

    fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${api}`)
        .then(response => response.json())
        .then(response => {
            let img = response['poster_path'];
            let imgref;
            let imdb = `https://www.imdb.com/title/${response['imdb_id']}`;
            let year = response["release_date"];
            let average = response["vote_average"];
            let res = year.split("-", 1);
            let totalrate = response["vote_count"];
            let title = response["original_title"];
            let status = response["status"];
            let revenue = response["revenue"];
            let budget = response["budget"];
            let genresarr = response["genres"];
            let pcsarr = response["production_companies"];
            let pcarr = response["production_countries"];
            let homepage = response["homepage"];
            let runtime = response["runtime"];
            let overview = response["overview"];
            let languagearr = response["spoken_languages"];

            if (img !== null && img !== "") {
                imgref = "https://image.tmdb.org/t/p/w500" + img;
                document.querySelector("#img").src = imgref;
            } else {
                imgref = "./img/default_img.jpg"
                document.querySelector("#img").src = imgref;
            }
            if (title !== "") {
                document.querySelector("#titlemovie").textContent = title;
            } else {
                title = "---";
                document.querySelector("#titlemovie").textContent = title;
            }
            if (status != "") {
                document.querySelector("#status").textContent = status;
            } else {
                status = "Unknown";
                document.querySelector("#status").textContent = status;
            }
            if (revenue != "") {
                document.querySelector("#revenue").textContent = revenue + "€";
            } else {
                revenue = "Unknown";
                document.querySelector("#revenue").textContent = revenue;
            }
            if (budget != "") {
                document.querySelector("#budget").textContent = budget + "€";
            } else {
                budget = "Unknown";
                document.querySelector("#budget").textContent = budget;
            }
            document.querySelector("#language").textContent = languagearr[0].name + " |";
            for (let i = 0; i < genresarr.length; i++) {
                document.querySelector("#genres").append(genresarr[i].name + " | ");
            }
            for (let i = 0; i < pcsarr.length; i++) {
                document.querySelector("#pcs").append(pcsarr[i].name + " | ");
            }
            for (let i = 0; i < pcarr.length; i++) {
                document.querySelector("#pc").append(pcarr[i].name + " | ");
            }
            document.querySelector("#homepage").href = homepage;
            document.querySelector("#overview").textContent = overview;
            let span = document.createElement("span");
            span.id = "date";
            span.textContent = " " + res;
            document.querySelector("#titlemovie").append(span);
            document.querySelector("#average").textContent = average;
            document.querySelector("#totalrate").textContent = "Total: " + totalrate;
            document.querySelector("#runtime").textContent = runtime + "min | ";
            document.querySelector("#imdb").href = imdb;


            getVideo(movieId, api);
            getKeyword(movieId, api);
            getCredits(movieId, api);
            getRecommendation(movieId, api);
            getReviews(movieId, api);
        });
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
                    let tr = document.createElement("tr");
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

function getCredits(movieId, api) {
    fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${api}`)
        .then(response => response.json())
        .then(response => {
            let castarr = response["cast"];
            for (let i = 0; i < castarr.length; i++) {
                let image = castarr[i].profile_path;
                if (image == null) {
                    image = "../img/default_img.jpg";
                } else {
                    image = 'https://image.tmdb.org/t/p/w185' + image;
                }
                let tdImage = document.createElement("td");
                let img = document.createElement("img");
                img.src = image;
                img.className = "castImg";
                tdImage.appendChild(img);
                let tdCast = document.createElement("td");
                tdCast.textContent = castarr[i].name;
                let tdCharacter = document.createElement("td");
                tdCharacter.textContent = castarr[i].character;
                let tr = document.createElement("tr");
                tr.className = "creditCast";
                tr.appendChild(tdImage);
                tr.appendChild(tdCast);
                tr.appendChild(tdCharacter);
                document.querySelector("#cast").appendChild(tr);
            }
        });
}

function getRecommendation(movieId, api) {
    fetch(`https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${api}`)
        .then(response => response.json())
        .then(response => {
            let recarr = response["results"];
            for (let i = 0; i < recarr.length; i++) {
                let image = recarr[i].poster_path;
                if (image == null) {
                    image = "../img/default_img.jpg";
                } else {
                    image = 'https://image.tmdb.org/t/p/w185' + image;
                }
                let li = document.createElement("li");
                let img = document.createElement("img");
                img.src = image;
                img.className = "imgrec";
                li.appendChild(img)
                document.querySelector("#second").appendChild(li);
            }
        });
}
