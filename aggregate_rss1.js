var  async = require('async');
//var  _ = require('underscore');
var aggregatednews;

function aggregate(rss1,rss2) {
     console.log("in aggregate--------");  
     //var requestBuffer = news.getRssFeed(url.parse(request.url.replace('/', '')).pathname) || [];
     
         // Close out the response.
          //return(response.end(requestBuffer.join("")));
              // Close out the response.
          //return(response.end(requestBuffer.join("")));
          var parser = new xml2js.Parser();
          parser.parseString(rss1.join(""), function (err, result) {
                //console.log(util.inspect(result, false, null))
                //console.log("result.functions: " + result["functions"]["function"][0]["$"]["id"]);
                //callback("",JSON.stringify(result));
                
                result.rss.channel[0].item = result.rss.channel[0].item.slice(0,10);
                delete result.rss.channel[0]["atom:link"];
                delete result.rss.channel[0].image;
                delete result.rss.channel[0].language;
                delete result.rss.channel[0].copyright;
                delete result.rss.channel[0].lastBuildDate;
                delete result.rss.channel[0].category;
                delete result.rss.channel[0].ttl;
                result.rss.channel[0].title = "Aggregated News - BBC and SKY";
                result.rss.channel[0].link = "test_url";
                result.rss.channel[0].description = "The latest top 10 stories from the Home section of BBC and SKY News web site.";
                
                //var itemArray = result.rss.channel[0].item;
                //console.log("items total:"+ itemArray.length);
                parser.parseString(rss2.join(""), function (err, result2) {
                     
                     result2.rss.channel[0].item = result2.rss.channel[0].item.slice(0,10);
                     result.rss.channel[0].item.push.apply(result.rss.channel[0].item, result2.rss.channel[0].item)
                     var itemArray = result.rss.channel[0].item;
                     console.log("items total---------:"+ itemArray.length);
                     var builder = new xml2js.Builder();
                     aggregatednews = builder.buildObject(result);
                     //console.log("requestBuffer----------:" + JSON.stringify(result));
                     //console.log("aggregatednews----------:" + aggregatednews);
                     //return(response.end(xml));
                });
                
            });
      

};

function getAggregatedNews() {
  return(aggregatednews);
}



module.exports.aggregate = aggregate;
module.exports.getAggregatedNews = getAggregatedNews;
