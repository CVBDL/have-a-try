// Copyright Rockwell Automation Technologies, Inc.
// All Rights Reserved.
/*****************************************************************
helper methods for OOP
*****************************************************************/
/**
 * Inherit from base class
 * @param  {object} p
 * @return {object} new object which inhert from base class
 */
if (window.ViewPoint) {
	__document__index__ = document;
} else {
	__document__index__ = document.getElementById("obj1").contentWindow.document;
	$ = document.getElementById("obj1").contentWindow.$;
}

ViewPoint = window.ViewPoint || document.getElementById("obj1").contentWindow.ViewPoint;
createjs = window.createjs || document.getElementById("obj1").contentWindow.createjs;

inherit = function(p) {
    "use strict";

    if (p == null) throw TypeError();

    var t = typeof p;
    if (t !== "object" && t !== "function")
        throw TypeError();
    if (Object.create)
        return Object.create(p);

    function f() {};
    f.prototype = p;
    return new f();
};


/**
 * Extend properties of source object to destination object
 * @param  {object} destination, destination object to receive properties
 * @param  {object} source, source object provide properties
 * @return {object}, destination
 */
extend = function(destination, source) {
    "use strict";    
    for (var property in source)
        destination[property] = source[property];
    return destination;
};

getFunctionName = function(fun) {
  var ret = fun.toString();
  ret = ret.substr('function '.length);
  ret = ret.substr(0, ret.indexOf('('));
  return ret;
};


stringCompare = function( src, target, ignoreCase){
    "use strict";    

    if( !src || !target)
        return false;

    var tmpSrc = src;
    var tmpTarget = target;

    if(ignoreCase){
        tmpSrc = src.toLowerCase();
        tmpTarget = target.toLowerCase();
    }

    return ( tmpSrc === tmpTarget );
};

/*****************************************************************
Class definition of ProxyObjFactory
This class take the responsibility to create proxy object
*****************************************************************/
/**
 * Class definition of DelegatreObjFactor
 * this class takes responsibility to create proxy object of
 * gfx object which implemented in HTML5 Canvas.
 * @param {object} map, contains the map of gfx control type and
 * constructor of proxy object
 */
ProxyObjFactory = function(map) {
    "use strict";    

    if( map ==  null)
        throw new Error("map is null");

    this.ctorMap = map;
};


/**
 * Create proxy object for gfx control
 * @param  {object} ctrl, instance of gfx control
 * @return {AbstractGfxProxy} instance of proxy object
 */
ProxyObjFactory.prototype.createProxyObj = function(ctrl) {
    "use strict";

    if(ctrl == null)
        return null;

    //IE has problem to get constructor name like below
    //getFunctionName is used to make sure the contructor
    //name can be retrieved properly in IE
    var ctrlType = ctrl.constructor.name;
    if( !ctrlType )
        ctrlType = getFunctionName(ctrl.constructor);

    if (this.ctorMap[ctrlType])
        return new this.ctorMap[ctrlType](ctrl);

    return null;
};


/*****************************************************************
Class definition of AbstractGfxProxy
This class take the responsibility to create wrapper(proxy)
object, and operate on wrapper object to complish required function
*****************************************************************/
/**
 * CanvasProxy class
 * @param {Object} objFactory, instance of ProxyObjFactory which takes the responsibliity to create proxy object
 */
CanvasProxy = function(objFactory) {
    "use strict";

    if(objFactory == null)
        throw new Error("objFactory is null");

    this.factoryObj = objFactory;

};

CanvasProxy.prototype.getCtrl = function( ctrlName ){
    "use strict";

    return undefined;
};

CanvasProxy.prototype.getEaselObj = function( data ){
    "use strict";

    return undefined;
};

/**
 * Create concrete proxy object for gfx control
 * @param  {string} ctrlName, specify the name of gfx control
 * @return {object} instance of proxy object
 */
CanvasProxy.prototype._createProxyObj = function(ctrlName) {
    "use strict";

    var gfxObj = this.getCtrl(ctrlName);
    if (gfxObj == null)
        return null;

    var proxyObj = this.factoryObj.createProxyObj(gfxObj);
    if(proxyObj)
        proxyObj.ctrlName = ctrlName;

    return proxyObj;

};

/**
 * Get value of property
 * @param  {string} ctrLName, name of the gfx control to be operated
 * @param  {string} propertyName, name of the property to be retreived
 * @return {object} value of the property specified by propertyName
 */
CanvasProxy.prototype.getProperty = function(ctrlName, propertyName) {
    "use strict";

    var proxyObj = this._createProxyObj(ctrlName);

    if (proxyObj == null)
        return null;

    return proxyObj.getProperty(propertyName);

};

/**
 * Set new value to property specified by propertyName
 * @param {string} ctrLName, name of the gfx control to be operated
 * @param {string} propertyName, name of the property to be retreived
 * @param {object} value, new vaule
 * @return {bool} true, if suceeded; otherwise, false
 */
CanvasProxy.prototype.setProperty = function(ctrlName, propertyName, value) {
    "use strict";

    var proxyObj = this._createProxyObj(ctrlName);

    if (proxyObj == null)
        return false;

    return proxyObj.setProperty(propertyName, value);
};

/**
 * Dispatch mouse event
 * @param {string} ctrLName, name of the gfx control to be operated
 * @param  {string} eventName, name of the mouse event to be fired
 * @param  {object} data, data related with this mouse event
 * @return {bool} true, if suceeded; otherwise, false
 */
CanvasProxy.prototype.dispatchMouseEvent = function(ctrlName, eventName, data) {
    "use strict";

    var proxyObj = this._createProxyObj(ctrlName);

    if (proxyObj == null)
        return false;

    return proxyObj.dispatchMouseEvent(eventName, data);
};

/**
 * Dispatch keboard event
 * @param {string} ctrLName, name of the gfx control to be operated
 * @param  {string} eventName, name of the keyboard event to be fired
 * @param  {Number} kCode, key code of the key event
 * @param  {object} data, data related with this mouse event
 * @return {bool} true, if suceeded; otherwise, false
 */
CanvasProxy.prototype.dispatchKeyboardEvent = function(ctrlName, eventName, kCode, data) {
    "use strict";

    var proxyObj = this._createProxyObj(ctrlName);

    if (proxyObj == null)
        return false;

    return proxyObj.dispatchKeyboardEvent(eventName, kCode, data);
};

/**
 * Dispatch HTML event
 * @param {string} ctrLName, name of the gfx control to be operated
 * @param  {string} eventName, name of the HTML event to be fired
 * @param  {object} data, data related with this mouse event
 * @return {bool} true, if suceeded; otherwise, false
 */
CanvasProxy.prototype.dispatchHtmlEvent = function(ctrlName, eventName, data) {
    "use strict";

    var proxyObj = this._createProxyObj(ctrlName);

    if (proxyObj == null)
        return false;

    return proxyObj.dispatchHtmlEvent(eventName, data);
};


/*****************************************************************
Class definition of AbstractGfxProxy
This class is the parent class of proxy class, it defines the
interface between CanvasProxy and concrete proxy class.
*****************************************************************/
/**
 * Abstract class of gfx object proxy
 * @param {object} ctrl, instance of gfx control
 */
AbstractGfxProxy = function(ctrl) {
    "use strict";

    if(!ctrl)
        throw new Error("ctrl is null");
    
    this.gfxCtrl = ctrl;
};

/**
 * get property value
 * @param  {string} propertyName, name of the property to be retreived
 * @return {object} value of the property specified by propertyName
 */
AbstractGfxProxy.prototype.getProperty = function(propertyName) {
    "use strict";

    return null;
};

/**
 * Set new value to property specified by propertyName
 * @param {string} propertyName, name of the property to be retreived
 * @param {object} data, new vaule
 * @return {bool} true, if suceeded; otherwise, false
 */
AbstractGfxProxy.prototype.setProperty = function(propertyName, data) {
    "use strict";

    return false;
};

/**
 * Dispatch mouse event
 * @param  {string} eventName, name of the mouse event to be fired
 * @param  {object} data, data related with this mouse event
 * @return {bool} true, if suceeded; otherwise, false
 */
AbstractGfxProxy.prototype.dispatchMouseEvent = function(eventName, data) {
    "use strict";

    return false;
};

/**
 * Dispatch keboard event
 * @param  {string} eventName, name of the keyboard event to be fired
 * @param  {Number} kCode, key code of the key event
 * @param  {object} data, data related with this mouse event
 * @return {bool} true, if suceeded; otherwise, false
 */
AbstractGfxProxy.prototype.dispatchKeyboardEvent = function(eventName, kCode, data) {
    "use strict";

    return false;
};


/**
 * Dispatch HTML event
 * @param  {string} eventName, name of the HTML event to be fired
 * @param  {object} data, data related with this mouse event
 * @return {bool} true, if suceeded; otherwise, false
 */
AbstractGfxProxy.prototype.dispatchHtmlEvent = function(eventName, data) {
    "use strict";

    return false;
};


/*****************************************************************
Concrete classes of proxy objects: 
*****************************************************************/
FTViewPointGfxProxy = function(ctrl) {
    "use strict";

    AbstractGfxProxy.apply(this, arguments);
};
FTViewPointGfxProxy.prototype = inherit(AbstractGfxProxy.prototype);
FTViewPointGfxProxy.prototype.constructor = FTViewPointGfxProxy;
FTViewPointGfxProxy.prototype.eventMatchers = {
    'HTMLEvents': /^(?:load|unload|abort|error|select|change|submit|reset|focus|blur|resize|scroll)$/,
    'MouseEvents': /^(?:pressup|click|dblclick|mouse(?:down|up|over|move|enter|out))$/,
    'KeyboardEvent': /^(?:key(?:down|up|press))$/
};

/**
 * Retreive EaselJS Object associated with gfx control
 * @param  {object} data, additional data to get the easelJS object
 * @return {object} instance of easelJS object associated with gfx control
 */
