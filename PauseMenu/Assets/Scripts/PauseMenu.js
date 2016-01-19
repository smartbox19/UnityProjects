#pragma strict
var paused = false;

function Start () {
	
}

function Update () {
	if(Input.GetKeyDown(KeyCode.Escape)) {
		if(paused) {
			paused=false;
		} else {
			paused=true;
		}
	}   
	if(paused) {
		Time.timeScale = 0;
	} else {
		Time.timeScale = 1;
	}
}