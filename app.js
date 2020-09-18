console.log('Hello Chat App');

 function StartChat(id) {
     document.getElementById('chatPanel').removeAttribute('style');
     document.getElementById('divStart').setAttribute('style', 'display:none');

     hideChatList()
 }

 ////////////////////////////////

 function showChatList() {
    document.getElementById('side-1').classList.remove('d-none', 'd-md-block');    
    document.getElementById('side-2').classList.add('d-none');
 }

 function hideChatList() {
    document.getElementById('side-1').classList.add('d-none', 'd-md-block');    
    document.getElementById('side-2').classList.remove('d-none');
 }

 ///////////////////////////////////////////

 function OnKeyDown() {
     document.addEventListener('keydown', function(key) {
         if(key.key === "Enter") {
             SendMessage()            
         }
         
     });     
 }

 function SendMessage() {
     let message = `<div class="row justify-content-end">              
                     <div class="col-6 col-sm-7 col-md-7">
                      <p class="sent float-right"> 
                        ${document.getElementById('txtMessage').value}                      
                       <span class="time float-right"> 1:28 PM </span>
                      </p>
                     </div>
                     
                     <div class="col-2 col-sm-1 col-md-1">
                      <img src="./images/pp.png" class="chat-pic" alt="profile-pic" />
                     </div>  
                    </div>`

        document.getElementById('messages').innerHTML += message;
        document.getElementById('txtMessage').value = '';   
        document.getElementById('txtMessage').focus();       

        document.getElementById('messages').scrollTo(0, document.getElementById('messages').clientHeight);
 }

 /////////////////////////////////////////////////

 function signIn() {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  }

 function signOut() {
    firebase.auth().signOut();
  }

 function onFirebaseStateChanged() {
    firebase.auth().onAuthStateChanged(onStateChanged);
 }

 function onStateChanged(user) {
    if(user) {
        // alert(firebase.auth().currentUser.email + '\n' + firebase.auth().currentUser.displayName)
    
      var userProfile = { email: '', name: '', photoURL: '' };

      userProfile.email = firebase.auth().currentUser.email;
      userProfile.name = firebase.auth().currentUser.displayName;
      userProfile.photoURL = firebase.auth().currentUser.photoURL;

      firebase.database().ref('users').push(userProfile, callback)
    }         

    else {
        document.getElementById('imgProfile').src = './images/pp.png'; 
        document.getElementById('imgProfile').title = '';   
        
        document.getElementById('linkSignIn').style = '';
        document.getElementById('linkSignOut').style = 'display: none'; 
    }
 }

  function callback(error) {
     if(error) {
        alert(error)
     }       

     else {
        document.getElementById('imgProfile').src = firebase.auth().currentUser.photoURL;
        document.getElementById('imgProfile').title = firebase.auth().currentUser.displayName;  
        
        document.getElementById('linkSignIn').style = 'display: none';
        document.getElementById('linkSignOut').style = ''; 
     }
  }

 onFirebaseStateChanged();