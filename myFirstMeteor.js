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



  Template.header.events ({
    'click .link': function (e) { 
        var $this = $(e.target);
        Session.set('page_id', $this.attr('href'));
        e.preventDefault();
    },
    'click .logout' : function (e) {
      Meteor.logout( function (Error){
        if(Error){
          alert('OOOPS Something went wrong, try logging out again!');
        }else{
          alert('You are now logged out, come back soon!');
          Session.set('page_id', '');
        }
      });
      e.preventDefault();

    }
  });
 


  Template.loginRegister.events({
    //User Register
    'click #register_form input[type=submit]' : function (e) {

        var fname = $('#fname').val(),
            lname = $('#lname').val(),
            email = $('#email').val(),
            username = $('#new_username').val(),
            password = $('#new_password').val();

        if(fname.length === 0 || lname.length === 0 || email.length === 0 || username.length === 0 || password.length === 0){
          alert('BALLS, Something broked');
          e.preventDefault();
        }

        //alert(name + email + username + password);
        Accounts.createUser({

          'username' : username,
          'password' : password,
          'email' : email,
          'profile' : {
            'fname' : fname,
            'lname' : lname

          }

        }, function(Error){
            if(Error){
              alert('BALLS, Something broked');
            }else{
              alert('YOU are awesome, thanks for joining!');
              Session.set('page_id', 'account');
            }
        });
        e.preventDefault();
    },

    'click #login_form input[type=submit]' : function (e) {

        var username = $('#username').val(),
            password = $('#password').val();

        Meteor.loginWithPassword(username, password, function (Error) {
          if(Error){
            alert('LOGIN FLOPPED');
          }else{
            alert('LOGIN SUCCESS');
            Session.set('page_id', 'account');
          }
        });
        
        e.preventDefault();
    },

    'click #show_me_login' : function () {
      $('#register_form').hide();
      $('#login_form').show();
    },
    'click #show_me_register' : function () {
      $('#login_form').hide();
      $('#register_form').show();
    }







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











    
  });

 

  var Questions = new Meteor.Collection('questions'); 

    Template.content.events({

    'click #new_question input[type=submit]' : function(e) {
      var qTitle = $('#nq_title'),
          qDetails = $('#nq_details'),
          qTags = $('#nq_tags');



        e.preventDefault();

      Questions.insert({
        owner : Meteor.userId(),
        author : (Meteor.user().profile.fname + ' ' +  Meteor.user().profile.lname),
        title : qTitle.val(), 
        details : qDetails.val(),
        tags :  qTags.val().split(',')
      }, function (){
        qTitle.val('');
        qDetails.val('');
         qTags.val('');
      });


    }
  
  }); 



}



if (Meteor.isServer) {

 
var Questions = new Meteor.Collection('questions'); 
 

  Meteor.startup(function () {
   // code to run on server at startup
  });

}
