# Pictorial St. Louis

Mobile-friendly, interactive map created using:

* Library of Congress Digital Collection 'Pictorial St. Louis' (https://www.loc.gov/resource/g4164sm.gpm00001/?sp=1)
* Leaflet (http://leafletjs.com/)
* leaflet-rastercoords (https://commenthol.github.io/leaflet-rastercoords/)
* gdal2tiles-leaflet (https://github.com/commenthol/gdal2tiles-leaflet)

## Check It Out
http://jarednielsen.com/pictorial-st-louis/index.html

## DIY

Download or clone this repo.

This approach is a bit ridiculous and convoluted, but it's my quick-and-dirty workaround for the Github file size limit of 100MB (The full .png is ~900MB). You need to stitch together the complete map from the slices included in the `maps` directory and then slice that file into tiles.

I know.

If you don't have it already, install ImageMagick:

`sudo apt-get install imagemagick`

Change into the `maps` directory:

`cd maps`

Run:
```
convert \( 01.png 02.png 03.png 04.png 05.png 06.png 07.png 08.png +append \) \
          \( 09.png 10.png 11.png 12.png 13.png 14.png 15.png 16.png +append \) \
          \( 17.png 18.png 19.png 20.png 21.png 22.png 23.png 24.png +append \) \
          \( 25.png 26.png 27.png 28.png 29.png 30.png 31.png 32.png +append \) \
          \( 33.png 34.png 35.png 36.png 37.png 38.png 39.png 40.png +append \) \
          -append ../map.png
```
This generates `map.png` in the parent directory.

`cd ..`

You will need `gdal2tiles.py`. Clone or download:

`git clone https://github.com/commenthol/gdal2tiles-leaflet.git`

You will also need GDAL:

```
sudo add-apt-repository ppa:ubuntugis/ppa
sudo apt-get update
sudo apt-get install gdal-bin
sudo apt-get -y install python-gdal
```

Run the script from within the repo master:

`cd gdal*`

And enter:

`python gdal2tiles.py -l -p raster -z 0-8 -w none ../map.png ../tiles`

Voila! Open `index.html` in your best browser (Firefox, of course).

## Credits

* Panoramic Maps of Cities in the United States and Canada, Hebert & Dempsey http://www.worldcat.org/oclc/895319
* Lucas and Garrison 1875 http://lucasandgarrison.com/homepage/introduction/the-maps/
* History Happens Here - The Missour History Museum's Blog http://www.historyhappenshere.org/node/7694
* Views and Viewmakers of Urban America: Lithographs of Towns and Cities in the United States and Canada, John W. Reps http://www.worldcat.org/oclc/463728063
* Distilled History https://www.distilledhistory.com/
* City of St. Louis https://www.stlouis-mo.gov/archive/neighborhood-histories-norbury-wayman/bissell/works4.htm
* Eric Erickson via Ancestry.com http://rootsweb.ancestry.com/~asylums/stlouis_mo/index.html
* Keen Delage via Flickr https://www.flickr.com/photos/73762611@N00/5992654457

## To Do

* Add text attribution link to index.js & map.geojson
* Fix accuracy of marker zoom
