#!/usr/bin/env node
var program = require('commander');
var scrape = require('./scrape_classes.js');
var chalk = require('chalk');
var pad = require('./utils.js').pad;


program
.version('0.0.1')
.description('Possible types: \n\tdepartments\t\trequires year and semester\n\tcourses\t\t\trequires year, semester, and department\n\tcourse\t\t\trequires year, semester, department, and class number')
.usage('<type> [options]')
.option('-y, --year [language]', 'Year')
.option('-s, --semester [semester]', 'Semester')
.option('-d, --department [department]', 'Department')
.option('-n, --number [course_number]', 'Course Number')
.parse(process.argv);

if(!program.args.length){
  program.help();
}else{
  // Print parameters
  var keyword = program.args[0];
  if(keyword == "departments"){
    console.log(chalk.green(program.semester + " " + program.year));
    scrape.get_departments(program.year, program.semester).then(function(res){
      for(var i = 0; i < res.departments.length; ++i){
        var title = res.departments[i]._;
        var code = res.departments[i].$.id;
        console.log(chalk.red(pad(code, 6, ' ', STR_PAD_RIGHT)) + chalk.green(title));
      }
    });
  }else if(keyword == "courses"){
    console.log(chalk.green(program.semester + " " + program.year + " - " + program.department));
    scrape.get_courses(program.year, program.semester, program.department).then(function(res){
      for(var i = 0; i < res.courses.length; ++i){
        var title = res.courses[i]._;
        var code = res.courses[i].$.id;
        console.log(chalk.red(pad(program.department + code, 8, ' ', STR_PAD_RIGHT)) + chalk.green(title));
      }
    });
  }else if(keyword == "course"){
    console.log(chalk.green(program.semester + " " + program.year + " - " + program.department + program.number));
    scrape.get_desc(program.year, program.semester, program.department, program.number).then(function(res){
      console.log(chalk.red(pad(program.department + program.number, 8, ' ', STR_PAD_RIGHT)) + chalk.green(res.title));
      console.log(chalk.green(res.description));
    });
  }else{
    console.log(chalk.red('Error: keyword not recognized. Please choose between departments, courses, and course.'));
  }
}