FTViewPointGfxProxy.prototype._getEaselObj = function(data) {
    "use strict";

    if (!this.gfxCtrl)
        return undefined;

    //for list control, return easelObj of specific item
    //Following code should be moved to concrete class for list control
    /*
    if( this.gfxCtrl instanceof ViewPoint.Client.Controls.ListControl )
    {
        return ctrl.ItemsDictionary.Values[data];
    }
    */
    return this.gfxCtrl.EaselObject;
};


FTViewPointGfxProxy.prototype._getBoundingCtrl = function(){
    "use strict"

    //the naming convention of bounding box  is ctrlName+"_bounding_box"
    if(this.ctrlName)
        return canvasProxy.getCtrl( this.ctrlName + "_bounding_box");

    return canvasProxy.getCtrl( this.gfxCtrl.Name + "_bounding_box");
}

/**
 * Try to convert property name to a real property of gfx ctrl
 * @param  {string} propertyName, property name to be handled
 * @param {bool} isSet indicates whether this property is used in setProperty method
 * @return {object} object to present destination name and handler
 */
FTViewPointGfxProxy.prototype._translateProperty = function(propertyName, isSet) {
    "use strict";

    if (isSet) {
        return {
            srcEventName: propertyName,
            destEventName: propertyName,
            handler: this._setPropertyValue
        };
    } else {
        return {
            srcEventName: propertyName,
            destEventName: propertyName,
            handler: this._getPropertyValue
        };
    }
};

/**
 * get property value
 * @param  {string} ctrLName, name of the gfx control to be operated
 * @param {object} gxfCtrl, gfx control to be operated
 * @return {object} value of the property specified by propertyName
 */
FTViewPointGfxProxy.prototype._getPropertyValue = function(propertyName, gfxCtrl) {
    "use strict";

    if (gfxCtrl == null)
        throw new Error("gxfObj can't be null");

    if (propertyName == null)
        throw new Error("propertyName can't be null");
    try {
        var parts = propertyName.split('.');
        var root = gfxCtrl;
        var index = 0;
        var currentPart = parts[index];
        if (currentPart in root) {
            root = root[currentPart];
            ++index;
            if (index < parts.length) {
                var nextPart = parts[index];
                for (var i = index + 1; i < parts.length; ++i) {
                    nextPart += '.' + parts[i];
                }
                return this._getPropertyValue(nextPart, root);
            } else {
                return root;
            }
        } else {
            for (var i = index + 1; i < parts.length; ++i) {
                currentPart += '.' + parts[i];
                if(currentPart in root) {
                    root = root[currentPart];
                    index = i + 1;
                    if(index < parts.length) {
                        var nextPart = parts[index];
                        for (var i = index + 1; i < parts.length; ++i) {
                            nextPart += '.' + parts[i];
                        }
                        return this._getPropertyValue(nextPart, root);
                    } else {
                        return root;
                    }
                } else {
                    continue;
                }
            }
            return undefined;
        }
    } catch (e) {
        console.log(e.stack);
        return false;
    }
};

/**
 * Set new value to property specified by propertyName
 * @param {string} ctrLName, name of the gfx control to be operated
 * @param {object} gxfCtrl, gfx control to be operated
 * @param {object} value, new vaule
 * @return {bool} true, if suceeded; otherwise, false
 */
FTViewPointGfxProxy.prototype._setPropertyValue = function(propertyName, gfxCtrl, value) {
    "use strict";

    if (gfxCtrl == null)
        throw new Error("gxfObj can't be null");

    if (propertyName == null)
        throw new Error("propertyName can't be null");

    try {

        var parts = propertyName.split('.');
        var root = gfxCtrl;
        var index = 0;
        var currentPart = parts[index];
        if (currentPart in root) {
            if (index < parts.length - 1) {
                root = root[currentPart];
                ++index;
                var nextPart = parts[index];
                for (var i = index + 1; i < parts.length; ++i) {
                    nextPart += '.' + parts[i];
                }
                return this._setPropertyValue(nextPart, root, value);
            } else {
                root[currentPart] = value;
                return true;
            }
        } else {
            for (var i = index + 1; i < parts.length; ++i) {
                currentPart += '.' + parts[i];
                if(currentPart in root) {
                    if(i < parts.length - 1) {
                        root = root[currentPart];
                        index = i + 1;
                        var nextPart = parts[index];
                        for (var i = index + 1; i < parts.length; ++i) {
                            nextPart += '.' + parts[i];
                        }
                        return this._setPropertyValue(nextPart, root, value);
                    } else {
                        root[currentPart] = value;
                        return true;
                    }
                } else {
                    continue;
                }
            }
            return false;
        }
        
    } catch (e) {
        console.log(e.stack);
        return false;
    }
};


/**
 * get property value
 * @param  {string} propertyName, name of the property to be retreived
 * @return {object} value of the property specified by propertyName
 */
FTViewPointGfxProxy.prototype.getProperty = function(propertyName) {
    "use strict";

    var propertyHandler = this._translateProperty(propertyName, false);

    if (propertyHandler && propertyHandler.handler)
        return propertyHandler.handler.call(this, propertyHandler.destEventName, this.gfxCtrl);
    else
        return this._getPropertyValue(propertyName, this.gfxCtrl);
};

/**
 * Set new value to property specified by propertyName
 * @param {string} ctrLName, name of the gfx control to be operated
 * @param {object} value, new vaule
 * @return {bool} true, if suceeded; otherwise, false
 */
FTViewPointGfxProxy.prototype.setProperty = function(propertyName, value) {
    "use strict";    

    var propertyHandler = this._translateProperty(propertyName, true);

    if (propertyHandler && propertyHandler.handler)
        return propertyHandler.handler.call(this, propertyHandler.destEventName, this.gfxCtrl, value);
    else
        return this._setPropertyValue( propertyName, this.gfxCtrl, value);
}


/**
 * create instance of event according to the event name
 * @param  {object} element, target object to fire the event
 * @param  {eventName} name of the event
 * @return {object} instance of event
 */
FTViewPointGfxProxy.prototype._createEvent = function(element, eventName) {
    "use strict";

    var defaultOptions = {
        pointerX: 0,
        pointerY: 0,
        button: 0,
        ctrlKey: false,
        altKey: false,
        shiftKey: false,
        metaKey: false,
        bubbles: true,
        cancelable: true,
        keyCode: 0,
        charCode: 0
    };

    var options = extend(defaultOptions, arguments[2] || {});
    var oEvent, eventType = null;

    for (var name in this.eventMatchers) {
        if (this.eventMatchers[name].test(eventName)) {
            eventType = name;
            break;
        }
    }

    if (!eventType)
        throw new SyntaxError('Only HTMLEvents and MouseEvents interfaces are supported');

    if (__document__index__.createEvent) {
        oEvent = __document__index__.createEvent(eventType);
        if (eventType == 'HTMLEvents') {
            oEvent.initEvent(eventName, options.bubbles, options.cancelable);
        } else if (eventType == 'MouseEvents') {
            oEvent.initMouseEvent(eventName, options.bubbles, options.cancelable, __document__index__.defaultView,
                options.button, options.pointerX, options.pointerY, options.pointerX, options.pointerY,
        //change the relatedTarget: element to null to fit for Firefox.
                options.ctrlKey, options.altKey, options.shiftKey, options.metaKey, options.button, /* element */null);
        } else if (eventType == 'KeyboardEvent') {
            if( oEvent.initKeyboardEvent )
                oEvent.initKeyboardEvent(eventName, options.bubbles, options.cancelable, __document__index__.defaultView,
                options.ctrlKey, options.altKey, options.shiftKey, options.metaKey, options.keyCode);
            else if( oEvent.initKeyEvent )
                oEvent.initKeyEvent(eventName, options.bubbles, options.cancelable, __document__index__.defaultView,
                options.ctrlKey, options.altKey, options.shiftKey, options.metaKey, options.keyCode, 0);
               

            Object.defineProperty(oEvent, 'keyCode', {
                get: function() {
                    return options.keyCode;
                }
            });

            Object.defineProperty(oEvent, 'which', {
                get: function() {
                    return options.keyCode;
                }
            });
        }
    } else {
        options.clientX = options.pointerX;
        options.clientY = options.pointerY;
        var evt = __document__index__.createEventObject();
        oEvent = extend(evt, options);
    }
    //Add by Nicholas on 9-1-2015. Judgement to support for NumericInput TAF support.
    if(!oEvent.currentTarget) {

        if (!Object.defineProperty || !(function () { try { Object.defineProperty({}, 'x', {}); return true; } catch (e) { return false; } } ())) {
            var orig = Object.defineProperty;
            Object.defineProperty = function (o, prop, desc) {
              // In IE8 try built-in implementation for defining properties on DOM prototypes.
              if (orig) { try { return orig(o, prop, desc); } catch (e) {} }

              if (o !== Object(o)) { throw TypeError("Object.defineProperty called on non-object"); }
              if (Object.prototype.__defineGetter__ && ('get' in desc)) {
                Object.prototype.__defineGetter__.call(o, prop, desc.get);
              }
              if (Object.prototype.__defineSetter__ && ('set' in desc)) {
                Object.prototype.__defineSetter__.call(o, prop, desc.set);
              }
              if ('value' in desc) {
                o[prop] = desc.value;
              }
              return o;
            };
        }

        Object.defineProperty(oEvent, 'currentTarget', {
            value: __document__index__.getElementById('_displayRoot')
       });
    }
    return oEvent;
};

/**
 * retreive supported event type
 * @param  {string} eventName name of event
 * @return {string} supported event type, it should be one of [HtmlEvents|MouseEvents|KeyboardEvents];
 * null if none of about
 */
