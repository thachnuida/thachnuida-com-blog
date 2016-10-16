<?php
/*
 Update code on server
 */

$rawGitUrl = 'https://cdn.rawgit.com/thachnuida/saysua-com-blog/'.$_GET['commit'];

/**
 * create file with content, and create folder structure if doesn't exist 
 * @param String $filepath
 * @param String $message
 */
function forceFilePutContents ($filepath, $message){
    try {
        $isInFolder = preg_match("/^(.*)\/([^\/]+)$/", $filepath, $filepathMatches);
        if($isInFolder) {
            $folderName = $filepathMatches[1];
            $fileName = $filepathMatches[2];
            if (!is_dir($folderName)) {
                mkdir($folderName, 0777, true);
            }
        }
        file_put_contents($filepath, $message);
    } catch (Exception $e) {
        echo "ERR: error writing '$message' to '$filepath', ". $e->getMessage();
    }
}

function saveFile($file) {
    $file = trim($file);
    global $rawGitUrl;
    $url = $rawGitUrl.'/public/'.$file;
    echo ($url.'|');
    forceFilePutContents($file, file_get_contents($url));
}

function getUpdateList() {
    global $rawGitUrl;
    $data = file_get_contents($rawGitUrl.'/update.txt');
    $data = explode('INFO', $data);
    $updateList = array();
    foreach($data as $line) {
        if (strpos($line, '  Generated: ') !== false) {
            $updateList[] = str_replace('  Generated: ', '', $line);
        }
    }

    return $updateList;
}

/** Main **/
$updateList = getUpdateList();
foreach($updateList as $file) {
    saveFile($file);
}

?>