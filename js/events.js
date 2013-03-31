//Meteor events
if (Meteor.isClient) {

	//Content template events
	Template.content.events ({

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

	});//content.events ENDS


	//Header template events
	Template.header.events ({

	    'click .link': function (e) {

	    	var reg = /.+?\:\/\/.+?(\/.+?)(?:#|\?|$)/;
    		var pathname = reg.exec(event.currentTarget.href)[1];
    		Router.navigate(pathname, true);
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

	});//header.events ENDS


	Template.loginRegister.events({
		
		//Registration form
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
			}, 
			function(Error){
				if(Error){
					alert('BALLS, Something broked');
				}else{
					alert('YOU are awesome, thanks for joining!');
					Session.set('page_id', 'account');
				}
			});
			e.preventDefault();

		},

		//Login form
		'click #login_form input[type=submit]' : function (e) {

			var username = $('#username').val(),
				password = $('#password').val();

			Meteor.loginWithPassword(username, password, function (Error) {
				if(Error){
					alert('LOGIN FLOPPED');
				}else{
					alert('LOGIN SUCCESS');
					Router.navigate('account', true);
				}
			});
			e.preventDefault();

		},

		//Login form toggle
		'click #show_me_login' : function () {
			$('#register_form').hide();
			$('#login_form').show();
		},

		//Register form toggle
		'click #show_me_register' : function () {
			$('#login_form').hide();
			$('#register_form').show();
		}

	});//loginRegister.events ENDS




}