FTViewPointGfxProxy.prototype._getEventType = function(eventName) {
    "use strict";

    var eventType;
    for (var name in this.eventMatchers) {
        if (this.eventMatchers[name].test(eventName)) {
            eventType = name;
            break;
        }
    }

    return eventType;
};

/**
 * Try to convert property name to a real event of gfx ctrl
 * @param  {string} EventName, event name to be handled
 * @return {object} object to present destination name and handler
 */
FTViewPointGfxProxy.prototype._translateEvent = function(eventName) {
    "use strict";

    var eventType = this._getEventType(eventName);

    if (!eventType)
        return null;

    var eventDispatcher;
    switch (eventType) {
        case 'HTMLEvents':
            eventDispatcher = this._dispatchHtmlEvent;
            break;
        case 'MouseEvents':
            eventDispatcher = this._dispatchMouseEvent;
            break;
        case 'KeyboardEvent':
            eventDispatcher = this._dispatchKeyboardEvent;
            break;
    }

    return {
        srcEventName: eventName,
        destEventName: eventName,
        handler: eventDispatcher
    };
};

/**
 * Get name of html element for the event to be fired
 * @param  {string} eventName name of the event to be fired
 * @return {string} name of html element if present, otherwise, null
 */
FTViewPointGfxProxy.prototype._getEventTarget = function(eventName) {
    "use strict";

    return null;
};

/**
 * Dispatch mouse event
 * @param  {string} eventName, name of the mouse event to be fired
 * @param  {object} data, data related with this mouse event
 * @return {bool} true, if suceeded; otherwise, false
 */
FTViewPointGfxProxy.prototype.dispatchMouseEvent = function(eventName, data) {
    "use strict";

    var target = this._getEventTarget(eventName);
    var eventDispatcher = this._translateEvent( eventName ) ;
    if(eventDispatcher && eventDispatcher.handler )
        return eventDispatcher.handler.call(this, target, eventDispatcher.destEventName, data);

    return false;
};

/**
 * Dispatch keboard event
 * @param  {string} eventName, name of the keyboard event to be fired
 * @param  {Number} kCode, key code of the key event
 * @param  {object} data, data related with this mouse event
 * @return {bool} true, if suceeded; otherwise, false
 */
FTViewPointGfxProxy.prototype.dispatchKeyboardEvent = function(eventName, kCode, data) {
    "use strict";

    var target = this._getEventTarget(eventName);
    var eventDispatcher = this._translateEvent( eventName ) ;
    if(eventDispatcher && eventDispatcher.handler )
        return eventDispatcher.handler.call(this, target, eventName, kCode, data);
        
    return false;    
};

/**
 * Dispatch HTML event
 * @param  {string} eventName, name of the HTML event to be fired
 * @param  {object} data, data related with this mouse event
 * @return {bool} true, if suceeded; otherwise, false
 */
FTViewPointGfxProxy.prototype.dispatchHtmlEvent = function(eventName, data) {
    "use strict";

    var target = this._getEventTarget(this.gfxCtrl.name);
    return this._dispatchHtmlEvent(target, eventName, data);
};

/**
 * Dispatch mouse event
 * @param  {string} htmlElem, name of html element which will receive the event. null if it is not a html element
 * @param  {string} eventName, name of the mouse event to be fired
 * @param  {object} data, data related with this mouse event
 * @return {bool} true, if suceeded; otherwise, false
 */
FTViewPointGfxProxy.prototype._dispatchMouseEvent = function(htmlElem, eventName, data) {
    "use strict";

    var ctrl = htmlElem ? $(htmlElem) : this.gfxCtrl;

    if (ctrl == null)
        return false;

    if (htmlElem)
        ctrl.trigger(eventName);
    else
        this._fireEaselObjectEvent(ctrl, eventName, data);

    return true;
};

FTViewPointGfxProxy.prototype._enumerateEventReceiver = function(container, depth, evtRecverList){
    "use strict"

    function addReceiver( receiverList, newReceiver, depth ){
        if(!receiverList)
            receiverList = [ {Receiver:newReceiver, Depth:depth} ];
        else
            receiverList.push( {Receiver:newReceiver, Depth:depth} );
    };

    if( !container)
        return evtRecverList;

    var listenersProp = '_listeners';

    for( var index=0; container.children && index < container.children.length; index++){
        this._enumerateEventReceiver(container.children[index], depth+1, evtRecverList);
    }


    if( (listenersProp in container) && container[listenersProp] ){
        addReceiver( evtRecverList, container, depth);
    }
        

    return evtRecverList;
};

FTViewPointGfxProxy.prototype._fireEaselObjectEvent = function(ctrl, eventName, data ){
    "use strict"

    var easelObject = this._getEaselObj(data);
    if (!easelObject)
        return false;

    if( !this.innerFireEaselObjectEvent( easelObject, ctrl, eventName, data) ) {
        var boundingCtrl = this._getBoundingCtrl();
        if( !boundingCtrl ) 
            return false;

        return this.innerFireEaselObjectEvent( boundingCtrl.EaselObject, boundingCtrl, eventName, data)
    }

    return true;
};

FTViewPointGfxProxy.prototype.innerFireEaselObjectEvent = function(easelObj, ctrl, eventName, data){
    "use strict"

    if( !easelObj )
        return false;

    var x = 0,
        y = 0;
    if (ctrl && "Bounds" in ctrl) {
        x = (ctrl.Bounds.X + ctrl.Bounds.Width) / 2.0;
        y = (ctrl.Bounds.Y + ctrl.Bounds.Height) / 2.0;
    }else if( ctrl && "Top" in ctrl && "Left" in ctrl && "Height" in ctrl && "Width" in ctrl){
        x = (ctrl.Left+ ctrl.Width) / 2.0;
        y = (ctrl.Top + ctrl.Height) / 2.0;
    }

    var event = this._createEvent(easelObj, eventName, {
        pointerX: x,
        pointerY: y,
        button: 0
    });

    var easelEvt = new createjs.MouseEvent(
        eventName, true, false, x, y, event, -1, -1 == window._primaryPointerID, x, y);

    var eventReceivers = [];
    eventReceivers = this._enumerateEventReceiver(easelObj.stage, 0, eventReceivers);

    eventReceivers.sort( function(a, b){ return b.depth - a.depth;})
    if( eventReceivers.length ){
        eventReceivers[0].Receiver.dispatchEvent( easelEvt );
        return true;
    }

    return false;
};

/**
 * Dispatch keboard event
 * @param  {string} htmlElem, html element which will fire the event. null if it is not a html element
 * @param  {string} eventName, name of the keyboard event to be fired
 * @param  {Number} kCode, key code of the key event
 * @param  {object} data, data related with this mouse event
 * @return {bool} true, if suceeded; otherwise, false
 */
FTViewPointGfxProxy.prototype._dispatchKeyboardEvent = function(htmlElem, eventName, kCode, data) {
    "use strict";

    var ctrl = htmlElem ? $(htmlElem) : this;

    if (ctrl == null)
        return false;

    if (htmlElem) {
        var e = jQuery.Event(eventName, {
            keyCode: kCode
        });
        jQuery.event.trigger(e, null, ctrl);
    } else {
        var easelObject = this._getEaselObj(data);

        if (!easelObject)
            throw new Error("can't find EaselObject");

        var keyEvent = this._createEvent(easelObject, eventName, {
            keyCode: kCode
        });

        __document__index__.dispatchEvent(keyEvent);
    }

    return true;
};


/**
 * Dispatch mouse event
 * @param  {string} htmlElem, html element which will fire the event. null if it is not a html element
 * @param  {string} eventName, name of the html event to be fired
 * @param  {object} data, data related with this mouse event
 * @return {bool} true, if suceeded; otherwise, false
 */
FTViewPointGfxProxy.prototype._dispatchHtmlEvent = function(htmlElem, eventName, data) {
    "use strict";

    if (!htmlElem)
        return false;

    var ctrl = $(htmlElem);

    if (ctrl == null)
        return false;

    ctrl.trigger(eventName);

    return true;
};

//[201512 Kyle] Update for mobile compatiblity.
FTViewPointGfxProxy.prototype._IsMobile = function(){
    var check = false;
    (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|tablet|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4)))
                check = true; })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
};



FTVPCanvasProxy = function(objFactory){
    "use strict";
    CanvasProxy.apply(this, arguments);
}
FTVPCanvasProxy.prototype = inherit(CanvasProxy.prototype);
FTVPCanvasProxy.prototype.constructor = FTVPCanvasProxy;

FTVPCanvasProxy.prototype.getMainPage = function() {
    "use strict";
    try{

        var mainPage = window.ViewPoint.Client.MainPage.GetMainPage();
        return mainPage;
    }
    catch(TypeError){
        return null;
    }
};

FTVPCanvasProxy.prototype.findControl = function(ctrlName, target) {
    "use strict";
    
    if( !target )
        return undefined;
        
    if( target.Name === ctrlName )
        return target;

    if(! ('Children' in target) )
        return undefined;

    var children = target.Children;
    var count = children.Count;

    for (var index = 0; index < count; index++) {
        var ctrl = children.itemArray[index];
        
        var finding = this.findControl( ctrlName, ctrl);
        
        if (finding)
            return finding;
    }

    return null;
}


FTVPCanvasProxy.prototype.getCtrl = function(ctrlName){
    "use strict";

    var mainPage = this.getMainPage();

    if (!ctrlName || !mainPage)
        return undefined;
        
    var names = this.parseCtrlName(ctrlName);
    if( !names || !names.CtrlName || names.CtrlName === "")
        return undefined;

    //window.ViewPoint.Client.MainPage.mainPage;
    //window.ViewPoint.Client.MainPage.mainPage._displayRoot.Children.itemArray[0].Children.itemArray[0];
    var canvas = this.getCanvas(mainPage._displayRoot, names.DisplayName, names.AreaName );
    if(!canvas)
        return undefined;

    var group = canvas.Children.itemArray[1];       

    return this.findControl(names.CtrlName, group);
}

