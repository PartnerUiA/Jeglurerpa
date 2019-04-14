
	<!-- JAVASCRIPT
	================================================== -->
	<script src="js/jquery-3.2.1.min.js"></script>
	<script src="js/webfunction.js"></script>

</head>
<body>
	
<div id='form'>
<form id='login' action='register.php' method='post' accept-charset='UTF-8'>
<legend>Login</legend>
<input type='hidden' name='submitted' id='submitted' value='1'/>
<label for='username' >E-post/Brukernavn:</label>
<input type='text' name='email' id='username'  maxlength="50" />
<label for='password' >Passord:</label>
<input type='password' name='password' id='password' maxlength="50" />

<label for='fname' >FName:</label>
<input type='text' name='fname' id='fname' maxlength="50" />
<label for='lname' >LName*:</label>
<input type='lname' name='lname' id='lname' maxlength="50" />
<input type='submit' name='Submit' value='Submit' />
</form>


</div>

</body>
</html>
