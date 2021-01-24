function viewDept() {
 
        var query = "SELECT * FROM department";
        connection.query(query, function(err, res) {
            console.table(res);
          }
          runSearch();
        }
      
        function buildDept () {
            inquirer
            .prompt({
                name: "newDepartment", type: "input", message: "Enter Name for New Department.",
                validate: (input) => {
                    if ( !input ) { return 'Must enter an answer.'; }
                    return true;
                },
            })
            .then(response => {
                connection.query("INSERT INTO department SET ?",
                { name: response.newDepartment },
                (err, res) => {
                    if (err) throw err;
                    console.log(`${response.newDepartment} department added successfully.`);
                    employeeRoster();
                });
            });
        };

        const addRole = () => {
            inquirer
            .prompt([
                {
                    name: "roleName", 
                    type: "input", 
                    message: "Enter name of the role to add.",
                    },
                
                {
                    name: "roleSalary", 
                    type: "input", 
                    message: "Enter annual salary for the new role.", 
                },

                {
                    name: "deptId", 
                    type: "list", 
                    message: "Choose department ID number for new role title.", 
                    choices: [ 1, 2, 3, 4, 5]
                }
            ])
            .then(response => {
                connection.query("INSERT INTO role SET ?",
                {
                    title: response.roleName,
                    salary: parseInt(response.roleSalary),
                    department_id: response.deptId
                },
                (err, res) => {
                    if (err) throw err;
                    console.log(`${response.roleTitle} has been added as a new role.`);
                    runSearch();
                });
            });
        };
  
  function multiSearch() {
    var query = "SELECT artist FROM top5000 GROUP BY artist HAVING count(*) > 1";
    connection.query(query, function(err, res) {
      for (var i = 0; i < res.length; i++) {
        console.log(res[i].artist);
      }
      runSearch();
    });
  }
  
  function rangeSearch() {
    inquirer
      .prompt([
        {
          name: "start",
          type: "input",
          message: "Enter starting position: ",
          validate: function(value) {
            if (isNaN(value) === false) {
              return true;
            }
            return false;
          }
        },
        {
          name: "end",
          type: "input",
          message: "Enter ending position: ",
          validate: function(value) {
            if (isNaN(value) === false) {
              return true;
            }
            return false;
          }
        }
      ])
      .then(function(answer) {
        var query = "SELECT position,song,artist,year FROM top5000 WHERE position BETWEEN ? AND ?";
        connection.query(query, [answer.start, answer.end], function(err, res) {
          for (var i = 0; i < res.length; i++) {
            console.log(
              "Position: " +
                res[i].position +
                " || Song: " +
                res[i].song +
                " || Artist: " +
                res[i].artist +
                " || Year: " +
                res[i].year
            );
          }
          runSearch();
        });
      });
  }
  
  function songSearch() {
    inquirer
      .prompt({
        name: "song",
        type: "input",
        message: "What song would you like to look for?"
      })
      .then(function(answer) {
        console.log(answer.song);
        connection.query("SELECT * FROM top5000 WHERE ?", { song: answer.song }, function(err, res) {
          console.log(
            "Position: " +
              res[0].position +
              " || Song: " +
              res[0].song +
              " || Artist: " +
              res[0].artist +
              " || Year: " +
              res[0].year
          );
          runSearch();
        });
      });
  }
  
  function songAndAlbumSearch() {
    inquirer
      .prompt({
        name: "artist",
        type: "input",
        message: "What artist would you like to search for?"
      })
      .then(function(answer) {
        var query = "SELECT top_albums.year, top_albums.album, top_albums.position, top5000.song, top5000.artist ";
        query += "FROM top_albums INNER JOIN top5000 ON (top_albums.artist = top5000.artist AND top_albums.year ";
        query += "= top5000.year) WHERE (top_albums.artist = ? AND top5000.artist = ?) ORDER BY top_albums.year, top_albums.position";
  
        connection.query(query, [answer.artist, answer.artist], function(err, res) {
          console.log(res.length + " matches found!");
          for (var i = 0; i < res.length; i++) {
            console.log(
              i+1 + ".) " +
                "Year: " +
                res[i].year +
                " Album Position: " +
                res[i].position +
                " || Artist: " +
                res[i].artist +
                " || Song: " +
                res[i].song +
                " || Album: " +
                res[i].album
            );
          }
  
          runSearch();
        });
      });
  }
  