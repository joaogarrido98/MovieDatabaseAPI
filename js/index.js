document.addEventListener("DOMContentLoaded", () => {
    let api = "f7598fda063f671ed1a42ea9387b6526";

    document.getElementById("searchme").addEventListener("click", () => {
        document.querySelector("#top_rated").classList.remove("active");
        document.querySelector("#upcoming").classList.remove("active");
        document.querySelector("#popular").classList.remove("active");
        let query = document.getElementById("query").value;
        if (query === "" || query === null) {
            document.querySelector(".error").style.display = "block";
            setTimeout(function () {
                document.querySelector(".error").style.display = "none";
            }, 2000);
        } else {
            document.getElementById("query").value = "";
            fetch(`https://api.themoviedb.org/3/search/movie?api_key=${api}&query=${query}`)
                .then(response => response.json())
                .then(response => {
                    if (response.total_results == 0) {
                        document.querySelector("#noresults").style.display = "block";
                    } else {
                        document.querySelector("#noresults").style.display = "none";
                        let movies = response["results"];
                        loadData(movies);
                    }
                });
        }
    });

    document.querySelector("#popular").addEventListener("click", () => {
        document.querySelector("#top_rated").classList.remove("active");
        document.querySelector("#upcoming").classList.remove("active");
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${api}`)
            .then(response => response.json())
            .then(response => {
                if (response.total_results == 0) {
                    document.querySelector("#noresults").style.display = "block";
                } else {
                    document.querySelector("#noresults").style.display = "none";
                    let movies = response["results"];
                    loadData(movies);
                    document.querySelector("#popular").classList.add("active");
                }
            });
    });

    document.querySelector("#top_rated").addEventListener("click", () => {
        document.querySelector("#popular").classList.remove("active");
        document.querySelector("#upcoming").classList.remove("active");
        fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${api}`)
            .then(response => response.json())
            .then(response => {
                if (response.total_results == 0) {
                    document.querySelector("#noresults").style.display = "block";
                } else {
                    document.querySelector("#noresults").style.display = "none";
                    let movies = response["results"];
                    loadData(movies);
                    document.querySelector("#top_rated").classList.add("active");
                }
            });
    });

    document.querySelector("#upcoming").addEventListener("click", () => {
        document.querySelector("#top_rated").classList.remove("active");
        document.querySelector("#popular").classList.remove("active");
        fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${api}`)
            .then(response => response.json())
            .then(response => {
                if (response.total_results == 0) {
                    document.querySelector("#noresults").style.display = "block";
                } else {
                    document.querySelector("#noresults").style.display = "none";
                    let movies = response["results"];
                    loadData(movies);
                    document.querySelector("#upcoming").classList.add("active");
                }
            });

    });

    const loadData = (movies) => {
        document.getElementById("filmsList").innerHTML = "";
        document.querySelector("#films").style.display = "block";
        for (let i = 0; i < movies.length; i++) {
            let imgref = "http://image.tmdb.org/t/p/w185" + movies[i].poster_path;
            href = "detail.html?movie=" + movies[i].id;
            if (movies[i].poster_path !== null) {
                let ul = document.querySelector("#filmsList");
                let li = document.createElement('li');
                ul.appendChild(li);
                let div = document.createElement("div");
                div.className = "poster";
                let a = document.createElement("a");
                a.href = href;
                let imgElement = document.createElement("img");
                imgElement.src = imgref;
                let textDiv = document.createElement("div");
                textDiv.className = "text-descr";
                let p = document.createElement("p");
                p.textContent = movies[i].title;
                textDiv.appendChild(p);
                div.appendChild(a);
                div.appendChild(textDiv);
                a.appendChild(imgElement);
                li.appendChild(div);
            }
        }
    }
});