 // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyCB9XHClfssL8ZkaDvCSVTYQHoHN5_Ds9M",
    authDomain: "user-sign-up-fd12e.firebaseapp.com",
    projectId: "user-sign-up-fd12e",
    storageBucket: "user-sign-up-fd12e.appspot.com",
    messagingSenderId: "242068498229",
    appId: "1:242068498229:web:104bba1aeea7c4df3f0e7c",
    measurementId: "G-VYL1RYGG0K"
  };

  // Initialize Firebase
  const app = firebase.initializeApp(firebaseConfig);

// Initialize variables
const auth = firebase.auth()
const database = firebase.database()

function register () {
  // Get all the input fields
  email = document.getElementById('email').value
  password = document.getElementById('password').value
  full_name = document.getElementById('full_name').value
  locate = document.getElementById('location').value
 

  // Validate the input fields
  if (validate_email(email) == false || validate_password(password) == false) {
    alert('Email or Password is Invalid!!')
    return
   
  }
  if (validate_field(full_name) == false || validate_field(locate) == false) {
    alert('One or More Extra Fields is Invalid!!')
    return
  }

  auth.createUserWithEmailAndPassword(email, password)
  .then(function() {
    
    var user = auth.currentUser
    var database_ref = database.ref()
    var user_data = {
      email : email,
      full_name : full_name,
      location : locate,
      last_login : Date.now()
    }

    database_ref.child('users/' + user.uid).set(user_data)

    alert('User Created!!')
  })
  .catch(function(error) {
  
    var error_code = error.code
    var error_message = error.message

    alert(error_message)
  })
}

function login () {
  
  email = document.getElementById('email').value
  password = document.getElementById('password').value

  if (validate_email(email) == false || validate_password(password) == false) {
    alert('Email or Password is Invalid!!')
    return
    
  }

  auth.signInWithEmailAndPassword(email, password)
  .then(function() {
 
    var user = auth.currentUser
    var database_ref = database.ref()
    var user_data = {
      last_login : Date.now()
    }

    database_ref.child('users/' + user.uid).update(user_data)

    alert('Yayy! User Logged In!!')

  })
  .catch(function(error) {
    var error_code = error.code
    var error_message = error.message

    alert(error_message)
  })
}


// Validate Functions
function validate_email(email) {
  expression = /^[^@]+@\w+(\.\w+)+\w$/
  if (expression.test(email) == true) {
    // Email is valid
    return true
  } else {
    // Email is invalid
    return false
  }
}

function validate_password(password) {
  if (password < 6) {
    return false
  } else {
    return true
  }
}

function validate_field(field) {
  if (field == null) {
    return false
  }

  if (field.length <= 0) {
    return false
  } else {
    return true
  }
}
