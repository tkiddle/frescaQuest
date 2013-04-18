if (Meteor.isClient) {
  

  Template.header.homeLink = function(){
    return window.location.host;
  };
  
  Template.account.questions = function(){
      return Questions.find({owner: Meteor.userId()});
  };
  
  Template.account.user = function(){
      return Meteor.user();
  };
  Template.users.allUsers = function(){
       return Meteor.users.find();
  };

  Template.home.questions = function(){
       return Questions.find({}, {sort : {sortDate: -1}});
  };

  Template.questionDetails.qDetails = function () {
    var   qDocs = Questions.find().collection.docs,
          qDocsMember = Session.get('page_id').slice(Session.get('page_id').indexOf('/') + 1,Session.get('page_id').length);

    //GLOBAL - Current document
    currentDoc = qDocsMember;
    
    return qDocs[qDocsMember];
  };

  Template.questionDetails.editAllowed = function () {
     var  qDocs = Questions.find().collection.docs,
          qDocsMember = Session.get('page_id').slice(Session.get('page_id').indexOf('/') + 1,Session.get('page_id').length),
          currentQuestion = qDocs[qDocsMember].owner,
          currentUser = Meteor.userId();

    if(currentUser === currentQuestion){

      return true;

    }

  };

  Template.questionDetails.test = function () {
    return Comments.find({relatedQuestion:currentDoc}).fetch();
  };


  //New meteor/mongo collection for Questions
  var Questions = new Meteor.Collection('questions');
  //New meteor/mongo collection for Comments
  var Comments = new Meteor.Collection('comments');

}



if (Meteor.isServer) {

  //New meteor/mongo collection for Questions
  var Questions = new Meteor.Collection('questions');
  //New meteor/mongo collection for Comments
  var Comments = new Meteor.Collection('comments');

  Meteor.startup(function () {
   // code to run on server at startup
  });

}
