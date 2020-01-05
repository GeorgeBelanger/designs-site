console.time('mainLoad')
  window.mobileAndTabletcheck = function() {
    var check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
  };
  
  if(mobileAndTabletcheck()){
    document.body.classList.add('mob');
  }
  
  var ua = window.navigator.userAgent;
  var iOS = !!ua.match(/iPad/i) || !!ua.match(/iPhone/i);
  var webkit = !!ua.match(/WebKit/i);
  var iOSSafari = iOS && webkit && !ua.match(/CriOS/i);
  if (iOS && webkit) {
    document.getElementById('theHTML').classList.add('ios');
  }
  
  
  var data='';
  var unfilteredDetailsData;
  var detailsData=[];
  var totalUnits = 0;
  var size=0;
  var initLogoX=0;
  var initLogoY=0;
  var initClickedUnit;
  var clickedUnitX=0;
  var clickedUnitY=0;
  var detailsViewReady=false;
  var canCloseDetails=false;
  var apiLink="https://www.georgebelanger.com/"
  var imagesPromises=[];
  var preloader=document.getElementById('preloader');
  var unitsAreLoaded=false;
  globalPreloading();
  
//   readTextFile(apiLink+'item?per_page=100&order=asc&fields=id,slug,title.rendered,content,havesvg,cssclass,svgcode,goexternal,externallink,itemthumb,wpcf-date-cover,order,wpcf-decorative,itemshiftedthumbnail', function(text){
  console.time('tiles')
  var typeOfTilesList;
  mobileAndTabletcheck() ?  typeOfTilesList = 'tilesMobile.txt' :  typeOfTilesList = 'tiles.txt'
 
  
  function getImage(url){
    return new Promise(function(resolve, reject){
      var img = document.createElement('img');
      img.onload = function(){
          resolve(url);
      }
      img.onerror = function(){
          reject(url);
      }
      img.src = url;
    })
  }
  var sort_by = function(field, reverse, primer){
   var key = primer ?
     function(x) {return primer(x[field])} :
     function(x) {return x[field]};
  
   reverse = !reverse ? 1 : -1;
  
   return function (a, b) {
     return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
     }
  }
  function globalPreloading(){
    document.body.classList.add('notReady');
    preloader.classList.add('show');
    setTimeout(function () {
      console.timeEnd('mainLoad')
      preloader.classList.add('active');
    }, 100);
  }
  function removePreloader(){
    readTextFile(apiLink+typeOfTilesList, function(text){
      console.timeEnd('tiles')
      data = JSON.parse(text);
      console.log(data)
      totalUnits = data.length;
    
      //Promise All Units Thumbnails
      var i;
      for(i=0;i<totalUnits;i++){
        if(data[i]['itemthumb'])
        imagesPromises.push(getImage(data[i]['itemthumb']));
      }
      Promise.all(imagesPromises).then(function() {
        // removePreloader();
        unitsAreLoaded=true;
        imagesPromises=[];
      })
      
      //Sort data by order
      data.sort(sort_by('order', false, parseInt));
    
      //Request all details
      console.time("articles");
      // readTextFile(apiLink+"item-detail?per_page=100&fields=id,wpcf_details_data._wpcf_belongs_item_id,wpcf_details_data.wpcf-details-data,wpcf_details_data.wpcf-is-image,wpcf_details_data.wpcf-background-color,wpcf_details_data.wpcf-horizontal-show,wpcf_details_data.wpcf-live-link,wpcf_details_data.wpcf-live-link-url", function(text){
      
      readTextFile(apiLink+'articles.txt', function(text){
        console.timeEnd("articles")
        unfilteredDetailsData = JSON.parse(text);
        console.log(unfilteredDetailsData)
        draw(data);
      });
    });
    document.getElementById('flat').classList.add('black');
    setTimeout(function () {
      preloader.classList.remove('active');
      setTimeout(function () {
        preloader.classList.remove('show');
        document.body.classList.remove('notReady');
        randomShow(true);
        setTimeout(function(){
          toggleUnitListener(true);
        },1000);
      }, 1000);
    }, 2000);
  }
  
  function draw(theData){
    var unitsPerColumn = 2;
    if(mobileAndTabletcheck()){
        unitsPerColumn = 3;
    }
    var availableHeight = window.innerHeight;
    var unitHeight = availableHeight / unitsPerColumn;
    var totalColumns = Math.ceil(totalUnits / unitsPerColumn);
    var currentColumn = 1;
    var resetY = 0;
    var iForY = 0;
    var shift = false;
    var shiftY;
    var shiftX;
    var iEveryN = 0;
    var preSize = document.documentElement.clientHeight / unitsPerColumn;
    size = Math.ceil(preSize + (preSize * 50 / 100/unitsPerColumn)+preSize*3/100);
    var rotatingDelta = size * 14.6 / 100;
    //Dynamicly Create The Units
    for (i = 0; i < totalUnits; i++) {
      //Create Unit Holder
      iForY++;
      var unitMarkup = document.createElement('div');
      unitMarkup.classList.add('unit');
      unitMarkup.classList.add('hide');
  
      //Create Data Holder and append it to Unit Holder
      var unitDataMarkup = document.createElement('div');
      unitDataMarkup.classList.add('data');
      unitMarkup.appendChild(unitDataMarkup);
  
      //Create Image and append it to Data Holder
      if(theData[i]["itemthumb"]){
        var unitDataMarkupImage = document.createElement('img');
        unitDataMarkupImage.setAttribute('draggable',false);
        unitDataMarkupImage.setAttribute('src', theData[i]["itemthumb"]);
        unitDataMarkup.appendChild(unitDataMarkupImage);
        if(theData[i]["itemshiftedthumbnail"]){
          var unitDataMarkupShiftedThumbnail=document.createElement('img');
          unitDataMarkupShiftedThumbnail.setAttribute('draggable',false);
          unitDataMarkupShiftedThumbnail.setAttribute('src', theData[i]["itemshiftedthumbnail"]);
          unitDataMarkupShiftedThumbnail.classList.add('shiftedThumbnail');
          unitDataMarkup.appendChild(unitDataMarkupShiftedThumbnail);
        }
      }
  
      //SVG
      if(theData[i]["havesvg"]){
        var unitDataMarkupSVG = document.createElement('div');
        unitDataMarkupSVG.innerHTML=theData[i]["svgcode"];
  
        unitDataMarkup.appendChild(unitDataMarkupSVG);
      }
  
      //Unit Custom Class Name
      if(theData[i]["cssclass"]){
        unitMarkup.classList.add(theData[i]["cssclass"]);
        unitMarkup.setAttribute('id',theData[i]["cssclass"]);
      }
      else{
        //unitMarkup.setAttribute('id','unit'+(i+1));
        unitMarkup.setAttribute('id',theData[i]['slug'])
      }
  
      //ExternalLink
      if(theData[i]['externallink']){
        var unitDataLink=document.createElement('a');
        unitDataLink.classList.add('unitHitarea');
        unitDataLink.setAttribute('href',theData[i]['externallink']);
        unitDataLink.setAttribute('target','_blank');
        unitDataLink.style.zIndex = 3
        unitDataMarkup.appendChild(unitDataLink);
      }
  
  
      //Decorative Unit
      if(theData[i]["wpcf-decorative"]){
        unitMarkup.classList.add('decorative');
      }
  
      //Assign Node index
      unitMarkup.setAttribute('index',i);
  
      //Assign Node id
      unitMarkup.setAttribute('dataid',theData[i]["id"]);
  
  
  
      //Unit custom text
      if(theData[i].content.rendered){
        var textMarkup=document.createElement('p');
        textMarkup.innerHTML=theData[i].content.rendered;
        textMarkup.classList.add('dataText')
        unitDataMarkup.appendChild(textMarkup);
      }
      if (i + 1 > unitsPerColumn * currentColumn && i + 1 > unitsPerColumn) {
        currentColumn++;
      }
      if (i % unitsPerColumn == 0) {
        resetY = 0;
        iForY = 0;
        if (!shift) {
          shift = true;
        }
        else {
          shift = false;
        }
        iEveryN++;
      }
      else {
        resetY = 1;
      }
      if (shift) {
        shiftY = -size / 2;
      }
      else {
        shiftY = 0;
      }
      shiftX = -size / 2 * iEveryN;
      var topValue = Math.floor(resetY * size * iForY + rotatingDelta + shiftY);
      var leftValue = Math.floor((currentColumn * size + rotatingDelta) - size + shiftX);
  
      unitMarkup.style.top = topValue + 'px';
      unitMarkup.style.left = leftValue + 'px';
      unitMarkup.style.width = unitMarkup.style.height = size * 70.6 / 100 + 'px';
  
      unitDataMarkup.style.width = unitDataMarkup.style.height = size + 'px';
      unitDataMarkup.style.top = unitDataMarkup.style.left = - rotatingDelta + 'px';
      document.getElementById("theParent").appendChild(unitMarkup);
    }
    initLogoX=document.getElementById('logo').offsetLeft;
    initLogoY=document.getElementById('logo').offsetTop;
  
    //Activate unit through URL
  
    /*if(window.location.pathname!='/')
      window.location.pathname='/';*/
    if(window.location.hash){
  
      var hash = window.location.hash.substring(1);
  
      var watchUnitsAreLoaded;
      watchUnitsAreLoaded = setInterval(function(){
        if(unitsAreLoaded){
          setTimeout(function () {
            activateUnit(document.getElementById(hash));
            //3700 = 2000 after main preloader to remove active class + 1000 to hide the main preloader + 700 to random show all units
          }, 3700);
  
          clearInterval(watchUnitsAreLoaded);
        }
      }, 100);
  
    }
  }
  function toggleUnitListener(theCase){
    var units=document.getElementsByClassName('unit');
    for(i=0;i<units.length;i++){
      if(theCase)
      units[i].addEventListener('click',itemClickHandler);
      else
      units[i].removeEventListener('click',itemClickHandler);
    }
    document.getElementById('logo').addEventListener('click',itemClickHandler);
  }
  function itemClickHandler(e){
    activateUnit(this);
  }
  function activateUnit(unit){
  
    //must be not already activated
    var activate=false;
    if(unit.classList.contains('activated')
      ||unit.classList.contains('logo')
      ||unit.classList.contains('github')
      ||unit.classList.contains('linkedin')
      ||unit.classList.contains('info')
      ||unit.classList.contains('resume')
      // ||unit.classList.contains('sperryfarms')
      ||unit.classList.contains('favoritebookwebsite')
      ||unit.classList.contains('birdpictures')
      // ||unit.classList.contains('atmnewengland')
      // ||unit.classList.contains('healfly')
      ||unit.classList.contains('travelvideos')
      ||unit.classList.contains('podcastepisodes')
      // ||unit.classList.contains('pairbnb')
      ||unit.classList.contains('oldportfolio')      
      ||unit.classList.contains('decorative')){
      activate=true;
    }
    if(!activate){
      var stateObj = { index: unit.getAttribute('id') };
      url='#'+unit.getAttribute('id');
      history.pushState(stateObj,'null',url);
      toggleUnitListener(false);
      initClickedUnit=unit;
      clickedUnitX=unit.offsetLeft;
      clickedUnitY=unit.offsetTop;
  
      //Animated hide for all other units
      randomHide(unit);
      var clickedUnit=unit;
  
      //First click effect on the unit scale it gently with high z index
      clickedUnit.classList.add('activated');
      resizeUnit(clickedUnit,0.8);
  
      //scale and center the unit AFTER all other units have gone thats why i used settimeout
      (function(clickedUnit) {
        setTimeout(function () {
          clickedUnit.classList.add('active');
          resizeUnit(clickedUnit,1.3);
          //center the clicked unit without fix the position in css
          //clickedUnit.style.left=window.scrollX+(window.innerWidth/2)+'px';
          clickedUnit.style.left=(window.innerWidth/2)+'px';
          document.body.classList.add('detailsView');
          unitPreloader(clickedUnit);
        }, 700);
      })(clickedUnit);
      loadDetails(clickedUnit);
    }
    //If the target is the logo>Close details
    if(unit.classList.contains('logo')){
      if(canCloseDetails){
        closeDetails();
      }
    }
  }
  function closeDetails(){
    canCloseDetails=false;
    //Reset URL
    window.location.hash='';
    history.pushState(null,null,'');
  
    document.getElementById('detailsCore').classList.remove('active');
    document.getElementById('detailsCover').classList.remove('active');
    document.getElementById('logo').classList.remove('fixed');
    setTimeout(function(){
      document.body.classList.remove('colorized');
      document.getElementById('detailsFillPolyCloseAnim').beginElement();
      setTimeout(function(){
        document.getElementById('logo').style.left=initLogoX+'px';
        document.getElementById('logo').style.top=initLogoY+'px';
        document.body.classList.remove('detailsView');
        document.getElementById('logo').classList.remove('detailsLogo');
        initClickedUnit.style.left=clickedUnitX+'px';
        initClickedUnit.style.top=clickedUnitY+'px';
        initClickedUnit.classList.remove('slowDown');
        initClickedUnit.classList.remove('activated');
        setTimeout(function(){
          toggleUnitListener(true);
        },700)
        detailsViewReady=false;
        randomShow(false);
        scrollToLeft(700);
      },700);
      //Reset details
  
      for(i=document.getElementById('detailsCore').children.length;i>0;i--){
        document.getElementById('detailsCore').removeChild(document.getElementById('detailsCore').children[i-1])
      }
    },600)
  }
  function unitPreloader(unit){
    var unitPreloader=document.getElementById('unitPreloader');
    unit.appendChild(unitPreloader);
    setTimeout(function(){
      unitPreloader.classList.add('active');
      document.body.classList.add('notReady')
    },700);
  }
  function removeUnitPreloader(){
    var unitPreloader=document.getElementById('unitPreloader');
    unitPreloader.classList.remove('active');
    setTimeout(function(){
      document.body.appendChild(unitPreloader);
      document.body.classList.remove('notReady')
    },700);
  }
  function loadDetails(clickedUnit){
    //select current unit details
    detailsData=[];
    var needle = clickedUnit.getAttribute('dataid');
    for (var i = 0; i < unfilteredDetailsData.length; i++){
      if (unfilteredDetailsData[i].wpcf_details_data._wpcf_belongs_item_id[0] == needle){
         detailsData.push(unfilteredDetailsData[i]);
      }
    }
    detailsData.sort(sort_by('id', false, parseInt));
  
    //Details Cover
    var selectedUnitCover;
    for (var i = 0; i < data.length; i++){
      // look for the entry with a matching `code` value
      if (data[i].id == needle){
        selectedUnitCover=data[i]['wpcf-date-cover']
      }
    }
    var coverImgHolder=document.getElementById('detailsCover');
    coverImgHolder.style.width=size*1.5+'px';
    //coverImgHolder.style.transform='translateX('+-(size+2)*1.5+'px)';
  
    //Reset Cover from previous data
    coverImgHolder.innerHTML='';
  
    //Create Cover Dom only if selected unit have a cover
    if(selectedUnitCover){
      var detailsCover=document.createElement('img');
      detailsCover.setAttribute('draggable',false);
      detailsCover.setAttribute('src', selectedUnitCover);
      coverImgHolder.appendChild(detailsCover);
      imagesPromises.push(getImage(selectedUnitCover));
    }
  
    for(i=0;i<detailsData.length;i++){
      var contents=detailsData[i]['wpcf_details_data']['wpcf-details-data'][0];
      if(detailsData[i]['wpcf_details_data']['wpcf-is-image']){
        var tempImagesDOM=document.createElement('div');
        document.body.appendChild(tempImagesDOM);
        tempImagesDOM.innerHTML=contents;
  
        var images=tempImagesDOM.children;
        var imagesLength=images.length;
        var imageIndex;
        for(imageIndex=0; imageIndex<imagesLength;imageIndex++){
          imagesPromises.push(getImage(images[imageIndex].src));
        }
        document.body.removeChild(tempImagesDOM);
      }
    }
    Promise.all(imagesPromises).then(function() {
      setTimeout(function () {
        removeUnitPreloader();
        scrollToLeft(700);
        resizeUnit(clickedUnit,1);
        clickedUnit.classList.add('slowDown');
        clickedUnit.classList.remove('active');
        //Replace the logo with activated unit in details view
        logoX=document.getElementById('logo').offsetLeft;
        logoY=document.getElementById('logo').offsetTop;
        clickedUnit.style.left=logoX+'px';
        clickedUnit.style.top=logoY+'px';
        //Replace Info with Logo in details view
        infoX=document.getElementById('info').offsetLeft;
        infoY=document.getElementById('info').offsetTop;
        document.getElementById('logo').style.left=infoX+'px';
        document.getElementById('logo').style.top=infoY+'px';
        document.getElementById('logo').classList.add('detailsLogo');
        positioningDetails(clickedUnit);
      },2000);
      imagesPromises=[];
    })
  }
  function positioningDetails(clickedUnit){
    var polyFillFactor=size+size/2 - 5;
    document.getElementById('detailsFillPolyAnim').setAttribute('to',''+polyFillFactor+',0 0,0  5000,0  5000,0 0,5000 0,5000  0,0  0, '+polyFillFactor+'');
    document.getElementById('detailsFillPolyAnim').beginElement();
  
    document.getElementById('detailsCore').style.left=size*1.5+'px';
    setTimeout(function(){
      loadDetailsData(clickedUnit);
      document.body.classList.add('colorized');
      detailsViewReady=true;
    },600);
  }
  function loadDetailsData(clickedUnit){
    document.getElementById('detailsCore').classList.add('active');
    document.getElementById('detailsCover').classList.add('active');
    document.getElementById('logo').classList.add('fixed');
    //START SORCERY > Split the content horizontally
    var contentsAvailableHeight;
    if(window.innerHeight>=667)
      contentsAvailableHeight = window.innerHeight - 80;
    else
      contentsAvailableHeight = window.innerHeight - 20;
  
    var totalDataHeight;
    var contentWords;
  
    //Main units repeater
    for(i=0;i<detailsData.length;i++){
      var contents=detailsData[i]['wpcf_details_data']['wpcf-details-data'][0];
      var detailsUnit=document.createElement('div');
      detailsUnit.classList.add('detailsUnit');
      detailsUnit.setAttribute('id','detailsUnit'+i);
  
      document.getElementById('detailsCore').appendChild(detailsUnit);
      //Only if the data is not image
      if(!detailsData[i]['wpcf_details_data']['wpcf-is-image']){
        contentWords=contents.split(' ');
        var wordsLoop;
        var currentColumn=0;
        //Words repeater
        var detailsWords='';
        for (wordsLoop = 0, len = contentWords.length; wordsLoop < len; wordsLoop++) {
          var detailsUnitSector;
          var detailsUnitSectorCore;
          //When to add a new sector
          if(!document.getElementById('sector'+currentColumn+'inDataUnit'+i)){
            // Reset words holder for the new sector
            detailsWords='';
  
            //data sector
            detailsUnitSector=document.createElement('div');
            detailsUnitSector.classList.add('detailsUnitSector');
  
  
            //Background color
            if(detailsData[i]['wpcf_details_data']['wpcf-background-color']){
              detailsUnitSector.style.backgroundColor=detailsData[i]['wpcf_details_data']['wpcf-background-color'][0];
            }
  
            //Give ID and append it
            detailsUnitSector.setAttribute('id','sector'+currentColumn+'inDataUnit'+i);
            document.getElementById('detailsUnit'+i).appendChild(detailsUnitSector);
  
            //data sectorcore
            detailsUnitSectorCore=document.createElement('div');
            detailsUnitSectorCore.classList.add('detailsUnitSectorCore');
  
            if(window.innerWidth<=667 &&  window.innerHeight>window.innerWidth)
              detailsUnitSector.style.width=window.innerWidth*0.95+'px';
            else
              detailsUnitSector.style.width=size*1.5+80+'px';
  
            detailsUnitSectorCore.setAttribute('id','sectorCore'+currentColumn+'inDataUnit'+i);
            document.getElementById('sector'+currentColumn+'inDataUnit'+i).appendChild(detailsUnitSectorCore);
          }
          //Keep calculate the height so if it exceeds it is the time to add a new sector by increment the currentColumn
          totalDataHeight=detailsUnitSectorCore.offsetHeight+40;
  
          if(totalDataHeight>contentsAvailableHeight){
            currentColumn++;
          }
          //Add the current word to the previous texts
          detailsWords+=' '+contentWords[wordsLoop];
          detailsUnitSectorCore.innerHTML=detailsWords;
  
          //Add Live Link at the end
          if(wordsLoop==len-1&&detailsData[i]['wpcf_details_data']['wpcf-live-link']){
            var liveLinkHolder=document.createElement('div');
            liveLinkHolder.classList.add('callToActionHolder');
            detailsUnitSectorCore.appendChild(liveLinkHolder);
  
            var liveLink=document.createElement('a');
            liveLink.setAttribute('href',detailsData[i]['wpcf_details_data']['wpcf-live-link-url'][0]);
            liveLink.setAttribute('target','_blank')
            liveLink.innerHTML='See It Live';
            liveLinkHolder.appendChild(liveLink);
  
          }
        }
      }
      else{
        var tempImagesDOM=document.createElement('div');
        document.getElementById('detailsUnit'+i).appendChild(tempImagesDOM);
        tempImagesDOM.innerHTML=contents;
  
        var images=tempImagesDOM.children;
        var imagesLength=images.length;
        var imageIndex;
        for(imageIndex=0; imageIndex<imagesLength;imageIndex++){
          detailsUnitSector=document.createElement('div');
          detailsUnitSector.classList.add('detailsUnitSector');
  
          //Background color
          if(detailsData[i]['wpcf_details_data']['wpcf-background-color']){
            detailsUnitSector.style.backgroundColor=detailsData[i]['wpcf_details_data']['wpcf-background-color'][0];
          }
  
          detailsUnitSector.setAttribute('id','sector'+imageIndex+'inDataUnit'+i);
          document.getElementById('detailsUnit'+i).appendChild(detailsUnitSector);
          detailsUnitSector.innerHTML=images[imageIndex].outerHTML;
          detailsUnitSector.children[0].setAttribute('draggable',false);
  
          //If normal Images display
          if(!detailsData[i]['wpcf_details_data']['wpcf-horizontal-show']){
            if(window.innerWidth<=667 &&  window.innerHeight>window.innerWidth)
              detailsUnitSector.style.width=window.innerWidth*0.95+'px';
            else
              detailsUnitSector.style.width=size*1.5+80+'px';
          }//Else Start the show baby
          else {
            detailsUnitSector.classList.add('detailsUnitSectorShow');
  
            detailsUnitSector.style.width=detailsUnitSector.children[0].width+20+'px';
          }
        }
        document.getElementById('detailsUnit'+i).removeChild(tempImagesDOM);
      }
    }
    canCloseDetails=true;
  }
  
  function randomHide(theVisableUnit){
    var allUnits=document.querySelectorAll('.unit:not(.info):not(.github):not(.linkedin):not(.logo)');
    var i;
    for(i=0;i<allUnits.length;i++)
    {
      (function(i) {
        setTimeout(function () {
          if(allUnits[i]!=theVisableUnit)
          {
            allUnits[i].classList.add('hide');
          }
        }, Math.floor(Math.random() * 700));
  
        //Watch for details view ready to destroy all units by display none
        if(allUnits[i]!=theVisableUnit){
          var watchDetailsViewReady;
          watchDetailsViewReady = setInterval(function(){
            if(detailsViewReady){
              allUnits[i].classList.add('none');
              clearInterval(watchDetailsViewReady);
            }
          }, 1000);
        }
  
      })(i);
  
    }
  }
  function randomShow(initial){
    if(!initial)
      var allUnits=document.querySelectorAll('.unit:not(.info):not(.github):not(.linkedin):not(.logo)');
    else
      var allUnits=document.querySelectorAll('.unit');
    var i;
    for(i=0;i<allUnits.length;i++)
    {
     (function(i) {
        allUnits[i].classList.remove('none');
         setTimeout(function () {
           allUnits[i].classList.remove('hide');
         }, Math.floor(Math.random() * 700));
     })(i);
    }
  }
  
  //UTLS
  function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
      if (rawFile.readyState === 4 && rawFile.status == "200") {
        callback(rawFile.responseText);
      }
    }
    rawFile.send(null);
  }
  function scrollToLeft(scrollDuration) {
    var cosParameter = window.scrollX / 2,
      scrollCount = 0,
      oldTimestamp = performance.now();
    function step (newTimestamp) {
      scrollCount += Math.PI / (scrollDuration / (newTimestamp - oldTimestamp));
      if (scrollCount >= Math.PI) window.scrollTo(0, 0);
      if (window.scrollX === 0) return;
      window.scrollTo(Math.round(cosParameter + cosParameter * Math.cos(scrollCount)), 0);
      oldTimestamp = newTimestamp;
      window.requestAnimationFrame(step);
    }
    window.requestAnimationFrame(step);
  }
  function resizeUnit(unit,ratio){
    newSize=size*ratio;
    var thisData=unit.children[0];
    var offsetShift=(unit.offsetWidth - (unit.offsetWidth*ratio)) / 2;
    unit.style.left=unit.offsetLeft+offsetShift+'px';
    unit.style.top=unit.offsetTop+offsetShift+'px';
    unit.style.width = unit.style.height = newSize * 70.6 / 100 + 'px';
    thisData.style.width = thisData.style.height = newSize + 'px';
    thisData.style.top = thisData.style.left = - newSize * 14.6 / 100 + 'px';
  }
  var mouseWheelEvt = function (event) {
    if (document.body.doScroll)
    document.body.doScroll(event.wheelDelta > 0 ? "left" : "right");
    else if ((event.wheelDelta || event.detail) > 0)
    document.body.scrollLeft -= 20;
    else
    document.body.scrollLeft += 20;
    return false;
  }
  //document.body.addEventListener("mousewheel", mouseWheelEvt);
  document.body.addEventListener("mousewheel", mouseWheelEvt);
  
  //Swipe support if not mobile
  if(!mobileAndTabletcheck()){
    /*var swipeElement=document.getElementById('theParent');
    var hammertime = new Hammer(swipeElement);
    hammertime.on('panleft', function(ev) {
      document.body.scrollLeft += 5;
    });
    hammertime.on('panright', function(ev) {
      document.body.scrollLeft -= 5;
    });*/
  }
  
  //Reload on Resize to recalculate every thing
  //window.onresize = function(){ location.reload(); }


