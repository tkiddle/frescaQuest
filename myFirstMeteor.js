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


  Template.content.home = function(){
    return Session.get('page_id') == 'home';
  };

  Template.content.about = function(){
    return Session.get('page_id') == 'about';
  }

  Template.content.contact = function(){
    return Session.get('page_id') == 'contact';
  };

  Template.content.loginRegister = function(){
    return Session.get('page_id') == 'login';
  };

  Template.content.account = function(){
    return Session.get('page_id') == 'account';
  };

  Template.content.users = function(){
    return Session.get('page_id') == 'users';
  };

  Template.content.newQuestion = function(){
    return Session.get('page_id') == 'new';
  };





  //Set up router
  var appRoutes = Backbone.Router.extend({

    routes: {
      '*path': 'main'
    },

    main: function (url_path) {
     Session.set('page_id', url_path);
     //this.navigate('/');
    }

  });

  //Create new instance of router
  Router = new appRoutes; 

   //Force the router state on page load
  Backbone.history.start({pushState: true});











    


 

  var Questions = new Meteor.Collection('questions'); 

     



}



if (Meteor.isServer) {

 
var Questions = new Meteor.Collection('questions'); 
 

  Meteor.startup(function () {
   // code to run on server at startup
  });

}
