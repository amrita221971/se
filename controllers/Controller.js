const Event = require("../models/event");
const Student = require("../models/student");
const Mentor = require("../models/mentor");
const Goal = require("../models/goal");
const Message = require("../models/messages");
const Quiz = require("../models/quiz");

 var express = require("express");
// var bodyParser = require("body-parser");
 var app = express();
 var http = require("http").createServer(app);
 var io = require("socket.io")(http);

var { ObjectId } = require("mongodb").ObjectId;

exports.messagePost = function (req, res) {
  let msg = new Message({ sender: sid, receiver: mid, message: message });

};


exports.chat = function (req, res) {
  console.log('here');
  res.render("index.ejs");


};




exports.home = function (req, res) {
  res.render("lp.ejs");
};

exports.signupGet = function (req, res) {
  res.render("signup.ejs");
};
exports.signupPost = function (req, res) {
  var signup_as = Number(req.body.Signup_as);
  var x = Number(req.body.Skill);
  var skill = "";
  switch (x) {
    case 0:
      skill = skill + "Photography";
      break;
    case 1:
      skill = skill + "Painting";
      break;
    case 2:
      skill = skill + "Web Design";
      break;
    case 3:
      skill = skill + "Art director";
      break;
    case 4:
      skill = skill + "Illustrator";
      break;
  }

  if (signup_as === 0) {
    let stu = new Student({
      name: req.body.Name,
      email: req.body.Email,
      password: req.body.Pwd,
      skill: skill,
    });
    //  let ml=new Mail({
    //    email:req.body.Email,
    //    mOrM:0
    //  });
    //
    // ml.save(function (err,ml) {});
    stu.save(function (err, student) {
      res.redirect("/dashboard/" + student._id);
    });
  } else if (signup_as === 1) {
    let men = new Mentor({
      name: req.body.Name,
      email: req.body.Email,
      password: req.body.Pwd,
      skill: skill,
    });

    let ml = new Mail({
      email: req.body.Email,
      mOrM: 1,
    });

    ml.save(function (err, ml) {
      console.log(ml.email);
    });

    var id = "/dashboard/";
    var x = "";
    men.save(function (err, mentor) {
      x = x + mentor._id;
      // console.log(x);
      res.redirect(id + x);
    });
  }
};

exports.loginGet = function (req, res) {
  res.render("login.ejs");
};

exports.loginPost = function (req, res) {
  var email = "";
  email = email + req.body.Email;
  var m = Number(req.body.Signup_as);

  console.log(m);
  if (m === 0) {
    Student.findOne({ email: email }, function (err, student) {
      console.log(student.name);
      res.redirect("/dashboard/" + student._id);
    });
  } else if (m === 1) {
    Mentor.findOne({ email: email }, function (err, student) {
      console.log(student.name);
      res.redirect("/dashboardm/" + student._id);
    });
  }
};

exports.viewstudentprofile = function (req, res) {
  var sid = req.params.sid;
  var mid = req.params.mid;

  Mentor.findById(mid, function (err, men) {
    Student.findById(sid, function (err, stu) {
      var info = { id: mid, sid: sid, men: men, stu: stu };
      res.render("viewstudentprofile.ejs", { info: info });
    });
  });
};

exports.viewmentorprofile = function (req, res) {
  var sid = req.params.sid;
  var mid = req.params.mid;

  Mentor.findById(mid, function (err, men) {
    Student.findById(sid, function (err, stu) {
      var info = { id: sid, mid: mid, men: men, stu: stu };
      res.render("viewmentorprofile.ejs", { info: info });
    });
  });
};

exports.connect = function (req, res) {
  var id = req.params.id;
  var mid = req.params.oid;

  Student.findById(id, function (err, user) {
    Mentor.findOneAndUpdate(
      { _id: mid },
      { $push: { connectionrequests: { id: id, name: String(user.name) } } },
      function (err, user) {
        res.redirect("/viewmentorprofile/" + id + "/" + mid);
      }
    );
  });
  // console.log(ob);
};

