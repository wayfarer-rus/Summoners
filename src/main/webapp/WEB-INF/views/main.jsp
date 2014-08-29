<%@taglib prefix="sec"
	uri="http://www.springframework.org/security/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html>
<head>
<style>

#button-box {
	/* width: 300px; */
	padding: 20px;
	margin: 10px auto;
	background: #fff;
	-webkit-border-radius: 2px;
	-moz-border-radius: 2px;
	/* border: 1px solid #000; */
}

</style>

<script	src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
<script type="text/javascript">
function createAjax() {
	$.ajax({
		url : 'createGame',
		type : 'GET',
		 data : ({
			command : "create"
		})
		/* success : function(data) {
			if (data != null) {
				console.log(data);
				$("#word_eng").val(data.split("&")[1]);
				$("#word_article").val(data.split("&")[0]);
			}
		} */
	});
}

function joinAjax() {
	$.ajax({
		url : 'joinGame',
		type : 'GET',
		data : ({
			command : "join"
		})
		/* success : function(data) {
			if (data != null) {
				console.log(data);
				$("#word_eng").val(data.split("&")[1]);
				$("#word_article").val(data.split("&")[0]);
			}
		} */
	});
}
</script>
</head>
<body>
	<h3>${title}</h3>
	

	<sec:authorize access="hasAnyRole('ROLE_USER', 'ROLE_ADMIN')">
		<!-- For login user -->
		<c:url value="/j_spring_security_logout" var="logoutUrl" />
		<form action="${logoutUrl}" method="post" id="logoutForm">
			<input type="hidden" name="${_csrf.parameterName}"
				value="${_csrf.token}" />
		</form>
		<script>
			function formSubmit() {
				document.getElementById("logoutForm").submit();
			}
		</script>

		<c:if test="${pageContext.request.userPrincipal.name != null}">
			<h3>
				User : ${pageContext.request.userPrincipal.name} | <a
					href="javascript:formSubmit()"> Logout</a>
			</h3>
		</c:if>
		
		<div id="button-box">
		
			<input name="create" type="button" value="create game" id = "createButton" onclick="createAjax()"/>
		
			<input name="join" type="button" value="join game" id = "joinButton" onclick="joinAjax()"/>
		
		</div>
		
	</sec:authorize>
	
	<sec:authorize access="hasRole('ROLE_ADMIN')">
		<a href="${pageContext.request.contextPath}/admin">admin page</a>
	</sec:authorize>
	
	
</body>
</html>