function init() {
  var root = new THREERoot({
    createCameraControls:!true,
    antialias:(window.devicePixelRatio === 1),
    fov:60
  });
  
  root.renderer.setClearColor(0x000000);
  root.renderer.setPixelRatio(window.devicePixelRatio || 1);
  root.camera.position.set(0, 0, 600);
  
  var textAnimation = createTextAnimation();
  root.scene.add(textAnimation);
  
  var light = new THREE.DirectionalLight();
  light.position.set(0, 0, 1);
  root.scene.add(light);
  
  var tl = new TimelineMax({
    repeat:-1,
    repeatDelay:0.5,
    yoyo:true
  });
  tl.fromTo(textAnimation, 4,
    {animationProgress:0.0},
    {animationProgress:0.6, ease:Power1.easeInOut},
    0
    );
    tl.fromTo(textAnimation.rotation, 4, {y:0}, {y:Math.PI * 2, ease:Power1.easeInOut}, 0);

    createTweenScrubber(tl);
  }
  
  function createTextAnimation() {
    console.time('init')
    var geometry = generateTextGeometry('George Belanger', {
      size:40,
      height:12,
      font:'droid sans',
      weight:'bold',
    style:'normal',
    curveSegments:6,
    bevelSize:2,
    bevelThickness:2,
    bevelEnabled:true,
    anchor:{x:0.5, y:0.5, z:0.0}
  });
  
  THREE.BAS.Utils.tessellateRepeat(geometry, 1.0, 2);
  
  THREE.BAS.Utils.separateFaces(geometry);
  console.timeEnd('init')
  
  return new TextAnimation(geometry);
}

