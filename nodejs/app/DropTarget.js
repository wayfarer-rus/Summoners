function DropTarget(element) {    element.dropTarget = this    this.canAccept = function(dragObject) {        return true    }    this.accept = function(dragObject) {        this.onLeave()        dragObject.onDragFail();        //var img = document.createElement("img");        //img.src = dragObject.src;        //img.style = dragObject.style;        element.appendChild(dragObject.cloneNode(true));        element.style.color = null;        //element.removeAttribute('style')        //alert("Акцептор '"+this+"': принял объект '"+dragObject+"'")        ajaxPost('action/move', "{\"x\": 0, \"y\": 0}");    }    this.onLeave = function() {        element.className = 'item'    }    this.onEnter = function() {        element.className = 'item hower'    }    this.toString = function() {        return element.id    }}