// exports.chatRoomGet = function (req, res) {
//   console.log(req.params.id);
//   var id = req.params.id;
//   // var m=Number(req.params.m);
//
//   Student.findById(id, function (err, user) {
//     var info = { id: user._id, user: user,name:user.name };
//
//     res.render("chatroom.ejs", { info: info });
//   });
// };
//
// exports.chatGet = function (req, res) {
//   console.log(req.params.sid);
//   console.log(req.params.mid);
//
//   var sid = req.params.sid;
//   var mid = req.params.mid;
//   var mnm = req.params.mnm;
//   // var m=Number(req.params.m);
//
//   Student.findById(sid, function (err, user) {
//     var info = { id: user._id, user: user, mnm: mnm, mid: mid,name:user.name };
//
//     res.render("chat.ejs", { info: info });
//   });
// };

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
exports.dashboardm = function (req, res) {
  console.log(req.params.id);
  var id = req.params.id;
  // var m=Number(req.params.m);

  Mentor.findById(id, function (err, user) {
    var info = { id: user._id, m: 1, user: user };

    res.render("dashboardm.ejs", { info: info });
  });
};

exports.profilem = function (req, res) {
  var id = req.params.id;
  Mentor.findById(id, function (err, user) {
    var info = { id: id, m: 1, user: user, name: user.name };
    res.render("profilem.ejs", { info: info });
  });
};

exports.mymentees = function (req, res) {
  console.log(req.params.id);
  var id = req.params.id;
  // var m=Number(req.params.m);

  Mentor.findById(id, function (err, user) {
    var info = { id: user._id, m: 1, name: user.name, user: user };

    res.render("mymentees.ejs", { info: info });
  });
};

exports.goalsPostedGet = function (req, res) {
  console.log(req.params.id);
  var id = req.params.id;
  // var m=Number(req.params.m);

  Mentor.findById(id, function (err, user) {
    var info = { id: id, m: 1, name: user.name, user: user };

    res.render("goalsPosted.ejs", { info: info });
  });
};

exports.postGoalGet = function (req, res) {
  console.log(req.params.id);
  var id = req.params.id;
  // var m=Number(req.params.m);

  Mentor.findById(id, function (err, user) {
    var info = { id: id, m: 1, name: user.name, user: user };

    res.render("postGoal.ejs", { info: info });
  });
};

exports.postGoalPost = function (req, res) {
  var mid = req.params.id;
  var mnm = req.params.mnm;

  // var m=Number(req.params.m);
  var goal = req.body.goal;
  var agt = req.body.assignGoalTo;
  var str = "";
  var str1 = "";
  var idx = 0;
  for (var i = 0; i < agt.length; i++) {
    if (agt[i] != ",") {
      str = str + agt[i];
    }
    if (agt[i] === ",") {
      idx = i;
      break;
    }
  }

  for (var i = idx; i < agt.length; i++) {
    if (agt[i] != ",") {
      str1 = str1 + agt[i];
    }
  }

  let gl = new Goal({
    goal: goal,
    postedBy: { id: mid, name: mnm },
    to: { id: str, name: str1 },
  });
  // console.log(typeof(agt));
  // console.log(gl);
  gl.save(function (err, goal) {
    console.log(goal);
    Student.findOneAndUpdate(
      { _id: str },
      { $push: { pendingGoals: { id: goal._id, by: mnm, goal: goal.goal } } },
      function (err, stu) {}
    );

    Mentor.findOneAndUpdate(
      { _id: mid },
      {
        $push: {
          myGoals: {
            id: goal._id,
            to_id: str,
            to_name: str1,
            goal: goal.goal,
            status: 0,
          },
        },
      },
      function (err, user) {
        res.redirect("/postgoal/" + mid);
      }
    );
  });
};

exports.quizzesPostedGet = function (req, res) {
  console.log(req.params.id);
  var id = req.params.id;
  // var m=Number(req.params.m);

  Mentor.findById(id, function (err, user) {
    var info = { id: user._id, m: 1, user: user, name: user.name };

    res.render("quizzesPosted.ejs", { info: info });
  });
};

exports.postQuizGet = function (req, res) {
  var id = req.params.id;
  // var m=Number(req.params.m);

  Mentor.findById(id, function (err, user) {
    var info = { id: user._id, m: 1, user: user, name: user.name };

    res.render("postQuiz.ejs", { info: info });
  });
};

