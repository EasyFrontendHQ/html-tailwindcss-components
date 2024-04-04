// xx -- review best practices for jquery plugins
( function ( $, window, document, undefined ) {
	'use strict';

	// take a row in googl-ese json and return it as name:value pairs
	function rowToObject(cell){

		var returner = {};

		var properties = Object.getOwnPropertyNames(cell);
    // sorting is important for catching numbered properties below
    // name sure the un-numbered name is first
		properties.sort();

		properties.forEach(function(key){

			var val = cell[key].$t;

			// don't bother with empty values
			// which also means properties will not be set for empty values!
			if(val === '') return;

			if(key.substring(0,4) === 'gsx$'){
				var name = key.substr(4);

				// the only tricky thing is to turn the property value into an array
				// if the property name has variations that end in a number
				// Address, Address1, Address2... etc.
				var num = name.charAt(name.length - 1);
				if(/^\d+$/.test(num)){ // indexed propery
					name = name.substr(0, name.length - 1);
					var arr = returner[name];
          // if arr is not an array, but exists its the unnumbered value: ex. Address
          // replace its position with an array and push it in first
					if(!Array.isArray(arr)){
						returner[name] = [];
						if(arr) returner[name].push(arr);
					}
					returner[name].push(val);
				} else returner[name] = val; // the basic case for a name/value pair
			}
		});
		return returner;
	}

	$.googleSheetToJSON = function googleSheetToJSON(id, worksheet){

		var deferred = new $.Deferred();
		var url = [
			'https://spreadsheets.google.com/feeds/list',
			id,
			(worksheet || 'od6'), // od6 is the default id of the first worksheet
			'public/values?alt=json&callback=?'].join('/');

		$.getJSON(url)
			.done(function(data){
				// try to fail w/ info if we cant get any data from the sheets
				// very errorable these sheets, using a spacer row for instance
				// under the headers and boom! no data. meh.
				if(!data.feed) throw new Error('Unable to retrieve google spreadsheet JSON data for ' + url);
				if(!data.feed.entry) throw new Error('Google spreadsheet seems empty for ' + url);
				deferred.resolve(data.feed.entry.map(rowToObject));
			})
			.fail(deferred.reject);

		return deferred.promise();
	};

} )( jQuery, window, document );