FTVPCanvasProxy.prototype.getCanvas = function( target, displayName, areaName ){
    "use strict";

    if( !target )
        return null;

    var className = getFunctionName(target.constructor);
    if(  className !== "Canvas"  && className !== "PopupDisplay")
        return null;

    if( !("Children" in target) )
        return null;

    var canvasCnt = target.Children.Count;
    if(canvasCnt === 0 )
        return null;

    //if displayName was not specified, then just return the contents of first canvas 
    if( !displayName || displayName === "" )
        return target.Children.itemArray[0].Children.itemArray[0];

    //match the display name first
    if( !target.Name || !stringCompare(target.Name, displayName, true) ){
        var finding = null;
        canvasCnt--;
        do{
            finding = this.getCanvas( target.Children.itemArray[canvasCnt], displayName, areaName);
            canvasCnt--;
        }while( !finding && canvasCnt >= 0 )

        return finding;
     }
     //match the area name
     else{
        //Currentlly, 'Canvas' & 'PopupDisplay' are two kind of display which 
        //supported by FTViewPoint. 'Canvas' type is for on top display; 
        //'PopupDisplay' is for pop up display.

        //below is an example of the data structure of Canvas in FTViewPoint
        /****************************************************************************************************/
        // _displayRoot._children.ItemArray[0]: canvas
        // _displayRoot._children.ItemArray[1]: canvas
        // _displayRoot._children.ItemArray[2]: canvas

        // _displayRoot._children.ItemArray[0].Name = "237 tag main"
        // _displayRoot._children.ItemArray[0]._children.Count = 1
        // _displayRoot._children.ItemArray[0]._children.itemArray[0] : canvas
        // _displayRoot._children.ItemArray[0]._children.itemArray[0]._children.itemArray[0] : DisplaySetting
        // _displayRoot._children.ItemArray[0]._children.itemArray[0]._children.itemArray[1] : Group
        // _displayRoot._children.ItemArray[0]._children.itemArray[0]._children.itemArray[1]._children.count = 33
        // _displayRoot._children.ItemArray[0]._children.itemArray[0]._children.itemArray[1]._children.itemArray[0]: Text

        // _displayRoot._children.ItemArray[1].Name = "237 Popup no titlebar"
        // _displayRoot._children.ItemArray[1]._children.Count = 1
        // _displayRoot._children.ItemArray[1]._children.itemArray[0] : PopupDisplay
        // _displayRoot._children.ItemArray[1]._children.itemArray[0].Display : Display
        // _displayRoot._children.ItemArray[1]._children.itemArray[0].Display.AreaName = "/Area 0"
        // _displayRoot._children.ItemArray[1]._children.itemArray[0].Display.DisplayRoot : Canvas
        // _displayRoot._children.ItemArray[1]._children.itemArray[0].Display.DisplayRoot._children.count = 2
        // _displayRoot._children.ItemArray[1]._children.itemArray[0].Display.DisplayRoot._children.itemArray[0] : DisplaySettings
        // _displayRoot._children.ItemArray[1]._children.itemArray[0].Display.DisplayRoot._children.itemArray[1] : Group

        // _displayRoot._children.ItemArray[2].Name = "237 Popup"
        // _displayRoot._children.ItemArray[2]._children.Count = 1
        // _displayRoot._children.ItemArray[2]._children.itemArray[0] : PopupDisplay
        // _displayRoot._children.ItemArray[2]._children.itemArray[0].Display : Display
        // _displayRoot._children.ItemArray[2]._children.itemArray[0].Display.DisplayRoot : Canvas
        // _displayRoot._children.ItemArray[2]._children.itemArray[0].Display.DisplayRoot._children.count = 2
        // _displayRoot._children.ItemArray[2]._children.itemArray[0].Display.DisplayRoot._children.itemArray[0] : DisplaySettings
        // _displayRoot._children.ItemArray[2]._children.itemArray[0].Display.DisplayRoot._children.itemArray[1] : Group        
        /****************************************************************************************************/
        
        var subObj = target.Children.itemArray[0];
        //area name only available on PopupDisplay instance
        //return the displayRoot instance (displayName matched)
        if( getFunctionName(subObj.constructor) === "Canvas" )
            return subObj;

        //For PopupDisplay instance, match the areaName
        //return DisplaryRoot instance if areaName matched
        if( (getFunctionName(subObj.constructor) === "PopupDisplay") && ("Display" in subObj) ){
            var targetAreaName = subObj.Display.AreaName;
            if(targetAreaName.indexOf("/") !== 0)
                targetAreaName = "/" + targetAreaName;

            if( !areaName || areaName === "" || stringCompare(targetAreaName, areaName, true) )
                return subObj.Display.DisplayRoot;
            else 
                return null;
        }

        return null;
    }
}

FTVPCanvasProxy.prototype.parseCtrlName = function(name){
    "use strict";

    if( !name || name === "" )
        return null;

    var areaName = null;
    var displayName = null;
    var ctrlName = null;

    var areaPos = name.indexOf("::");
    var displayPos = name.lastIndexOf("/");

    if( areaPos > -1 ){
        areaName = name.substr(0, areaPos);
        //if( areaName[0]=== "/")
        //    areaName = areaName.substr(1);
        areaPos += 2;
        if( displayPos > -1 ){
            displayName = name.substr(areaPos, displayPos-areaPos);
            ctrlName = name.substr(displayPos+1);
        }
        else{
            ctrlName = name.substr(areaPos)
        }
    }
    else{
        if( displayPos > -1){
            displayName = name.substr( 0, displayPos);
            ctrlName = name.substr(displayPos+1);
        }
        else{
            ctrlName = name;
        }
    }    

    return {AreaName: areaName, DisplayName: displayName, CtrlName: ctrlName};
};

/*****************************************************************
Concrete classes of proxy object for Button control
*****************************************************************/
ButtonProxy = function(ctrl) {
    "use strict";

    if (ctrl == null)
        throw TypeError();

    FTViewPointGfxProxy.apply(this, arguments);
};
ButtonProxy.prototype = inherit(FTViewPointGfxProxy.prototype);
ButtonProxy.prototype.constructor = ButtonProxy;

ButtonProxy.prototype._translateEvent = function(eventName) {
    "use strict";

    var eventType = this._getEventType(eventName);

    if (!eventType)
        return null;

    var eventDispatcher;
    if (eventType === 'MouseEvents' && eventName === 'click') {
        eventDispatcher = this.dispatchMouseClickEvent;
    }
    else {
        return FTViewPointGfxProxy.prototype._translateEvent.apply(this, arguments);
    }
    return {
        srcEventName: eventName,
        destEventName: eventName,
        handler: eventDispatcher
    };
};

ButtonProxy.prototype.dispatchMouseClickEvent = function(htmlElem, eventName, data){
    "use strict";

    this._dispatchMouseEvent(null, 'mouseover',data);
    this._dispatchMouseEvent(null, 'mousedown',data);
    this._dispatchMouseEvent(null, 'pressup',data);
};


//Demo 
//Construct constructor map
//var ctorMap = {};

//ctorMap['MaintainedButton'] = ButtonProxy;
//ctorMap['InterlockedButton'] = ButtonProxy;
//ctorMap['MultistateButton'] = ButtonProxy;
//ctorMap['MomentaryButton'] = ButtonProxy;
//ctorMap['RampButton'] = ButtonProxy;
//ctorMap['SEButton'] = ButtonProxy;
//ctorMap['CloseButton'] = ButtonProxy;

//initialize CanvasProxy instance
//var canvasProxy = new FTVPCanvasProxy( new ProxyObjFactory(ctorMap));

//canvasProxy.dispatchMouseEvent('InterlockedPushButton2', 'click');
//canvasProxy.dispatchMouseEvent('MaintainedPushButton1', 'click');
//canvasProxy.dispatchMouseEvent('MultistatePushButton1', 'click');
//canvasProxy.dispatchMouseEvent('MomentaryPushButton1', 'click');
//canvasProxy.dispatchMouseEvent('CloseDisplayButton3', 'click');


/*****************************************************************
Concrete classes of proxy object for NumericInput/StringInput control
*****************************************************************/
TextInputProxy = function(ctrl) {
    "use strict";

    if (ctrl == null)
        throw TypeError();

    FTViewPointGfxProxy.apply(this, arguments);
};
TextInputProxy.prototype = inherit(FTViewPointGfxProxy.prototype);
TextInputProxy.prototype.constructor = TextInputProxy;
TextInputProxy.prototype._translateProperty = function(propertyName, isSet) {
    "use strict";

    if (isSet) {
        
        //[20160427 Kyle Fan] Change the "TextInputProxy" set Value Property defination to "Caption" and add "Caption" defination for read showing value from "TextInputProxy".
        switch (propertyName) {
            case 'Caption':
                return {
                    srcEventName: propertyName,
                    destEventName: 'Value',
                    handler: this.changeValue
                };
        }
        return null;

    } else {
        switch (propertyName) {
            case 'Caption':
                return {
                    srcEventName: propertyName,
                    destEventName: 'DisplayText',
                    handler: this._getPropertyValue
                };
        }
        return null;
        //return FTViewPointGfxProxy.prototype._translateProperty.apply(this, arguments);
    }
};

