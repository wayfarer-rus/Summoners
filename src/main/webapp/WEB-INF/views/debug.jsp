<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html>
<head>

<link href="<%=request.getContextPath()%>/resources/css/debug_jsp.css"	rel="stylesheet" />

<style>
/* body {
	background: url(resources/img/fullhd-world-map.png);
	background-attachment: fixed;
	background-position: center center;
	background-size: 600px 600px;
	background-repeat: no-repeat;
} */
</style>

</head>
<body>
	<h3>Debug page</h3>
	<c:set var="gameengine" value="${applicationScope.gameengine}" />
	
	<div class="image"></div>
	
	<textarea name="Input script" rows=10 cols=70 class="debug_textarea">
	</textarea>



</body>
</html>