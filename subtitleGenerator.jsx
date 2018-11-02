//Libraries
#include json2.js

//NOTES:
//[+] Read JSON file
//[+] Change text
//[+] Save PNG files


(function main(){
	
	var subtitlesList = loadJson('subtitles.json'); //json file source.
	var smallVerse = subtitlesList[0];

	for(var i=0;i<subtitlesList.length;i++) //For each item send to process.
	{
		var subtitle = subtitlesList[i];
		processData(subtitle, smallVerse); //Calling processData function within a parameter.
	}

})();


function processData(subtitle,smallVerse){

	var doc = app.activeDocument;

	var subtitlesGroup = doc.layerSets.getByName('subtitles');
	var themeGroup = doc.layerSets.getByName('theme');

	var verse = subtitlesGroup.layers[0];
	var upLine = subtitlesGroup.layers[2];
	var downLine = subtitlesGroup.layers[3];
	var uniqueLine = subtitlesGroup.layers[4];
	
	upLine.visible = false;
	downLine.visible = false;
	uniqueLine.visible = false;
	verse.visible = true;

	verse.textItem.contents = smallVerse.versiculo;

	if(subtitle.lines == 1){

		uniqueLine.visible = true;
		uniqueLine.textItem.contents = subtitle.contenido.uniqueLine;

	}else if(subtitle.lines == 2){

		upLine.visible = true;
		downLine.visible = true;
		upLine.textItem.contents = subtitle.contenido.upLine;
		downLine.textItem.contents = subtitle.contenido.downLine;

	}

	subtitlesGroup.visible = false;
	themeGroup.visible = false;

	saveGroup(subtitlesGroup, subtitle.id);
	
}

function saveGroup(group, name){

	group.visible = true;
	savePng(name);
	group.visible = false;

}

function loadJson(relPath){

	var script = new File($.fileName);
	var jsonFile = new File(script.path + '/' + relPath);

	jsonFile.open('r');
	var str = jsonFile.read();
	jsonFile.close();

	return JSON.parse(str);
}

function savePng(name){

	var doc = app.activeDocument;
	var pngFile = new File(doc.path + '/subtitleGenerated/' + name + '.png');

	var opts = new ExportOptionsSaveForWeb();
	opts.format = SaveDocumentType.PNG;
	opts.PNG8 = false;
	opts.quality = 100;

	doc.exportDocument(pngFile,ExportType.SAVEFORWEB, opts);
}