TextInputProxy.prototype.changeValue = function(propertyName, target, value) {
    this._dispatchMouseEvent(null, 'mouseover');
    this._dispatchMouseEvent(null, 'mousedown');
    this._dispatchMouseEvent(null, 'pressup');
    
    //var htmlElem = '#datainput';
    //this._dispatchMouseEvent(htmlElem, 'click');
    //this._dispatchMouseEvent(htmlElem, 'dbclick');

    //$(htmlElem).val(value);

    //this._dispatchKeyboardEvent(null, 'keydown', 13);
    
    //[201512 Kyle] Update for mobile compatiblity.
    if (!this._IsMobile()){
        var htmlElem = '#datainput';
        this._dispatchMouseEvent(htmlElem, 'click');
        this._dispatchMouseEvent(htmlElem, 'dbclick');
        $(htmlElem).val(value);
        this._dispatchKeyboardEvent(null, 'keydown', 13);
    }else{
        switch (getFunctionName(target.constructor)) {
            case 'StringInput':
        var htmlElem = '#ScratchpadRoot #Input';
        var buttonElem = 'div#ScratchpadRoot button:first';
        break;
            case 'NumericInput':
        var htmlElem = '#KeypadRoot #Input';
        var buttonElem = 'div#KeypadRoot button:first';
        break;
        }
        this._dispatchMouseEvent(htmlElem, 'click');
        this._dispatchMouseEvent(htmlElem, 'dbclick');
        //wait for keypad or scratchpad to popup
        setTimeout(function() { $(htmlElem).val(value); $(buttonElem).trigger('click');}, 1000)
    };
};

//Demo 
/* //Construct constructor map.
var ctorMap = {};
ctorMap['NumericInput'] = TextInputProxy;
ctorMap['StringInput'] = TextInputProxy;

//initialize CanvasProxy instance.
var canvasProxy = new FTVPCanvasProxy( new ProxyObjFactory(ctorMap));

//set 'Value' property of NumericInput/StringInput control using mouse operation simulation.
var succeed = canvasProxy.setProperty('NumericInput1', 'Value', '22');
var succeed = canvasProxy.setProperty('StringInput1', 'Value', 'bbb');

//set 'DisplayValue' property of NumericInput/StringInput control.
var succeed = canvasProxy.setProperty('NumericInput1', 'DisplayValue', '33');
var succeed = canvasProxy.setProperty('StringInput1', 'DisplayValue', 'ccc');

//get 'DisplayValue' property of NumericInput/StringInput control.
var numericDisplayText = canvasProxy.getProperty('NumericInput1', 'DisplayValue');
var stringDisplayText = canvasProxy.getProperty('StringInput1', 'DisplayValue');

//Print
console.log(numericDisplayText);
console.log(stringDisplayText);
 */

 // Copyright Rockwell Automation Technologies, Inc.
// All Rights Reserved.

/*****************************************************************
Concrete classes of proxy object for NumericDisplay/StringDisplay/TagLabel control
*****************************************************************/
TextDisplayProxy = function(ctrl) {
    if (ctrl == null)
        throw TypeError();

    FTViewPointGfxProxy.apply(this, arguments);
};
TextDisplayProxy.prototype = inherit(FTViewPointGfxProxy.prototype);
TextDisplayProxy.prototype.constructor = TextDisplayProxy;
TextDisplayProxy.prototype._translateProperty = function(propertyName, isSet){
    "use strict";

    if (isSet) {
        return FTViewPointGfxProxy.prototype._translateProperty.apply(this, arguments);
    } else {
        switch (propertyName) {
            case 'Caption':
                return {
                    srcEventName: propertyName,
                    destEventName: 'DisplayText',
                    handler: this._getPropertyValue
                };
        }
        return null;
    }    
};

/* //Demo 
//Construct constructor map.
var ctorMap = {};
ctorMap['NumericDisplay'] = TextDisplayProxy;
ctorMap['StringDisplay'] = TextDisplayProxy;
ctorMap['TagLabel'] = TextDisplayProxy;

//initialize CanvasProxy instance.
var canvasProxy = new FTVPCanvasProxy( new ProxyObjFactory(ctorMap));

//get 'DisplayValue' property of NumericDisplay/StringDisplay/TagLabel control.
var numericDisplayText = canvasProxy.getProperty('NumericDisplay1', 'DisplayValue');
var stringDisplayText = canvasProxy.getProperty('StringDisplay1', 'DisplayValue');
var tagLabelDisplayText = canvasProxy.getProperty('TagLabel1', 'DisplayValue');

//set 'DisplayValue' property of NumericDisplay/StringDisplay/TagLabel control.
var succeed = canvasProxy.setProperty('NumericDisplay1', 'DisplayValue', '22');
succeed = canvasProxy.setProperty('StringDisplay1', 'DisplayValue', 'abc');
succeed = canvasProxy.setProperty('TagLabel1', 'DisplayValue', '22');

//Print 
console.log(numericDisplayText);
console.log(stringDisplayText);
console.log(tagLabelDisplayText);
*/

/*****************************************************************
Concrete classes of proxy object for Text control
*****************************************************************/
TextProxy = function(ctrl) {
    if (ctrl == null)
        throw TypeError();

    FTViewPointGfxProxy.apply(this, arguments);
};
TextProxy.prototype = inherit(FTViewPointGfxProxy.prototype);
TextProxy.prototype.constructor = TextProxy;
TextProxy.prototype._translateProperty = function(propertyName, isSet){
    "use strict";

    if (isSet) {
        switch (propertyName) {
            case 'Caption':
                return {
                    srcEventName: propertyName,
                    destEventName: 'Caption',
                    handler: this._setPropertyValue
                };
                break;
            case 'Canvas.Left':
                return {
                    srcEventName: propertyName,
                    destEventName: '_dependValues.Canvas.Left',
                    handler: this._setPropertyValue
                };
                break;
            case 'Canvas.Top':
                return {
                    srcEventName: propertyName,
                    destEventName: '_dependValues.Canvas.Top',
                    handler: this._setPropertyValue
                };
                break;
        }
        return null;
    } else {
        switch (propertyName) {
            case 'Caption':
                return {
                    srcEventName: propertyName,
                    destEventName: 'Caption',
                    handler: this._getPropertyValue
                };
                break;
            case 'Canvas.Left':
                return {
                    srcEventName: propertyName,
                    destEventName: '_dependValues.Canvas.Left',
                    handler: this._getPropertyValue
                };
                break;
            case 'Canvas.Top':
                return {
                    srcEventName: propertyName,
                    destEventName: '_dependValues.Canvas.Top',
                    handler: this._getPropertyValue
                };
                break;
        }
        return null;
    }
};

/* //Demo 
//Construct constructor map.
var ctorMap = {};
ctorMap['Text'] = TextProxy;


//initialize CanvasProxy instance.
var canvasProxy = new FTVPCanvasProxy( new ProxyObjFactory(ctorMap));

//get caption of Text control.
var textDisplayText = canvasProxy.getProperty('Text1', 'caption');

//get 'Canvas.Left' property of Text control.
var textDisplayText = canvasProxy.getProperty('Text1', 'Canvas.Left');

//get other properties of Text control.
var textDisplayText = canvasProxy.getProperty('Text1', '_Width');

//set caption of Text control.
var textDisplayText = canvasProxy.setProperty('Text1', 'caption', 'bbb');

//set 'Canvas.Left' property of Text control.
var textDisplayText = canvasProxy.setProperty('Text1', 'Canvas.Left', '70');

//set other properties of Text control.
var textDisplayText = canvasProxy.setProperty('Text1', '_Width', '60');

//Print 
console.log(textDisplayText);

*/

/*****************************************************************
Concrete classes of proxy object for starndard gfx control
*****************************************************************/
StandardGfxProxy = function(ctrl) {
    "use strict";

    if (ctrl == null)
        throw TypeError();

    FTViewPointGfxProxy.apply(this, arguments);
};
StandardGfxProxy.prototype = inherit(FTViewPointGfxProxy.prototype);
StandardGfxProxy.prototype.constructor = StandardGfxProxy;


//Demo 
//if(!ctorMap)
//    ctorMap = {};

// ctorMap['Scale'] = StandardGfxProxy;
// ctorMap['PanelControl'] = StandardGfxProxy;
// ctorMap['LocalMessageDisplay'] = StandardGfxProxy;
// ctorMap['BarGraphControl'] = StandardGfxProxy;
// ctorMap['ImageControl'] = StandardGfxProxy;
// ctorMap['TimeAndDateControl'] = StandardGfxProxy;

//initialize CanvasProxy instance
//var canvasProxy = new FTVPCanvasProxy( new ProxyObjFactory(ctorMap));
//var majorTicks = canvasProxy.getProperty( "Scale1", "MajorTicks");
//console.log( majorTicks );
//var visibile = canvasProxy.getProperty( "Panel1", "Visibility");
//console.log( visibile );
//var displayValue = canvasProxy.getProperty( "LocalMessageDisplay1", "DisplayValue");
//console.log( displayValue );
//var value = canvasProxy.getProperty( "BarGraph1", "Value");
//console.log( value );
//var thresholdValues = canvasProxy.getProperty( "BarGraph1", "ThresholdValues");
//console.log( thresholdValues );
//var min = canvasProxy.getProperty( "BarGraph1", "MinValue");
//console.log( min );
//var max = canvasProxy.getProperty( "BarGraph1", "MaxValue");
//console.log( max );
//var source = canvasProxy.getProperty( "Image1", "Source");
//console.log( source );


/*****************************************************************
Concrete classes of proxy object for NumericDisplayME/StringDisplayME control
*****************************************************************/
TextDisplayMEProxy = function(ctrl) {
    if (ctrl == null)
        throw TypeError();
    FTViewPointGfxProxy.apply(this, arguments);
};

TextDisplayMEProxy.prototype = inherit(FTViewPointGfxProxy.prototype);
TextDisplayMEProxy.prototype.constructor = TextDisplayProxy;
TextDisplayMEProxy.prototype._translateProperty = function(propertyName, isSet) {
    "use strict";
    
    if (isSet) {
        //return FTViewPointGfxProxy.prototype._translateProperty.apply(this, arguments);
        switch (propertyName) {
            case 'Caption':
                return {
                    srcEventName: propertyName,
                    destEventName: 'm_DisplayValue',
                    handler: this._setPropertyValue
                };
                break;
        }
        return null;
    } else {
        switch (propertyName) {
            case 'Caption':
                return {
                    srcEventName: propertyName,
                    // [20160308 Ian] Fix the issue while "Fill Left with" is set, the "m_DisplayValue" isn't the value output on web page.
                    //destEventName: 'm_DisplayValue',
                    destEventName: 'm_textElement.Caption',
                    handler: this._getPropertyValue
                };
                break;
        }
        return null;
    }
};


