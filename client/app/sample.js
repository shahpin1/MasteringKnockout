(function(app, $, ko) {

	function isWhitespaceNode(node) {
	  return !(/[^\t\n\r ]/.test(node.textContent)) && node.nodeType == 3;
	}

	ko.bindingHandlers.widthSort = {
		 init: function(element, valueAccessor) {
			// Pull out each of the child elements into an array
	        var children = [];
	        for (var i = element.children.length - 1; i >= 0; i--) {
	        	var child = element.children[i];
	        	//Don't take empty text nodes, they are not real nodes
	        	if (!isWhitespaceNode(child))
	            	children.push(child);
	        };

	        //Width calc must be done while the node is still in the DOM
	        children.sort(function(a, b) {
	        	return $(a).width() <= $(b).width() ? -1 : 1;
	        });

	        while(children.length) {
	        	//Append will remove the node if it's already in the DOM
	        	element.appendChild(children.shift());
	        }
		}
	};


	var BindingSample = function() {
		var self = this;

		self.name = ko.observable('Timothy');
	};
	
	$(document).ready(function() {
		ko.applyBindings(new BindingSample());
	});

})(window.app = window.app || {}, jQuery, ko);