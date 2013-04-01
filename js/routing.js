  if (Meteor.isClient) {
  //Template Routing
  Template.content.home = function(){
    return Session.get('page_id') == '';
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

  Template.content.questionDetails = function(){
    var qDocs = Questions.find().collection.docs,
        qDocsMember = Session.get('page_id').slice(Session.get('page_id').indexOf('/') + 1,Session.get('page_id').length);
        
        if(qDocs.hasOwnProperty(qDocsMember)){

           return Session.get('page_id') == 'question/' + qDocsMember;
        }
  
  };


  //Set up router
  var appRoutes = Backbone.Router.extend({

    routes: {
      '': 'index',
      'question/:id' : 'question',
      'new' : 'new',
      'about' : 'about',
      'account' : 'account',
      'login' : 'login',
      'users' : 'users'
    },

    index: function () {
     Session.set('page_id', '');
     //this.navigate('/');
    },
    new : function () {
       Session.set('page_id', 'new');
    },
    about : function () {
       Session.set('page_id', 'about');
    },
    account : function () {
       Session.set('page_id', 'account');
    },
    login : function () {
       Session.set('page_id', 'login');
    },
    users : function () {
       Session.set('page_id', 'users');
    },
    question : function (id) {
       Session.set('page_id', 'question/' + id);
    }
     
  });

  //Create new instance of router constructor
  Router = new appRoutes; 

  //Force the router state on page load
  Backbone.history.start({pushState: true});

}