TextDisplayMEProxy.prototype._getPropertyValue = function(propertyName, gfxCtrl) {
    "use strict";

    if (gfxCtrl == null)
        throw new Error("gxfObj can't be null");

    if (propertyName == null)
        throw new Error("propertyName can't be null");

    try {
        var parts = propertyName.split('.');
        var root = gfxCtrl;
        var index = 0;
        var currentPart = parts[index];
        if (currentPart in root) {
            root = root[currentPart];
            ++index;
            if (index < parts.length) {
                var nextPart = parts[index];
                for (var i = index + 1; i < parts.length; ++i) {
                    nextPart += '.' + parts[i];
                }
                return this._getPropertyValue(nextPart, root);
            } else {
                //Modified by Nicholas on 9-7-2015. Special for StringDisplayME's String Object. Also can work on NumericDisplayME.
                //Modified by Kyle on 2-2-2016, in order to return primitive value of object instead of object itself when object is null.
                return root.valueOf();
                
                //if (root.valueOf()) {
                  //  return root.valueOf();
                //}
                //return root;
            }
        } else {
            for (var i = index + 1; i < parts.length; ++i) {
                currentPart += '.' + parts[i];
                if(currentPart in root) {
                    root = root[currentPart];
                    index = i + 1;
                    if(index < parts.length) {
                        var nextPart = parts[index];
                        for (var i = index + 1; i < parts.length; ++i) {
                            nextPart += '.' + parts[i];
                        }
                        return this._getPropertyValue(nextPart, root);
                    } else {
                        //Modified by Nicholas on 9-7-2015. Special for StringDisplayME's String Object. Also can work on NumericDisplayME.
                        if (root.valueOf()) {
                            return root.valueOf();
                        }
                        return root;
                    }
                } else {
                    continue;
                }
            }
            return undefined;
        }
    } catch (e) {
        console.log(e.stack);
        return false;
    }
};


TextDisplayMEProxy.prototype._setPropertyValue = function(propertyName, gfxCtrl, value) {
    "use strict";

    if (gfxCtrl == null)
        throw new Error("gxfObj can't be null");

    if (propertyName == null)
        throw new Error("propertyName can't be null");
   
    try {

        var parts = propertyName.split('.');
        var root = gfxCtrl;
        var index = 0;
        var currentPart = parts[index];
        if (currentPart in root) {
            if (index < parts.length - 1) {
                root = root[currentPart];
                ++index;
                var nextPart = parts[index];
                for (var i = index + 1; i < parts.length; ++i) {
                    nextPart += '.' + parts[i];
                }
                return this._setPropertyValue(nextPart, root, value);
            } else {
                //Modified by Nicholas on 9-7-2015. Judge whether the control is StringDisplayME and the property is m_DisplayValue, because it save the value as String Object(char array).
                if (root.constructor.name === 'StringDisplayME') {
                    if (currentPart === 'm_DisplayValue') {
                        var newValue = new String(value);
                        root[currentPart] = newValue;
                        return true;
                    }
                }
                root[currentPart] = value;
                return true;
            }
        } else {
            for (var i = index + 1; i < parts.length; ++i) {
                currentPart += '.' + parts[i];
                if(currentPart in root) {
                    if(i < parts.length - 1) {
                        root = root[currentPart];
                        index = i + 1;
                        var nextPart = parts[index];
                        for (var i = index + 1; i < parts.length; ++i) {
                            nextPart += '.' + parts[i];
                        }
                        return this._setPropertyValue(nextPart, root, value);
                    } else {
                        //Modified by Nicholas on 9-7-2015. Judge whether the control is StringDisplayME and the property is m_DisplayValue, because it save the value as String Object(char array).
                        if (root.constructor.name === 'StringDisplayME') {
                            if (currentPart === 'm_DisplayValue') {
                                var newValue = new String(value);
                                root[currentPart] = newValue;
                                return true;
                            }
                        }
                        root[currentPart] = value;
                        return true;
                    }
                } else {
                    continue;
                }
            }
            return false;
        }
        
    } catch (e) {
        console.log(e.stack);
        return false;
    }
};
/* //Demo
//Construct constructor map.
var ctorMap = {};
ctorMap['NumericDisplayME'] = TextDisplayMEProxy;
ctorMap['StringDisplayME'] = TextDisplayMEProxy;

//initialize CanvasProxy instance.
var canvasProxy = new FTVPCanvasProxy(new ProxyObjFactory(ctorMap));

//get 'DisplayValue' property of NumericDisplayME/StringDisplayME control.
var numericDisplayMEText = canvasProxy.getProperty('NumericDisplay1', 'caption');
var stringDisplayMEText = canvasProxy.getProperty('StringDisplay1', 'caption');


//set 'DisplayValue' property of NumericDisplayME/StringDisplayME control.
var succeed = canvasProxy.setProperty('NumericDisplay1', 'caption', '22');
succeed = canvasProxy.setProperty('StringDisplay1', 'caption', 'abc');

//Print
console.log(numericDisplayMEText);
console.log(stringDisplayMEText);
*/

/*****************************************************************
Concrete classes of proxy object for NumericInputEnable control
*****************************************************************/
NumericInputEnableProxy = function(ctrl) {
    "use strict";

    if (ctrl == null)
        throw TypeError();

    FTViewPointGfxProxy.apply(this, arguments);
};
NumericInputEnableProxy.prototype = inherit(FTViewPointGfxProxy.prototype);
NumericInputEnableProxy.prototype.constructor = NumericInputEnableProxy;
NumericInputEnableProxy.prototype._translateProperty = function(propertyName, isSet) {
    "use strict";

    if (isSet) {
        switch (propertyName) {
            //_dependValues.318.Caption._text
            case 'Caption':
                return {
                    srcEventName: propertyName,
                    destEventName: '_dependValues.318.Caption._text',
                    handler: this.changeValue
                };
        }
        return null;

    } else {
        switch (propertyName) {
            //_dependValues.318.Caption._text
            case 'Caption':
                return {
                    srcEventName: propertyName,
                    destEventName: '_dependValues.318.Caption._text',
                    handler: this._getPropertyValue
                };
        }
        return null;
    }
};

NumericInputEnableProxy.prototype._dispatchKeyboardEvent = function(htmlElem, eventName, kCode, data) {
    "use strict";

    var ctrl = htmlElem ? $(htmlElem) : this;

    if (ctrl == null)
        return false;

    if (htmlElem) {
        var e = jQuery.Event(eventName, {
            keyCode: kCode
        });
        jQuery.event.trigger(e, null, ctrl); 
    } else {
        var easelObject = this._getEaselObj(data);

        if (!easelObject)
            throw new Error("can't find EaselObject");

        var keyEvent = this._createEvent(easelObject, eventName, {
            keyCode: kCode
        });

        __document__index__.dispatchEvent(keyEvent);
    }

    return true;
};

NumericInputEnableProxy.prototype.changeValue = function(propertyName, target, value) {
    this._dispatchMouseEvent(null, 'mouseover');
    this._dispatchMouseEvent(null, 'mousedown');
    this._dispatchMouseEvent(null, 'pressup');

    var htmlElem = '#Input';
    this._dispatchMouseEvent(htmlElem, 'click');
    this._dispatchMouseEvent(htmlElem, 'dbclick');

    $(htmlElem).val(value);
    target.m_pad.StringValue = value;

    var that = this;
    //Nicholas on 9-11-2015. Since the JS background are blocked by this JS, so it need to call setTimeout to asynchronous run and release the blocked background process.
    function callback() {
        that._dispatchKeyboardEvent(null, 'keydown', 13);
    };

    window.setTimeout(callback,500);
    this._dispatchMouseEvent(null, 'mouseout');
};
//Demo
// if(!ctorMap)
    // ctorMap = {};
// ctorMap['NumericInputEnable'] = NumericInputEnableProxy;

//Set and Get functions
/*var numericInputEnableText = canvasProxy.getProperty('NumericInputEnable1', 'caption');
console.log(numericInputEnableText);
succeed = canvasProxy.setProperty('NumericInputEnable1', 'caption', '88');
numericInputEnableText = canvasProxy.getProperty('NumericInputEnable1', 'caption');
console.log(numericInputEnableText);*/

/*****************************************************************
Concrete classes of proxy object for NumericInputCursorPoint control
*****************************************************************/
NumericInputCursorPointProxy = function(ctrl) {
    "use strict";

    if (ctrl == null)
        throw TypeError();

    FTViewPointGfxProxy.apply(this, arguments);
};
NumericInputCursorPointProxy.prototype = inherit(FTViewPointGfxProxy.prototype);
NumericInputCursorPointProxy.prototype.constructor = NumericInputCursorPointProxy;
NumericInputCursorPointProxy.prototype._translateProperty = function(propertyName, isSet) {
    "use strict";

    if (isSet) {
        switch (propertyName) {
            //_dependValues.313.CaptionOnPad
            case 'Caption':
                return {
                    srcEventName: propertyName,
                    destEventName: '_dependValues.313.CaptionOnPad',
                    handler: this.changeValue
                };
        }
        return null;

    } else {
        switch (propertyName) {
            //_dependValues.313.CaptionOnPad
            // [20160420 by Kyle Fan] Redirect to property "m+_input.Caption"
            case 'Caption':
                return {
                    srcEventName: propertyName,
                    //destEventName: '_dependValues.313.CaptionOnPad',
                    destEventName: 'm_input.Caption',
                    handler: this._getPropertyValue
                };
        }
        return null;
    }
};

