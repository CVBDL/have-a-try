mouseClick = function(elementName) {
	var arg =
	FTVPSendEventToElement({
		name: elementName,
		event: 'Mousedown'
	});
	mouseRelease(elementName);
};

mouseRelease = function(elementName) {
	if (FTVPGetElementProperty(elementName, 'ispressed') == false) {
		FTVPSetElementProperty(elementName, 'ispressed', true);
	}
	FTVPSendEventToElement({
		name: elementName,
		event: 'Mouseup'
	});
};

mousePress = function(elementName) {
	FTVPSendEventToElement({
		name: elementName,
		event: 'Mousedown'
	});
};