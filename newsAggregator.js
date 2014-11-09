var http = require("http");
var url  = require("url");
xml2js = require("xml2js");
news = require("./news.js");

news.loadNews();
setInterval(news.loadNews, 600000);


var server = http.createServer(
	function( request, response ){

        var aggregated_rss_news = news.getAggregatedFeed();
    
    	// REQUEST HANDLER
		request.on(
			"data",
			function( chunk ){
			}
		);

		// REQUEST END HANDLER
		request.on(
			"end",
			function(){
			
        if (aggregated_rss_news.length) {
          response.writeHead(
            "200",
            "OK",
            { "content-type": "text/xml" }
          );

          // Close out the response.
          return(response.end(aggregated_rss_news));
        }
        else {
          response.writeHead(
              "404",
              "Page Not Found",
              { "content-type": "text/html" }
            );

          // Close out the response.
          return(response.end(aggregated_rss_news));
        }
			}
		);
	}
);

server.listen( 3000 );
console.log( "Aggregate news server listening on port 3000" );