NumericInputCursorPointProxy.prototype._dispatchKeyboardEvent = function(htmlElem, eventName, kCode, data) {
    "use strict";

    var ctrl = htmlElem ? $(htmlElem) : this;

    if (ctrl == null)
        return false;

    if (htmlElem) {
        var e = jQuery.Event(eventName, {
            keyCode: kCode
        });
        jQuery.event.trigger(e, null, ctrl); 
    } else {
        var easelObject = this._getEaselObj(data);

        if (!easelObject)
            throw new Error("can't find EaselObject");

        var keyEvent = this._createEvent(easelObject, eventName, {
            keyCode: kCode
        });

        __document__index__.dispatchEvent(keyEvent);
    }

    return true;
};

NumericInputCursorPointProxy.prototype.changeValue = function(propertyName, target, value) {
    this._dispatchMouseEvent(null, 'mouseover');
    this._dispatchMouseEvent(null, 'mousedown');
    this._dispatchMouseEvent(null, 'pressup');

    var htmlElem = '#Input';
    this._dispatchMouseEvent(htmlElem, 'click');
    this._dispatchMouseEvent(htmlElem, 'dbclick');

    $(htmlElem).val(value);
    target.m_pad.StringValue = value;

    var that = this;
    //Nicholas on 9-11-2015. Since the JS background are blocked by this JS, so it need to call setTimeout to asynchronous run and release the blocked background process.
    function callback() {
        that._dispatchKeyboardEvent(null, 'keydown', 13);
    };

    window.setTimeout(callback,500);
    this._dispatchMouseEvent(null, 'mouseout');
};
//Demo
// if(!ctorMap)
    // ctorMap = {};
// ctorMap['NumericInputCursorPoint'] = NumericInputCursorPointProxy;

//Set and Get functions
/*var NumericInputCursorPointText = canvasProxy.getProperty('NumericInputCursorPoint1', 'caption');
console.log(NumericInputCursorPointText);
succeed = canvasProxy.setProperty('NumericInputCursorPoint1', 'caption', '20');
NumericInputCursorPointText = canvasProxy.getProperty('NumericInputCursorPoint1', 'caption');
console.log(NumericInputCursorPointText);*/
/*****************************************************************
Concrete classes of proxy object for StringInputEnable control
*****************************************************************/
StringInputEnableProxy = function(ctrl) {
    "use strict";

    if (ctrl == null)
        throw TypeError();

    FTViewPointGfxProxy.apply(this, arguments);
};
StringInputEnableProxy.prototype = inherit(FTViewPointGfxProxy.prototype);
StringInputEnableProxy.prototype.constructor = StringInputEnableProxy;
StringInputEnableProxy.prototype._translateProperty = function(propertyName, isSet) {
    "use strict";

    if (isSet) {
        switch (propertyName) {
            //_dependValues.335.CaptionOnPad
            case 'Caption':
                return {
                    srcEventName: propertyName,
                    destEventName: '_dependValues.335.CaptionOnPad',
                    handler: this.changeValue
                };
        }
        return null;

    } else {
        switch (propertyName) {
            //_dependValues.335.CaptionOnPad
            case 'Caption':
                return {
                    srcEventName: propertyName,
                    destEventName: '_dependValues.335.CaptionOnPad',
                    handler: this._getPropertyValue
                };
        }
        return null;
    }
};

StringInputEnableProxy.prototype._dispatchKeyboardEvent = function(htmlElem, eventName, kCode, data) {
    "use strict";

    var ctrl = htmlElem ? $(htmlElem) : this;

    if (ctrl == null)
        return false;

    if (htmlElem) {
        var e = jQuery.Event(eventName, {
            keyCode: kCode
        });
        jQuery.event.trigger(e, null, ctrl); 
    } else {
        var easelObject = this._getEaselObj(data);

        if (!easelObject)
            throw new Error("can't find EaselObject");

        var keyEvent = this._createEvent(easelObject, eventName, {
            keyCode: kCode
        });

        __document__index__.dispatchEvent(keyEvent);
    }

    return true;
};

StringInputEnableProxy.prototype.changeValue = function(propertyName, target, value) {
    this._dispatchMouseEvent(null, 'mouseover');
    this._dispatchMouseEvent(null, 'mousedown');
    this._dispatchMouseEvent(null, 'pressup');


    //While opened the input is empty, it's no necessary to double click.
    var that = this;
    
    
    function callbackAsign() {
        //Must Asynchronous.
        var dlg = $("#ScratchpadRoot");
        dlg.find('#Input').val(value);
    }
    window.setTimeout(callbackAsign,500);
    
    //Nicholas on 9-11-2015. Since the JS background are blocked by this JS, so it need to call setTimeout to asynchronous run and release the blocked background process.
    function callbackFocus() {
        var htmlElem = '#Input';
        that._dispatchMouseEvent(htmlElem, 'mouseover');
        that._dispatchMouseEvent(htmlElem, 'mousedown');
        that._dispatchMouseEvent(htmlElem, 'mouseup');
    };

    window.setTimeout(callbackFocus,500);
    
    function callbackKeyDown() {
        //Call $scope.Input_KeyPressed of scratchPadContent to fire enter key.
        var e = jQuery.Event("keypress");
        e.which = 13;
        e.keyCode = 13;
        e.charCode = 0;
        e.key = 13;
        ajaxResultPost(e);

    };

    window.setTimeout(callbackKeyDown,500);

};
//Add by Nicholas on 9/16/2015. Function to call $scope.Input_KeyPressed of scratchPadContent to set Input Value.
ajaxResultPost = function(e) {
    var scope = angular.element(
    __document__index__.
    getElementById("scratchPadContent")).
    scope();
    scope.$apply(function () {
        scope.Input_KeyPressed(e);
    });
}

//Demo
// if(!ctorMap)
    // ctorMap = {};
// ctorMap['StringInputEnable'] = StringInputEnableProxy;

//Set and Get functions
/* var stringInputEnableText = canvasProxy.getProperty('StringInputEnable1', 'caption');
console.log(stringInputEnableText);
succeed = canvasProxy.setProperty('StringInputEnable1', 'caption', 'HiHi');
stringInputEnableText = canvasProxy.getProperty('StringInputEnable1', 'caption');
console.log(stringInputEnableText); */


/*****************************************************************
Concrete classes of proxy object for ListSelectorProxy
*****************************************************************/

ListSelectorProxy = function(ctrl) {
    "use strict";

    if (ctrl == null)
        throw TypeError();

    FTViewPointGfxProxy.apply(this, arguments);
};
ListSelectorProxy.prototype = inherit(FTViewPointGfxProxy.prototype);
ListSelectorProxy.prototype.constructor = ListSelectorProxy;

ListSelectorProxy.prototype._translateProperty = function(propertyName, isSet) {
    "use strict";

    if (isSet) {
        switch (propertyName) {
            case 'SelectedIndex':
                return {
                    srcEventName: propertyName,
                    destEventName: propertyName,
                    handler: this._changeIndexValue
                };
        }
        return null;

    } else {
        return FTViewPointGfxProxy.prototype._translateProperty.apply(this, arguments);
    }
};

ListSelectorProxy.prototype._changeIndexValue = function(propertyName, target, value) {
    "use strict";

        //For ListSelector we need to fire click event on list item 
        //to simulate the change index value event.
        this._fireChildEvent(null, 'click', value);
        if(this.gfxCtrl.constructor.name === 'ControlListSelector')
            this._dispatchKeyboardEvent(null, 'keydown', 13, value);
};

ListSelectorProxy.prototype._fireChildEvent = function(ctrl, eventName, value ){
    "use strict";
    
    var easelObject = this._getEaselObj(null);
    if (!easelObject)
        throw new Error("can't find EaselObject");;

    var x = 0,
        y = 0;

    var event = this._createEvent(easelObject, eventName, {
        pointerX: x,
        pointerY: y,
        button: 0
    });

    var easelEvt = new createjs.MouseEvent(
        eventName, true, false, x, y, event, -1, -1 == window._primaryPointerID, x, y);
    //The display items are in EaselObject stage children[7]
    //If we want to change the selected item
    //we need to fire click event on children items.

    function getListContainer(obj_stage) {

        for(var index = 0; obj_stage.children.length && index < obj_stage.children.length; index++) {

            if(obj_stage.children[index].name == 'ListContainer')
                return obj_stage.children[index];
        }
        return null;
    };
    
    var listContainer = getListContainer(easelObject.stage);
    if(listContainer != null && value != null)
        listContainer.children[value].dispatchEvent( easelEvt );
    else
        easelObject.stage.dispatchEvent( easelEvt ); 
};

ListSelectorProxy.prototype._translateEvent = function(eventName) {
    "use strict";

    var eventType = this._getEventType(eventName);

    if (!eventType)
        return null;

    var eventDispatcher;
    if (eventType === 'MouseEvents')
        eventDispatcher = this.dispatchListMouseEvent;
    else if (eventType === 'KeyboardEvent') {
        eventDispatcher = this.dispatchListKeyboardEvent;  
    }
    else {
        return FTViewPointGfxProxy.prototype._translateEvent.apply(this, arguments);
    }
    return {
        srcEventName: eventName,
        destEventName: eventName,
        handler: eventDispatcher
    };
};

ListSelectorProxy.prototype.dispatchListMouseEvent = function(htmlElem, eventName, data){
    "use strict";

    switch(eventName) {
        case 'mouseover':
            //first clear all mouseover highlight items
            //if not there will be several highlight items if you don't fire mouseout after mouseover
            //so this helps to clear all highlight items before fire mouseover
            var items = this.getProperty('NumberOfStates');
            for(var i = 0; i < items; i++) {
                this._fireChildEvent(null, 'mouseover', i);
                this._fireChildEvent(null, 'mouseout', i);  
            }
            //fire mouseover event
            this._fireChildEvent(null, 'mouseover', data); 
            break;
        case 'mouseout':
            //if several items are highlighted
            //you can only fire mouse out with one item and others will not response
            //so before fire mouseout, fire mouseover to activate it.
            this._fireChildEvent(null, 'mouseover', data);
            this._fireChildEvent(null, 'mouseout', data);
            break;
        default:
            this._fireChildEvent(null, eventName, data);
            break;
    }
};