exports.postQuizPost = function (req, res) {
  var mid = req.params.id;
  var mnm = req.params.mnm;

  var pqt = req.body.postQuizTo;
  var title = req.body.title;

  var sid = "";
  var snm = "";
  var idx = 0;
  for (var i = 0; i < pqt.length; i++) {
    if (pqt[i] != ",") {
      sid = sid + pqt[i];
    }
    if (pqt[i] === ",") {
      idx = i;
      break;
    }
  }

  for (var i = idx; i < pqt.length; i++) {
    if (pqt[i] != ",") {
      snm = snm + pqt[i];
    }
  }
  var Q1 = req.body.Q1;
  var Q1o1 = req.body.Q1o1;
  var Q1o2 = req.body.Q1o2;
  var Q1o3 = req.body.Q1o3;
  var Q1o4 = req.body.Q1o4;
  var Q1an = Number(req.body.Q1ans);
  var Q1a = "";
  switch (Q1an) {
    case 1:
      Q1a = Q1a + String(Q1o1);
      break;
    case 2:
      Q1a = Q1a + String(Q1o2);
      break;
    case 3:
      Q1a = Q1a + String(Q1o3);
      break;
    case 4:
      Q1a = Q1a + String(Q1o4);
      break;
  }
  let qz = new Quiz({
    title: title,
    by_id: mid,
    by_name: mnm,
    to_name: snm,
    to_id: sid,
    Q1: Q1,
    Q1o1: Q1o1,
    Q1o2: Q1o2,
    Q1o3: Q1o3,
    Q1o4: Q1o4,
    Q1an: Q1an,
    Q1a: Q1a,
  });
  // console.log(typeof(agt));
  console.log(qz);
  // res.redirect('/postquiz/'+mid);

  qz.save(function (err, quiz) {
    console.log(quiz);
    Student.findOneAndUpdate(
      { _id: sid },
      {
        $push: {
          pendingQuizzes: {
            id: quiz._id,
            by_name: mnm,
            by_id: mid,
            title: title,
          },
        },
      },
      function (err, stu) {}
    );

    Mentor.findOneAndUpdate(
      { _id: mid },
      {
        $push: {
          quizziesPosted: {
            id: quiz._id,
            to_id: sid,
            to_name: snm,
            title: title,
            status: 0,
          },
        },
      },
      function (err, user) {
        res.redirect("/postquiz/" + mid);
      }
    );
  });
};

