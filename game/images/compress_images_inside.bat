@echo off

REM compresse tous les .png (récursivement) dans le dossier où il est appelé
REM ATTENTION => ça remplace les .png d'origine, faut les mettre de côté avant


set pingoCommandJPG=pingo -jpgquality=70 


for /R %%f in (*.jpg) do (
	echo %%f
	%pingoCommandJPG% %%f
)



set pingoCommandPNG=pingo -pngpalette=100 -s2 

for /R %%f in (*.png) do (
	echo %%f
	%pingoCommandPNG% %%f
)


pause