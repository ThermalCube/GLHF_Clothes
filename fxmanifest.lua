fx_version 'cerulean'
game 'gta5'

author 'ThermalCube'
description 'DawnV Clothes'
version '1.0.0'


shared_scripts {
	'@es_extended/imports.lua',
	'@es_extended/locale.lua'
}

client_script {
   'client/*.lua'
}

server_scripts {
	'@oxmysql/lib/MySQL.lua',
   'server/*.lua'
}

ui_page {
   "html/dist/index.html"
}

files {
   "html/dist/index.html",
   "html/dist/assets/**"
}

lua54 'yes'

dependencies {
	'es_extended',
	'skinchanger'
}