function generateTextGeometry(text, params) {
  var geometry = new THREE.TextGeometry(text, params);
  
  geometry.computeBoundingBox();
  
  var size = geometry.boundingBox.size();
  var anchorX = size.x * -params.anchor.x;
  var anchorY = size.y * -params.anchor.y;
  var anchorZ = size.z * -params.anchor.z;
  var matrix = new THREE.Matrix4().makeTranslation(anchorX, anchorY, anchorZ);

  geometry.applyMatrix(matrix);

  return geometry;
}

////////////////////
// CLASSES
////////////////////

function TextAnimation(textGeometry) {
  var bufferGeometry = new THREE.BAS.ModelBufferGeometry(textGeometry);

  var aAnimation = bufferGeometry.createAttribute('aAnimation', 2);
  var aEndPosition = bufferGeometry.createAttribute('aEndPosition', 3);
  var aAxisAngle = bufferGeometry.createAttribute('aAxisAngle', 4);

  var faceCount = bufferGeometry.faceCount;
  var i, i2, i3, i4, v;

  var maxDelay = 0.0;
  var minDuration = 1.0;
  var maxDuration = 1.0;
  var stretch = 0.05;
  var lengthFactor = 0.001;
  var maxLength = textGeometry.boundingBox.max.length();

  this.animationDuration = maxDuration + maxDelay + stretch + lengthFactor * maxLength;
  this._animationProgress = 0;

  var axis = new THREE.Vector3();
  var angle;

  for (i = 0, i2 = 0, i3 = 0, i4 = 0; i < faceCount; i++, i2 += 6, i3 += 9, i4 += 12) {
    var face = textGeometry.faces[i];
    var centroid = THREE.BAS.Utils.computeCentroid(textGeometry, face);
    var centroidN = new THREE.Vector3().copy(centroid).normalize();

    // animation
    var delay = (maxLength - centroid.length()) * lengthFactor;
    var duration = THREE.Math.randFloat(minDuration, maxDuration);

    for (v = 0; v < 6; v += 2) {
      aAnimation.array[i2 + v    ] = delay + stretch * Math.random();
      aAnimation.array[i2 + v + 1] = duration;
    }

    // end position
    var point = utils.fibSpherePoint(i, faceCount, 200);

    for (v = 0; v < 9; v += 3) {
      aEndPosition.array[i3 + v    ] = point.x;
      aEndPosition.array[i3 + v + 1] = point.y;
      aEndPosition.array[i3 + v + 2] = point.z;
    }

    // axis angle
    axis.x = centroidN.x;
    axis.y = -centroidN.y;
    axis.z = -centroidN.z;

    axis.normalize();

    angle = Math.PI * THREE.Math.randFloat(0.5, 2.0);

    for (v = 0; v < 12; v += 4) {
      aAxisAngle.array[i4 + v    ] = axis.x;
      aAxisAngle.array[i4 + v + 1] = axis.y;
      aAxisAngle.array[i4 + v + 2] = axis.z;
      aAxisAngle.array[i4 + v + 3] = angle;
    }
  }

  var material = new THREE.BAS.PhongAnimationMaterial({
      shading: THREE.FlatShading,
      side: THREE.DoubleSide,
      transparent: true,
      uniforms: {
        uTime: {type: 'f', value: 0}
      },
      shaderFunctions: [
        THREE.BAS.ShaderChunk['cubic_bezier'],
        THREE.BAS.ShaderChunk['ease_out_cubic'],
        THREE.BAS.ShaderChunk['quaternion_rotation']
      ],
      shaderParameters: [
        'uniform float uTime;',
        'uniform vec3 uAxis;',
        'uniform float uAngle;',
        'attribute vec2 aAnimation;',
        'attribute vec3 aEndPosition;',
        'attribute vec4 aAxisAngle;'
      ],
      shaderVertexInit: [
        'float tDelay = aAnimation.x;',
        'float tDuration = aAnimation.y;',
        'float tTime = clamp(uTime - tDelay, 0.0, tDuration);',
        'float tProgress = ease(tTime, 0.0, 1.0, tDuration);'
        // 'float tProgress = tTime / tDuration;'
      ],
      shaderTransformPosition: [
        'transformed = mix(transformed, aEndPosition, tProgress);',

        'float angle = aAxisAngle.w * tProgress;',
        'vec4 tQuat = quatFromAxisAngle(aAxisAngle.xyz, angle);',
        'transformed = rotateVector(tQuat, transformed);',
      ]
    },
    {
      diffuse: 0x444444,
      specular: 0xcccccc,
      shininess: 4
      //emissive:0xffffff
    }
  );

  
  THREE.Mesh.call(this, bufferGeometry, material);
  this.position.set(0,135,0)
  this.frustumCulled = false;
}
TextAnimation.prototype = Object.create(THREE.Mesh.prototype);
TextAnimation.prototype.constructor = TextAnimation;

