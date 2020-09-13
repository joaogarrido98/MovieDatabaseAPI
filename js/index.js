document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("searchme").addEventListener("click", () => {
        document.getElementById("filmsList").innerHTML = "<ul></ul>";
        let query = document.getElementById("query").value;
        if (query === "" || query === null) {
            document.querySelector(".error").style.display = "block";
            setTimeout(function () {
                document.querySelector(".error").style.display = "none";
            }, 2000);
        } else {
            document.getElementById("query").value = "";
            let api = "f7598fda063f671ed1a42ea9387b6526"
            fetch(`https://api.themoviedb.org/3/search/movie?api_key=${api}&query=${query}`)
                .then(response => response.json())
                .then(response => {
                    if (response.total_results == 0) {
                        document.querySelector("#noresults").style.display = "block";
                    } else {
                        document.querySelector("#noresults").style.display = "none";
                        let movies = response["results"];
                        for (let i = 0; i < movies.length; i++) {
                            document.querySelector("#filmsList").style.display = "block";
                            document.querySelector(".container").style.display = "block";
                            let ul = document.querySelector("#filmsList");
                            let li = document.createElement('li');
                            li.id = i;
                            li.className = "list-inline-item"
                            ul.appendChild(li);
                            let imgref = "http://image.tmdb.org/t/p/w185" + movies[i].poster_path;
                            href = "detail.html?movie=" + movies[i].id;
                            if (movies[i].poster_path !== null) {
                                let div = document.createElement("div");
                                div.className = "poster";
                                let a = document.createElement("a");
                                a.href = href;
                                let imgElement = document.createElement("img");
                                imgElement.id = movies[i].id;
                                imgElement.src = imgref;
                                let textDiv = document.createElement("div");
                                textDiv.className = "text-descr";
                                let p = document.createElement("p");
                                p.innerText = movies[i].title;
                                textDiv.appendChild(p);
                                div.appendChild(a);
                                div.appendChild(textDiv);
                                a.appendChild(imgElement);                                
                                li.appendChild(div);
                            }
                        }
                    }
                });
        }
    });
});