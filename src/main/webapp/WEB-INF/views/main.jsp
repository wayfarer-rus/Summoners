<%@taglib prefix="sec"
	uri="http://www.springframework.org/security/tags"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
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
/* function createAjax() {
	$.ajax({
		url : 'createGame',
		type : 'GET',
		 data : ({
			command : "create"
		})
	});
} */

/* function joinAjax() {
	$.ajax({
		url : 'joingame', 
		type : 'GET',
		contentType: 'application/json',
		data : ({
			id : $('#roomID').val(),
			deckname : $('#joinSelect').val()
		})
	});
}  */
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
		
			<form:form method="GET" action="${pageContext.request.contextPath}/creategame.html">
				<select name="deck">
    				<option value="b">Benders</option>
    				<option value="mv">Mountain Vargath</option>
  				</select>
				
				<input name="create" type="submit" value="create game" id = "createButton"/>
			</form:form>
			
		</div>
		
		<h3>Ready rooms:</h3>
		<div id="games-box">
			<table border="1">
				<tr>
					<th width="10%">#</th><th width="10%">User 1:</th><th width="15%">Deck 1:</th><th width="10%">Deck 2</th><th width="10%">Join</th>
				</tr>
				<c:forEach var="gameroom" items="${applicationScope.gameengine.gameRooms}" varStatus="theCount">
					<tr>
						<td align="center">${theCount.count}</td>
						<td align="center">${gameroom.user1}</td>
						<td align="center">${gameroom.deck1}</td>
						<form:form method="GET" action="${pageContext.request.contextPath}/joingame.html">
							<td align="center">
								<select name="deck" id = "joinSelect">
    								<option value="b">Benders</option>
    								<option value="mv">Mountain Vargath</option>
  								</select>
							</td>
							<td align="center">
								<input name="roomID" type="hidden" value=${gameroom.uniqueID} />
								<input name="join" type="submit" value="join game" />
							</td>
						</form:form>
					</tr>
					
				</c:forEach>
			</table>
		
			<%-- <table>
				<c:forEach items="${gamerooms}" var="gameroom">
        			<tr>
            			<td>UniqueID: <c:out value="${gameroom.uniqueID}"/></td>
            			<td>Created by: <c:out value="${gameroom.user1}"/></td>  
            			<td>With deck: <c:out value="${gameroom.deck1}"/></td>
            			<td><a href="${pageContext.request.contextPath}/joinGame">Join</a></td>
        			</tr>
			    </c:forEach>
    		</table> --%>
		</div>
		
	</sec:authorize>
	
	<sec:authorize access="hasRole('ROLE_ADMIN')">
		<a href="${pageContext.request.contextPath}/admin">admin page</a>
	</sec:authorize>
	
	
</body>
</html>