Object.defineProperty(TextAnimation.prototype, 'animationProgress', {
  get: function() {
    return this._animationProgress;
  },
  set: function(v) {
    this._animationProgress = v;
    this.material.uniforms['uTime'].value = this.animationDuration * v;
  }
});

function THREERoot(params) {
  params = utils.extend({
    fov:60,
    zNear:10,
    zFar:100000,

    createCameraControls:true
  }, params);

  this.renderer = new THREE.WebGLRenderer({
    antialias:params.antialias
  });
  this.renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
  document.getElementById('three-container').appendChild(this.renderer.domElement);

  this.camera = new THREE.PerspectiveCamera(
    params.fov,
    window.innerWidth / window.innerHeight,
    params.zNear,
    params.zfar
  );

  this.scene = new THREE.Scene();
  

  if (params.createCameraControls) {
    this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
  }

  this.resize = this.resize.bind(this);
  this.tick = this.tick.bind(this);

  this.resize();
  this.tick();

  window.addEventListener('resize', this.resize, false);
}
THREERoot.prototype = {
  tick: function() {
    this.update();
    this.render();
    requestAnimationFrame(this.tick);
  },
  update: function() {
    this.controls && this.controls.update();
  },
  render: function() {
    this.renderer.render(this.scene, this.camera);
    window.scene = this.scene;
  },
  resize: function() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
};

