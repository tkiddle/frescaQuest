if (Meteor.isClient) {

  Template.account.greet = function(){
    return Meteor.user().profile.fname;
  };

  Template.account.questions = function(){
      return Questions.find({owner: Meteor.userId()});
  };
  Template.users.allUsers = function(){
       return Meteor.users.find();
  };

  Template.home.questions = function(){
       return Questions.find();
  };

  //New meteor collection
  var Questions = new Meteor.Collection('questions');

}



if (Meteor.isServer) {

  //New meteor collection
  var Questions = new Meteor.Collection('questions'); 

  Meteor.startup(function () {
   // code to run on server at startup
  });

}
