#pragma strict
var paused = false;
var style : GUIStyle;
var pauseBGEditMe : Texture;
var pauseTitleEditMe : String;
var pauseTitleColorEditMe : Color;

function Start () {
	style.fontSize=35;
	style.normal.textColor = pauseTitleColorEditMe;
	style.fontStyle = FontStyle.Bold;
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
		Time.timeScale=0;
	} else {
		Time.timeScale = 1;
	}
}

function OnGUI () {
	if(paused) {

		GUI.DrawTexture(Rect(0,0,Screen.width,Screen.height),pauseBGEditMe);
		GUI.Label(Rect(35,35,Screen.width/2,128),pauseTitleEditMe,style);

	}
}