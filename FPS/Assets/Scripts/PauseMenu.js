#pragma strict
var paused = false;
var style : GUIStyle;
var pauseBGEditMe : Texture;
var pauseTitleEditMe : String;
var pauseTitleColorEditMe : Color;
var pauseGameTitleTextureEditMe : Texture;
var cursorTextureEditMe : Texture;
var buttonTextureEditMe : Texture;
var buttonTexturePressedEditMe : Texture;
var buttonStyle : GUIStyle;
var opac : float = 0;
var exitButtonAnimateX = 15;
function Start () {
	style.fontSize=20;
	style.normal.textColor = pauseTitleColorEditMe;
	style.fontStyle = FontStyle.Bold;
	buttonStyle.normal.background = buttonTextureEditMe;
	buttonStyle.hover.background = buttonTexturePressedEditMe;

	buttonStyle.alignment = TextAnchor.MiddleCenter;
}

function Update () {
	if(Input.GetKeyDown(KeyCode.Tab)) {
		if(paused) {
			paused=false;
		} else {
			paused=true;
		}
	}   
	if(paused) {
		Cursor.lockState = CursorLockMode.Confined;
		Cursor.visible=false;
		Time.timeScale=0;

		if(opac<=1) {
			opac+=0.08;
		}
	} else {
		opac=0;
		Time.timeScale = 1;
		Cursor.lockState = CursorLockMode.Locked;
		Cursor.visible=false;
	}
}

function OnGUI () {
	
	if(paused) {
		var prevColor = GUI.color;
		GUI.color = new Color(prevColor.r,prevColor.g,prevColor.b,opac);
		GUI.DrawTexture(Rect(0,0,Screen.width,Screen.height),pauseBGEditMe);
		GUI.DrawTexture(Rect(Screen.width-200,Screen.height-100,200,100),pauseGameTitleTextureEditMe);
		GUI.Label(Rect(15,15,Screen.width/2,128),pauseTitleEditMe,style);
		var exitbtn = GUI.Button(Rect(exitButtonAnimateX,45,100,35),"Exit",buttonStyle);
		if(exitbtn) {
			paused=false;
		}
		GUI.DrawTexture(Rect(Input.mousePosition.x,Screen.height - Input.mousePosition.y,35,35),cursorTextureEditMe);
	}
}