<<<<<<< HEAD
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html>
<head>

<style>
body {
	background: url(resources/bg/fullhd-world-map.png);
	background-attachment: fixed;
 	 background-position: center center; 
	background-size: 600px 600px;
	background-repeat: no-repeat;
}
</style>

</head>
<body>

<c:set var="gameengine" value="${applicationScope.gameengine}"/>

This is game page.

User #1 is ${gameengine.gameRooms[0].user1} and the deck is ${gameengine.gameRooms[0].deck1}<br> 

User #2 is ${gameengine.gameRooms[0].user2} and the deck is ${gameengine.gameRooms[0].deck2}<br> 

${gameroom.board} 



</body>
=======
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html>
<head>

<style>
body {
	background: url(resources/bg/fullhd-world-map.png);
	background-attachment: fixed;
 	 background-position: center center; 
	background-size: 600px 600px;
	background-repeat: no-repeat;
}
</style>

</head>
<body>
<h3>Game page</h3>
<c:set var="gameengine" value="${applicationScope.gameengine}"/>

<c:forEach items="${gameengine.gameRooms[0].players}" var="player">
	User is ${player.playerName} and the deck is  ${player.drawPile.name}<br> 
</c:forEach>


</body>
>>>>>>> upstream/second-branch
</html>