const express = require('express');
const router = express.Router();
const controller = require('../controllers/Controller');

// router.get('/chat',controller.chat);

router.get('/home',controller.home);

router.get('/signup',controller.signupGet);
router.post('/signup',controller.signupPost);

router.get('/login',controller.loginGet);
router.post('/login',controller.loginPost);

router.get('/viewstudentprofile/:mid/:sid',controller.viewstudentprofile);
router.get('/viewmentorprofile/:sid/:mid',controller.viewmentorprofile);
router.get('/connect/:id/:oid',controller.connect);
// router.get('/chatroom/:id',controller.chatRoomGet);
// router.get('/chat/:mid/:sid/:mnm',controller.chatGet);
router.post('/message/:id/:mid',controller.messagePost);



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.get('/goalsposted/:id',controller.goalsPostedGet);
router.get('/postgoal/:id',controller.postGoalGet);
router.post('/postgoalpost/:id/:mnm',controller.postGoalPost);
router.get('/profilem/:id',controller.profilem);

router.get('/quizzesposted/:id',controller.quizzesPostedGet);
router.get('/postquiz/:id',controller.postQuizGet);
router.post('/postquizpost/:id/:mnm',controller.postQuizPost);

router.get('/dashboardm/:id',controller.dashboardm);
router.get('/mymentees/:id',controller.mymentees);
router.get('/accept/:id/:oid/:nm',controller.accept);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.get('/dashboard/:id',controller.dashboard);
router.get('/profile/:id',controller.profile);
router.get('/mymentors/:id',controller.mymentors);
router.get('/myquizzes/:id',controller.myquizzes);
router.get('/quizdetails/:id/:oid',controller.quizdetails);
router.get('/takequiz/:sid/:gid/:mnm/:mid/:snm',controller.takequiz);
router.post('/takequizpost/:sid/:snm/:gid/:mid/:mnm',controller.takequizPost);
router.get('/quizreport/:sid/:snm/:gid/:mid/:mnm/:m',controller.quizreport);



// router.get('/mycourses/:id',controller.mycourses);
// router.get('/coursedetails/:id/:oid',controller.coursedetails);
router.get('/mygoals/:id',controller.mygoals);
router.get('/events',controller.events);
router.get('/findmentors/:id',controller.findmentors);
router.get('/goalcompleted/:sid/:gid/:mnm/:snm',controller.goalCompleted);






module.exports = router;
