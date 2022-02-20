class Graphic {
    constructor(name, srcUrl,xOr,yOr){
        this.name = name;
        this.srcUrl = srcUrl;
        if(xOr != undefined && yOr != undefined){
            this.xOr = xOr;
            this.yOr = yOr;
        } else {
            this.xOr = 0;
            this.yOr = 0;
        }
    }
    loadImg(num){
        this.newImg = new Image();
        this.newImg.src = this.srcUrl;
        this.newImg.onload = function(){ // When the image is loaded, add it to the dictionary.
            graphicDic[graphicArr[num].name] = {
                "image": graphicArr[num].newImg,
                "xOr": graphicArr[num].xOr,
                "yOr": graphicArr[num].yOr,
                "w": graphicArr[num].newImg.width,
                "h": graphicArr[num].newImg.height
            }; 
            // I'm using graphicArr[num] instead of this, because this
            // no longer refers to the current object inside the onload function,
            // so I have to point to it's location in graphicArr
            loadCounter ++;
            if(loadCounter == graphicArr.length){ 
                // If all the graphics have been loaded, 
                // procede to the next part of the functionality.
                library();
            }
        }
    }
}