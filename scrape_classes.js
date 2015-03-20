var url_sch = "http://courses.illinois.edu/cisapp/explorer/schedule/";
var url_cat = "http://courses.illinois.edu/cisapp/explorer/catalog/";
var request = require('request');
var Promise = require('promise');

var xml2js= require('xml2js');
var xpath = require("xml2js-xpath");	

function get_departments(year, sem){
  return new Promise(function (resolve, reject){
    var url = url_cat+year+"/"+sem+".xml"; 
    request(url,function(error, response, body){
      if(error){
        reject(error);
      }else{
        xml2js.parseString(body, function (err, result) {
          var matches = xpath.find(result, "//subject");
          resolve({
            year: year,
            semester: sem,
            departments: matches
          });		
        });
      }
    });
  });
}

function get_courses(year, sem, dep){
  return new Promise(function (resolve, reject){
    var url = url_cat+year+"/"+sem+"/"+dep+".xml";
    request(url, function(error, response, body){
      if(error){
        reject(error);
      }else{
        xml2js.parseString(body, function(err, result){
          var matches = xpath.find(result, "//course");
          resolve({
            year: year,
            semester: sem,
            department: dep, 
            courses : matches
          });
        });
      }
    });
  });
}

function get_desc(year, sem, dep, number, title){
  return new Promise(function (resolve, reject){
    var url = url_cat+year+"/"+sem+"/"+dep+"/"+number+".xml";
    request(url, function(error, response, body){
      if(error){
        reject(error);
      }else{
        xml2js.parseString(body, function(err, result){
          var matches = xpath.find(result, "//description");
          if(title === undefined){
            var title_matches = xpath.find(result, "//label");
            if(title_matches.length > 0){
              title = title_matches[0];
            }
          }
          if(err || matches.length == 0){
            reject("Rejecting description for: year: " + year + " semester: " + sem + " number: " + number + " title: " + title);
          }else{
            resolve({
              year: year,
              semester: sem,
              department: dep,
              number: number, 
              title: title,
              description: matches[0]
            });
          }
        });
      }
    });
  });
}

module.exports.get_departments = get_departments;
module.exports.get_courses = get_courses;
module.exports.get_desc = get_desc;


