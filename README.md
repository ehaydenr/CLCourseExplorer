# CLCourseExplorer
Explore UIUC courses from the command line!

# Installation
    git clone https://github.com/ehaydenr/CLCourseExplorer.git
    cd CLCourseExplorer
    npm install -g

# Usage
    Usage: explore <type> [options]

    Possible types:
	  departments		requires year and semester
	  courses			requires year, semester, and department
	  course			requires year, semester, department, and class number

    Options:

      -h, --help                     output usage information
      -V, --version                  output the version number
      -y, --year [language]          Year
      -s, --semester [semester]      Semester
      -d, --department [department]  Department
      -n, --number [course_number]   Course Number
  
# Examples
    explore departments -y 2015 -s spring             // Get all departments
    explore courses -y 2015 -s spring -d CS           // Get all CS courses
    explore course -y 2015 -s spring -d CS -n 241     // Get information for CS241
