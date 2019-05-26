// Coptright Rockwell Automation Technologies, Inc.
// All Rights Reserved.

///////////////////////
// The file includes definitions of following FTVP Plugins actors for TAF.
//	FTVP Find Element
//  FTVP Get Element Property
//  FTVP Set Element Property
//  FTVP Send Event To Element
//  FTVP Get Element Type
// By Ian Wang, iwang@ra.rockwell.com
// Version 0.1, Initailly created.
// Version 0.2, 201604 Update SendEventToElment actor with Keyboard event and index para for mouse click event.
///////////////////////

// Find Element actor.
// @param "Element Name", name of the element to be found
// @return "Element Name", name of the element found
// Note: The actor is at first to return the element. However, the element
// is saved as object in JavaScript and it cannot be accepted by TAF, so returning 
// element's name instead. This actor can be used to check the existence of element.
// Or being updated after TAF supports accepting object from JavaScript.
window.JS_ERRORS = [];
existingOnError = window.onerror;
window.onerror = function() {
	// If there is another routine, run it first
	if ( existingOnError ) {
		existingOnError.apply(this, arguments);
	}
	
	// Now do our special stuff
	var msg = arguments[0];
	var url = arguments[1];
	var lineNum = arguments[2];
	
	window.JS_ERRORS.push(msg + " on line #" + lineNum);
	return true;
}

getJSErrors = function() {
	var items = window.JS_ERRORS;
	window.JS_ERRORS = [];
	return items;
}


FTVPFindElement = function(elementName){
	var element = canvasProxy.getCtrl(elementName);
	
	if(element == null){
		throw TypeError("The element isn't found!");
	};
	
	return element;
};

// Get Element Property actor.
// @param "Element", name of the element
// @param "Element Property", the property of element to be returned
// @return "Property Value", value of the property
FTVPGetElementProperty = function(elementName, elementProperty){
	// get element property
	return canvasProxy.getProperty(elementName,elementProperty);
};

// Set Element Property actor.
// @param "Element", name of the element
// @param "Element Property", the property of element to be set
// @param "Value", the value to be sent
FTVPSetElementProperty = function(elementName, elementProperty, value){
	canvasProxy.setProperty(elementName,elementProperty,value);
};

// Send event to element actor.
// @param "Element", name of the element
// @param "Event", event to be sent to element.
// @param "Keys", keyboard keys sent with keyboard event.
FTVPSendEventToElement = function(argObj){
	
	var elementName = argObj.name;
	var event = argObj.event;
    var index = argObj.index;
	var keys = argObj.key;
	
	// switch according to different event
	switch(event){
		case "Click":
			canvasProxy.dispatchMouseEvent(elementName,'click',index);
			break;
		case "Mousedown":
			canvasProxy.dispatchMouseEvent(elementName,'mousedown');
			break;
		case "Mouseup":
			canvasProxy.dispatchMouseEvent(elementName,'pressup');
			break;
        case "Keyboard":
            canvasProxy.dispatchKeyboardEvent(elementName,'keydown',keys,null);
            break;
		default:
			throw TypeError("Not a valid event is selected!");
	};
};

// Get Element Type actor.
// @param "Element", name of the element
// @return "Element Type", value of element type
FTVPGetElementType = function(elementName){
	// get element type
	var elementControl=canvasProxy.getCtrl(elementName);
	var elementTYpe=elementControl.constructor.name;
    //IE has problem to get constructor name like above
    //getFunctionName is used to make sure the contructor
    //name can be retrieved properly in IE
	if( !elementTYpe ){
		elementTYpe=getFunctionName(elementControl.constructor);
	};
	
	// throw an error if element type value is null
	if(elementTYpe==null){
		throw TypeError("The element type is null!");
	};
	
	return elementTYpe;
};