exports.accept = function (req, res) {
  console.log(req.params.id);
  var mid = req.params.id;
  var sid = req.params.oid;
  var snm = req.params.nm;

  // console.log(id +' m');
  // console.log(oid);
  Mentor.findOneAndUpdate(
    { _id: mid },
    { $pull: { connectionrequests: { id: sid } } },
    function (err, user) {
      console.log(user);
    }
  );
  Mentor.findOneAndUpdate(
    { _id: mid },
    { $push: { students: { id: sid, name: snm } } },
    function (err, user) {
      console.log(user);
      Student.findByIdAndUpdate(
        sid,
        { $push: { myMentors: { id: mid, name: user.name } } },
        function (err, stu) {
          res.redirect("/dashboardm/" + mid);
        }
      );
    }
  );
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

exports.dashboard = function (req, res) {
  var id = req.params.id;
  console.log(id);

  Student.findById(id, function (err, user) {
    var info = { id: id, m: 0, name: user.name, user: user };

    res.render("dashboard.ejs", { info: info });
  });
};

exports.profile = function (req, res) {
  var id = req.params.id;
  Student.findById(id, function (err, user) {
    var info = {
      id: id,
      m: 0,
      user: user,
      name: user.name,
      // myMentorsCount:user.myMentorsCount,
      // quizzesCount:user.quizzesCount,
      // myGoalsCount:user.myGoalsCount,
      // myCoursesCount:user.myCoursesCount
    };
    res.render("profile.ejs", { info: info });
  });
};

exports.mymentors = function (req, res) {
  var id = req.params.id;
  Student.findById(id, function (err, user) {
    var info = { id: id, m: 0, user: user, name: user.name };
    res.render("mymentors.ejs", { info: info });
  });
};

exports.myquizzes = function (req, res) {
  var id = req.params.id;

  Student.findById(id, function (err, user) {
    var info = { id: id, m: 0, user: user, name: user.name };
    res.render("myquizzes.ejs", { info: info });
  });
};

exports.quizdetails = function (req, res) {
  var id = req.params.id;

  Student.findById(id, function (err, user) {
    var info = { id: id, m: 0, user: user, name: user.name };
    res.render("quizdetails.ejs", { info: info });
  });
};
exports.takequiz = function (req, res) {
  var sid = req.params.sid;
  var gid = req.params.gid;
  var mnm = req.params.mnm;
  var snm = req.params.snm;
  var mid = req.params.mid;

  Student.findById(sid, function (err, stu) {
    Quiz.findById(gid, function (err, quiz) {
      var info = {
        id: sid,
        name: snm,
        stu: stu,
        quiz: quiz,
        mid: mid,
        mnm: mnm,
      };
      res.render("takequiz.ejs", { info: info });
    });
  });
};

exports.takequizPost = function (req, res) {
  var sid = req.params.sid;
  var gid = ObjectId(req.params.gid);
  var mnm = req.params.mnm;
  var snm = req.params.snm;
  var mid = req.params.mid;
  var m = req.params.m;

  var q1an = Number(req.body.Q1ans);
  var Q1a = "";

  Student.findOneAndUpdate(
    { _id: sid },
    { $pull: { pendingQuizzes: { id: gid } } },
    function (err, user) {
      console.log(user);
    }
  );
  Quiz.findById(gid, function (err, quiz) {
    switch (q1an) {
      case 1:
        Q1a = Q1a + String(quiz.Q1o1);
        break;
      case 2:
        Q1a = Q1a + String(quiz.Q1o2);
        break;
      case 3:
        Q1a = Q1a + String(quiz.Q1o3);
        break;
      case 4:
        Q1a = Q1a + String(quiz.Q1o4);
        break;
    }
    Student.findOneAndUpdate(
      { _id: sid },
      {
        $push: {
          quizzes: {
            id: gid,
            by_name: mnm,
            by_id: mid,
            a1: Q1a,
            title: quiz.title,
          },
        },
      },
      function (err, stu) {
        Mentor.findOneAndUpdate(
          { name: mnm },
          { $pull: { quizziesPosted: { id: gid } } },
          function (err, stu) {}
        );
        Mentor.findOneAndUpdate(
          { name: mnm },
          {
            $push: {
              quizziesPosted: {
                id: gid,
                to_name: snm,
                to_id: sid,
                a1: Q1a,
                title: quiz.title,
                status: 1,
              },
            },
          },
          function (err, men) {
            res.redirect(
              "/quizreport/" +
                sid +
                "/" +
                snm +
                "/" +
                gid +
                "/" +
                mid +
                "/" +
                mnm +
                "/0"
            );
          }
        );
      }
    );
  });
};
exports.quizreport = function (req, res) {
  var sid = req.params.sid;
  var gid = req.params.gid;
  var mnm = req.params.mnm;
  var snm = req.params.snm;
  var mid = req.params.mid;
  var m = Number(req.params.m);
  var x;
  Student.findById(sid, function (err, stu) {
    Quiz.findById(gid, function (err, quiz) {
      for (var i = 0; i < stu.quizzes.length; i++) {
        if (stu.quizzes[i].id.equals(quiz._id)) {
          //console.log(stu.quizzes[i]);
          x = stu.quizzes[i];
          // console.log(x);
        }
      }
      Mentor.findById(mid, function (err, men) {
        var info = {
          m: m,
          stu: stu,
          men: men,
          quiz: quiz,
          x: x,
        };
        res.render("quizreport.ejs", { info: info });
      });
    });
  });
};
exports.mygoals = function (req, res) {
  var id = req.params.id;

  Student.findById(id, function (err, user) {
    var info = { id: id, m: 0, name: user.name, user: user };
    res.render("mygoals.ejs", { info: info });
  });
};

exports.events = function (req, res) {
  res.render("events.ejs");
};

exports.findmentors = function (req, res) {
  var id = req.params.id;

  Student.findById(id, function (err, stu) {
    var info = { id: id, m: 0, name: stu.name };
    Mentor.find(function (err, user) {
      res.render("findmentors.ejs", { info: info, user: user });
    });
  });
};

exports.goalCompleted = function (req, res) {
  var sid = req.params.sid;
  var gid = req.params.gid;
  var mnm = req.params.mnm;
  var snm = req.params.snm;

  Student.findOneAndUpdate(
    { _id: sid },
    { $pull: { pendingGoals: { goal: gid } } },
    function (err, user) {}
  );
  Student.findOneAndUpdate(
    { _id: sid },
    { $push: { myGoals: { goal: gid, by: mnm } } },
    function (err, user) {
      Mentor.findOneAndUpdate(
        { name: mnm },
        { $pull: { myGoals: { goal: gid, to_id: sid } } },
        function (err, stu) {}
      );
      Mentor.findOneAndUpdate(
        { name: mnm },
        {
          $push: {
            myGoals: { goal: gid, to_id: sid, to_name: snm, status: 1 },
          },
        },
        function (err, stu) {}
      );
      res.redirect("/mygoals/" + sid);
    }
  );
};
