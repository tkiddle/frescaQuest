//Meteor events
var frag;
if (Meteor.isClient) {

	alert('asdasd');

	//Content template events
	Template.content.events ({

		'click #new_question input[type=submit]' : function(e) {

		  var qTitle = $('#nq_title'),
		      qDetails = $('#nq_details'),
		      qTags = $('#nq_tags'),
		      questionDate = new Date(),
		      dd = questionDate.getDay(),
		      mm = questionDate.getMonth(),
		      yyyy = questionDate.getFullYear(),
		      fullDate = (dd + '/' + mm + '/' + yyyy),
		      sortDate = Date.parse(questionDate);


		      //Construct formatted date
		      if(dd < 10){
		      	dd = '0' + dd;
		      }
		       if(mm < 10){
		      	mm = '0' + mm;
		      }


			e.preventDefault();

			Questions.insert({
				owner : Meteor.userId(),
				author : (Meteor.user().profile.fname + ' ' +  Meteor.user().profile.lname),
				title : qTitle.val(), 
				details : qDetails.val(),
				tags :  qTags.val().split(','),
				sortDate : sortDate,
				dateAsked : fullDate
			}, function (){
				qTitle.val('');
				qDetails.val('');
				qTags.val('');
			});

		},
		
		'click .q_link': function (e) {

	    	var reg = /.+?\:\/\/.+?(\/.+?)(?:#|\?|$)/;
    		var pathname = reg.exec(event.currentTarget.href)[1];
    		//alert(pathname);
    		Router.navigate(pathname, true);
	        e.preventDefault();

	    }

	});//content.events ENDS

	//Header template events
	Template.header.events ({
		'click .home_link': function (e) {

    		Router.navigate('', true);
	        e.preventDefault();

	    },

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





	Template.questionDetails.events ({

		'click #qedit' : function () {

			var qd = $('#question_details'),
				ef = $('#edit_form'),
				details = ef.find('#eq_details'),
				title = ef.find('#eq_title'),
				tags = ef.find('#eq_tags');

			title.val(Questions.findOne(currentDoc).title);
			details.val(Questions.findOne(currentDoc).details);
			tags.val(Questions.findOne(currentDoc).tags);
			qd.hide();
			ef.show();

		},

		'click #edit_form input[type=submit]' : function (e) {			

				e.preventDefault();

				var qd = $('#question_details'),
					ef = $('#edit_form'),
					details = ef.find('#eq_details'),
					title = ef.find('#eq_title'),
					tags = ef.find('#eq_tags'),
					newTitle,
					newDeets;
					

				Questions.update(currentDoc, {$set : {
					'title'	:  title.val(),
					'details' :  details.val()
				}},{multi: false}, function(){

					newTitle = Questions.findOne(currentDoc).title;
					newDeets = Questions.findOne(currentDoc).details;

					$('#qtitle').html(newTitle);
					$('#qdetails p').html(newDeets);
					qd.show();
					ef.hide();

				});			

				
		}

	});

	
};