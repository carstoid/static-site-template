---
title: Shell Commands
slug: /tools/shell/commands
---

## GIS

### get attributes from a shapefile using OGR
`ogr2ogr -f CSV ~/Desktop/qn.csv qn_relaxed_parcel_ref -sql "select CBBL from bk_relaxed_parcel_ref"`

## Internet

### Download all files of a given type from a site
`wget -r -np -nd -e robots=off 'http://www.example.com'`
-r recursive
-nd is no new directories (ignore site link structure)
-np
-e robots=off ignores robots.txt which disallows crawling on some sites
-A .EXT sets the filetype, not tested/working

## Media Conversion

### Repair/Update ID3 tags on MP3
`$ eyed3 --help`
Above will list available commands to set track names, album/artist/genre, art etc. Installed through pip with some dependencies. Use the plugin fixup from an album directory to enter tag info like so (unfortunately the custom renaming options don't work as of 0.8.10):  
`$ eyed3 --plugin=fixup .`


### Convert DWG/DXF to JPG/PNG
Currently there is no free command line tool available to convert DWG to DXF. However the ODA File Converter can be obtained and used to batch-convert through a GUI.

Once the selected files are ready, use the following:  
`svgexport chair.svg chair.png 500: "svg{background:white;}path{stroke-width:0.02;}"`  
`dxf-to-svg chair.dxf chair.svg`

\*_you may need to install the tools through npm with `npm i -g svgexport` and `npm i -g dxf-to-svg`_

### convert dxf to svg
for f in ./*/*.dxf; do echo $f; done

### convert shapefiles (.shp) to geoJSON
`$ ogr2ogr -f GeoJSON -t_srs crs:84 ./path/to/geoJSON.geojson ./path/to/shapefile.shp`

## Convert PDF to Grayscale
With ghostscript:
`$ gs -o 0_file-out.pdf -sDEVICE=pdfwrite -sColorConversionStrategy=Gray -sProcessColorModel=DeviceGray -dCompatibilityLevel=1.4 file-in.pdf`

## Extract Images from PDF

Images can be bulk extracted from PDFs using Adobe Acrobat's GUI interface, but the process can also be automated using command line tools. In addition, if the original PDF is password-protected, the GUI method will not work, but an encrypted pdf can be decrypted without knowing the original password using the qpdf command line tool.

### Workflow

`brew install xpdf qpdf`

installs the xpdf and qpdf command line tools, if they're not already installed.

`qpdf --decrypt filename_original.pdf filename_new.pdf`

will resave the password-protected pdf as a normal pdf.

`pdfimages filename_decrypted.pdf outputpath/prefix`

will save all images in the file in the folder output path with the prefix prefix.

### .doc to PDF
`for f in *.doc; do /Applications/LibreOffice.app/Contents/MacOS/soffice --headless --convert-to pdf "$f"; done`

### convert image from one format to another
`magick mogrify -format jpg \*.bmp`

### multiple image frames to video
`ffmpeg -r 25 -f image2 -i Frame_%05d.jpg -vb 20M a.mp4`  
`ffmpeg -r 30 -f image2 -s 1920x1080 -i %04d.png -vcodec   libx264 -crf 25  -pix_fmt yuv420p test.mp4`

### batch resize images with imagemagick
`mogrify -path fullpathto/destfolder -resize maxdimXmaxdim -quality 70 \*.jpg`

#### download sound only from youtube video
`youtube-dl -x --audio-format mp3 https://www.youtube.com/watch?v=z7Kv8jvp3vA`

#### best mp4 with best audio youtube
`youtube-dl -f 'bestvideo[ext=mp4]+bestaudio[ext=m4a]/mp4' url`  


### convert wav to mp3
`for i in *.wav; do lame -b 320 -h "${i}" "${i%.wav}.mp3"; done`

### convert flac to mp3
`for f in *.flac; do ffmpeg -i "$f" -aq 1 "${f%flac}mp3"; done`

### transcode video to youtube recommended standard
`ffmpeg -i input -c:v libx264 -preset slow -profile:v high -crf 18 -coder 1 -pix_fmt yuv420p -movflags +faststart -g 30 -bf 2 -c:a aac -b:a 384k -profile:a aac_low output
` from https://gist.github.com/mikoim/27e4e0dc64e384adbcb91ff10a2d3678

### extract frames from video
Where r is rate per second, ss is start, and t is duration.  
`ffmpeg -ss 00:00:25 -t 00:00:00.04 -i YOURMOVIE.MP4 -r 25.0 img%4d.jpg`  
`ffmpeg -i recruiting.mp4 -r 1 ./stills/img%4d.jpg`

### bulk convert images using imagemagick
`for i in *.tif; do convert -quality 98 $i /Volumes/master/vrc/images/${i/.tif/.jpg}; done`


## Python

### Python 3 Virtualenv
`python3 -m venv /path/to/new/virtual/environment
source environment/bin/activate`

### Python 2.x virtualenv
`$ virtualenv -p /usr/bin/python2.7 my_project
source my_project/bin/activate`

### restore and freeze pip requirements
`$ pip freeze`  
`$ pip install -r requirements.txt`

### Set up custom kernel for jupyter notebook using virtualenv
`pip install ipykernel  
ipython kernel install --user --name=projectname`

then in a new tab `jupyter notebook`, create new file with the registered kernel


## SQL Database

### get hrs summary from begin, end, break (min)
`select ((strftime('%s', end) - strftime('%s', begin))/60.0 - break)/60.0 as hrs from Time;`

### all query
`select desc, ((strftime('%s', end) - strftime('%s', begin))/60.0 - break)/60.0 as total from Time;`

### sum hrs
`select SUM(((strftime('%s', end) - strftime('%s', begin))/60.0 - break)/60.0) as total from Time;`

### start log (insert new record)
`insert into Time (desc, begin, OrgID) values ('MESSAGE', datetime('now'), 3);`
Where message is a description of the tasks accomplished and 3 is the OrgID of the client

### export all to csv (timesheets)
`sqlite3 -header -csv ~/_work/_db/tables.sqlite3 "SELECT desc, strftime('%m/%d', begin) as date, strftime('%H:%M', begin) as begin, strftime('%H:%M', end) as end, break, printf('%.2f', (((strftime('%s', end) - strftime('%s', begin))/60.0 - break)/60.0) ) as hrs FROM Time WHERE OrgID=3 AND billed=0;" > ~/Desktop/envelope_sep.csv`

## File Transfer & Storage

### Connect to remote drives through sftp
`sshfs carsten@ci.envelope.city:/mnt/ /Users/carsten/Desktop/MNT/ -p 4322 -o allow_other,defer_permissions,IdentityFile=~/.ssh/id_rsa`

### (VRC) sync local folder to Google Drive using rclone
`rclone copy -v /mnt/f/full_new/ "Google Drive":VRC/images/`

### (VRC) sync local folder to AWS s3 using s3 cli
`aws s3 cp /mnt/f/full_new/ s3://vrc-images/full/ --recursive`

### connect and transfer files through SFTP
`sftp user@ip.0.0.0` to log in  
lpwd, lls, lcd show, list contents, and change directory in local folder  
pwd, ls, cd do the same in the remote  
get filename or get -r directoryname transfers from remote to local  


## Folder Operations and Compression

### declare and do stuff with an array
`declare -a varname=("itema" "itemb" "itemc")
for i in "${varname[@]}"
do
echo ${i}
done`

### iterate through csv and do something (e.g. make directories)
`cat myfile.csv | while read line
do
        echo $line  ## or do something
done
`

### find all empty directories and delete them
`find . -empty -type d -delete`

### batch rename from a csv
Set up a file using excel or similar with two columns, no headers, like so:  
------- | -------  
old.ext | new.ext  
old.ext | new.ext  
old.ext | new.ext  

Then run the following:  
`while read line do old=$(echo "$line" | awk -F"," '{print $1}') new=$(echo "$line" | awk -F"," '{print $2}') mv "$old" "$new" done < names.csv`

### iterate over lines in a file, check for presence
Where 1 is the file containing the list, and 2 is the directory to check.
`while IFS= read -r f; do if [[ -e $2/$f ]]; then printf '%s exists in %s\n' "$f" "$2" else printf '%s is missing in %s \n' "$f" "$2" exit 1 fi done < "$1"`

### count files in directory
`ls -F | wc -l`  
`ls -F |grep -v / | wc -l`  
`find -maxdepth 1 -type f | wc -l`  

### clone hard drive to backup with rsync
Where source is MASTER, destination is BACKUP:   
`rsync --archive --verbose --compress --ignore-existing --delete /Volumes/MASTER /Volumes/BACKUP`

### batch zip multiple files in the same directory (same name) to a single zip file
`for f in PREFIX_*; do zip "$f".zip ./"$f"; done`

### batch zip multiple directories
`for f in PREFIX_*; do zip -r "$f".zip ./"$f"; done`

### compress a tar archive
`tar -czvf name-of-archive.tar.gz /path/to/directory-or-file /anotherpath`

### extract (unzip, open) a tar archive
`tar -xzvf archive.tar.gz`

### extract (unzip) zip archives
`for i in *.zip; do unzip "$i" -d "${i%%.zip}"; done`
makes a directory for each zip with the same name, puts files in it
`for i in *.zip; do unzip "$i"; done`
just dumps all the contents in the working folder


### cull points/rows from a csv, txt (or .xyz) file
`$ awk 'NR == 1 || NR % 3 == 0' points.csv > points_reduced.csv `
