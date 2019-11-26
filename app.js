var search = document.querySelector("#run-search");
var articleSection = document.querySelector("#article-section");
var numOfArticles = document.querySelector('#article-count');


//add an event listener onto our search button and trigger our get headlines functions
search.addEventListener("click", getHeadlines);

function getHeadlines(){
    //prevent any default behaviour being triggered from our button
    event.preventDefault();

    //construct the queryURL dynamically based off the search-term input which is the keyword for our query
    var query = $("#search-term").val();
    var queryUrl = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${query}&api-key=hnBAPj1FFGUSX5ULP7XmAzyZmoAbiwgA`;
   
    //pass the constructed URL into the ajax call
    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function(response){
        
        //use numOfArticles which is the value we get from the input on the page to control the amount of articles we display
        for(var i = 0; i < numOfArticles.value; i++){

            //set up the elements you want to construct on the page
            var aTag = document.createElement("a");
            var div = document.createElement("div");
            var h2 = document.createElement("h2");
            var p = document.createElement("p");
            
            //set required attributes including href for link and bootstrap class for styling
            aTag.setAttribute("href", response.response.docs[i].web_url); //the web_url hold a link to the article, we set that to the href for the a tag we created
            div.setAttribute("class", "col-12 border my-5 p-2 d-flex flex-column")

            //append the content needed from the ajax call
            h2.append(response.response.docs[i].headline.main);
            p.append(response.response.docs[i].byline.original);

            //append the elements holding the information into the div to section off each article
            div.append(h2);
            div.append(p);
            aTag.appendChild(div);

            //append the overall div into thr section of the website that holds all the responses 
            articleSection.appendChild(aTag);
        }
    });
};