ListSelectorProxy.prototype.dispatchListKeyboardEvent = function(htmlElem, eventName, kCode, data){
    "use strict";

    this._fireChildEvent(null, 'click', null);
    this._dispatchKeyboardEvent(null, eventName, kCode, data);

};


//Construct constructor map
// var ctorMap = {};

// ctorMap['DisplayListSelectorControl'] = ListSelectorProxy;
// ctorMap['ControlListSelector'] = ListSelectorProxy;

// var canvasProxy = new FTVPCanvasProxy( new ProxyObjFactory(ctorMap));


// var selectedIndex = canvasProxy.getProperty('DisplayListSelector1','SelectedIndex');
// var indexCaption  = canvasProxy.getProperty('DisplayListSelector1','SelectedItem.Caption');
// console.log(selectedIndex);
// console.log(indexCaption);
// canvasProxy.setProperty('DisplayListSelector1','SelectedIndex',3);

// canvasProxy.dispatchMouseEvent('DisplayListSelector1','mouseover',1);
// canvasProxy.dispatchMouseEvent('DisplayListSelector1','mouseout',1);
// canvasProxy.dispatchMouseEvent('DisplayListSelector1','click',3);
// //keycode 38 is up and 40 is down
// canvasProxy.dispatchKeyboardEvent('DisplayListSelector1','keydown', 38, null);
// canvasProxy.dispatchKeyboardEvent('DisplayListSelector1','keydown', 40, null);


// var selectedIndex = canvasProxy.getProperty('ControlListSelector1','SelectedIndex');
// var indexCaption  = canvasProxy.getProperty('ControlListSelector1','SelectedItem.Caption');
// console.log(selectedIndex);
// console.log(indexCaption);

// canvasProxy.setProperty('ControlListSelector1','SelectedIndex',2);

// canvasProxy.dispatchMouseEvent('ControlListSelector1','mouseover',0);
// canvasProxy.dispatchMouseEvent('ControlListSelector1','mouseout',0);
// canvasProxy.dispatchMouseEvent('ControlListSelector1','click',3);
// use keyboard to select the list items
// //keycode 38 is up and 40 is down
// canvasProxy.dispatchKeyboardEvent('ControlListSelector1','keydown', 38, null);
// canvasProxy.dispatchKeyboardEvent('ControlListSelector1','keydown', 40, null);

/*****************************************************************
Concrete classes of proxy object for IndicatorProxy
*****************************************************************/

IndicatorProxy = function(ctrl) {
    "use strict";

    if (ctrl == null)
        throw TypeError();

    FTViewPointGfxProxy.apply(this, arguments);
};
IndicatorProxy.prototype = inherit(FTViewPointGfxProxy.prototype);
IndicatorProxy.prototype.constructor = IndicatorProxy;

IndicatorProxy.prototype._translateProperty = function(propertyName, isSet) {
    "use strict";

    if (isSet) {
        switch (propertyName) {
            case 'SelectedIndex':
                return {
                    srcEventName: propertyName,
                    destEventName: propertyName,
                    handler: this._changeIndexValue
                };
        };
        return FTViewPointGfxProxy.prototype._translateProperty.apply(this, arguments);
    } else {
        switch (propertyName) {
            case 'SelectedItem':
                return {
                    srcEventName: propertyName,
                    destEventName: propertyName,
                    handler: this._getItemCaption
                };
        };
        return FTViewPointGfxProxy.prototype._translateProperty.apply(this, arguments);
    }
};


IndicatorProxy.prototype._changeIndexValue = function(propertyName, target, value) {
    "use strict";
    // Ian, 20160202 Update for IE11 compatibility, change the way to get control type
    var ctrlType=this.gfxCtrl.constructor.name;
    if(!ctrlType){
	   ctrlType=getFunctionName(this.gfxCtrl.constructor);
    };
    switch (ctrlType) {
        case 'ListIndicatorControl':
            this.gfxCtrl.SetSelectedState(value);
            break;
        case 'MultistateIndicator':
            this.gfxCtrl.SetVisualState(value); 
            break; 
        default:
            break;
    };
};


IndicatorProxy.prototype._getItemCaption = function() {
    "use strict";
    // Ian, 20160202 Update for IE11 compatibility, change the way to get control type
    var ctrlType=this.gfxCtrl.constructor.name;
    if(!ctrlType){
	   ctrlType=getFunctionName(this.gfxCtrl.constructor);
    };
    switch (ctrlType) {
        case 'ListIndicatorControl':
            return this.gfxCtrl.SelectedItem.Caption;
        case 'MultistateIndicator':
            var selectedIndex = this._getPropertyValue('m_currentVisualStateIndex',this.gfxCtrl); 
            var stateButton   = this.gfxCtrl.StateButtons.itemArray[selectedIndex];
            // [20151221 Ian] Update for IE compatibility.
            //return stateButton.m_textCav._children.itemArray[0].Caption;
            return stateButton.m_textCav._children.itemArray[0]._textBlock._Text;  
        default:
            break;
    };
};

//Construct constructor map
// var ctorMap = {};

// ctorMap['ListIndicatorControl'] = IndicatorProxy;
// ctorMap['MultistateIndicator'] = IndicatorProxy;

// var canvasProxy = new FTVPCanvasProxy( new ProxyObjFactory(ctorMap));

// canvasProxy.setProperty('ListIndicator1','SelectedIndex',3);
// var selectedIndex = canvasProxy.getProperty('ListIndicator1','SelectedIndex');
// var indexCaption  = canvasProxy.getProperty('ListIndicator1','SelectedItem');
// console.log(selectedIndex);
// console.log(indexCaption);

// canvasProxy.setProperty('MultistateIndicator1','SelectedIndex',1);
// var selectedIndex = canvasProxy.getProperty('MultistateIndicator1','m_currentVisualStateIndex');
// var indexCaption  = canvasProxy.getProperty('MultistateIndicator1','SelectedItem');
// console.log(selectedIndex);
// console.log(indexCaption);

/*****************************************************************
Concrete classes of proxy object for TouchAnimationProxy
*****************************************************************/

TouchAnimationProxy = function(ctrl) {
"use strict";

    if (ctrl == null)
        throw TypeError();

    FTViewPointGfxProxy.apply(this, arguments);
};

TouchAnimationProxy.prototype = inherit(FTViewPointGfxProxy.prototype);
TouchAnimationProxy.prototype.constructor = TouchAnimationProxy;

//Recommend to use 'mousedown' for ToucheAnimation
TouchAnimationProxy.prototype._translateEvent = function(eventName) {
    "use strict";

    var eventInfo = FTViewPointGfxProxy.prototype._translateEvent.call(this, eventName);

    switch(eventInfo.srcEventName){
        case 'click':
            eventInfo.destEventName = 'mousedown';
            break;
    }

    return eventInfo;
};


ctorMap = {};

if( !ctorMap )
    ctorMap = {};


//Button & StateButton
ctorMap['MaintainedButton'] = ButtonProxy;
ctorMap['InterlockedButton'] = ButtonProxy;
ctorMap['MultistateButton'] = ButtonProxy;
ctorMap['MomentaryButton'] = ButtonProxy;
ctorMap['SEButton'] = ButtonProxy;
ctorMap['GotoButton'] = ButtonProxy;
ctorMap['ReturnToButton'] = ButtonProxy;
ctorMap['CloseButton'] = ButtonProxy;
ctorMap['RampButton'] = ButtonProxy;
//[201512 Kyle Fan] Add for Latched Button support
ctorMap['LatchedButton'] = ButtonProxy;

//NumericString
ctorMap['NumericInput'] = TextInputProxy;
ctorMap['StringInput'] = TextInputProxy;
ctorMap['NumericDisplay'] = TextDisplayProxy;
ctorMap['StringDisplay'] = TextDisplayProxy;
ctorMap['TagLabel'] = TextDisplayProxy;
ctorMap['NumericInputEnable'] = NumericInputEnableProxy;
ctorMap['Text'] = TextProxy;
ctorMap['StringInputEnable'] = StringInputEnableProxy;
ctorMap['NumericInputCursorPoint'] = NumericInputCursorPointProxy;
ctorMap['NumericDisplayME'] = TextDisplayMEProxy;
ctorMap['StringDisplayME'] = TextDisplayMEProxy;

//List
ctorMap['DisplayListSelectorControl'] = ListSelectorProxy;
ctorMap['ControlListSelector'] = ListSelectorProxy;
ctorMap['ListIndicatorControl'] = IndicatorProxy;
ctorMap['MultistateIndicator'] = IndicatorProxy;
// [201603 Ian Wang] Add for Symbol Indiator support
ctorMap['MultiStateIndicatorControl'] = IndicatorProxy;

//Others
ctorMap['Scale'] = StandardGfxProxy;
ctorMap['PanelControl'] = StandardGfxProxy;
ctorMap['LocalMessageDisplay'] = StandardGfxProxy;
ctorMap['BarGraphControl'] = StandardGfxProxy;
ctorMap['ImageControl'] = StandardGfxProxy;
ctorMap['TimeAndDateControl'] = StandardGfxProxy;

//[201601 Kyle Fan, Rex Li] Add for Path and Group support as StandardGfxProxy. Rex changed to TouchAnimationProxy.
ctorMap['Path'] = TouchAnimationProxy;
ctorMap['Group'] = TouchAnimationProxy;

//initialize CanvasProxy instance
canvasProxy = new FTVPCanvasProxy( new ProxyObjFactory(ctorMap));