////////////////////
// UTILS
////////////////////

var utils = {
  extend:function(dst, src) {
    for (var key in src) {
      dst[key] = src[key];
    }

    return dst;
  },
  randSign: function() {
    return Math.random() > 0.5 ? 1 : -1;
  },
  ease:function(ease, t, b, c, d) {
    return b + ease.getRatio(t / d) * c;
  },
  // mapEase:function(ease, v, x1, y1, x2, y2) {
  //   var t = v;
  //   var b = x2;
  //   var c = y2 - x2;
  //   var d = y1 - x1;
  //
  //   return utils.ease(ease, t, b, c, d);
  // },
  fibSpherePoint: (function() {
    var v = {x:0, y:0, z:0};
    var G = Math.PI * (3 - Math.sqrt(5));

    return function(i, n, radius) {
      var step = 2.0 / n;
      var r, phi;

      v.y = i * step - 1 + (step * 0.5);
      r = Math.sqrt(1 - v.y * v.y);
      phi = i * G;
      v.x = Math.cos(phi) * r;
      v.z = Math.sin(phi) * r;

      radius = radius || 1;

      v.x *= radius;
      v.y *= radius;
      v.z *= radius;

      return v;
    }
  })()
};

function createTweenScrubber(tween, seekSpeed) {
  seekSpeed = seekSpeed || 0.001;

  function stop() {
    TweenMax.to(tween, 0, {timeScale:0});
  }
  stop()

  function resume() {
    TweenMax.to(tween, 1, {timeScale:1});
  }

  var mouseDown = false;
  document.body.style.cursor = 'pointer';

  window.addEventListener('mousedown', function(e) {
    mouseDown = true;
    resume();
  });
 
  // mobile
  window.addEventListener('touchstart', function(e) {
    resume();
  });

}
preloader.addEventListener('click', removePreloader)
init();
