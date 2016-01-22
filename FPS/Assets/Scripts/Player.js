#pragma strict

var crossHairTexture : Texture;
var rotX = 0f;
var rotY = 0f;
var origRotation : Quaternion;
var xQuat : Quaternion;
var yQuat : Quaternion;
var crossHairScale : float = 1;
var isInRange  = false;
var isEvilCrossHair = false;
var isFiring = false;
var isFiringCounter = 0;
var vignetteTexture  :Texture;
var hunger : float = 0;
function Start () {
	origRotation = transform.localRotation;
	Screen.lockCursor = true;
}

function Update () {
	rotX+=Input.GetAxis("Mouse X")*80f*Time.deltaTime;
	rotY+=Input.GetAxis("Mouse Y")*120f*Time.deltaTime;
	if(rotX< -360f) {
		rotX+=360f;
	}
	if(rotX > 360f) {
		rotX-=360f;
	}

	rotX = Mathf.Clamp(rotX,-360F,360F);
	rotY = Mathf.Clamp(rotY,-120F,120F);
	xQuat = Quaternion.AngleAxis(rotX,Vector3.up);
	yQuat = Quaternion.AngleAxis(rotY,Vector3.up);

	transform.eulerAngles.y =  Mathf.LerpAngle(transform.eulerAngles.y,rotX,.43);
	transform.eulerAngles.x = -Mathf.LerpAngle(transform.eulerAngles.x,rotY,.43);
	var translationZ = Input.GetAxis("Vertical")*15;
	translationZ*=Time.deltaTime;
	if(Input.GetKey(KeyCode.W)) {
		transform.position.z+=Mathf.Cos(rotX*(Mathf.PI/180))*0.3;
		transform.position.x+=Mathf.Sin(rotX*(Mathf.PI/180))*0.3;
		hunger+=2*Time.deltaTime;
	}
	if(Input.GetKey(KeyCode.S)) {
		transform.position.z+=-Mathf.Cos(rotX*(Mathf.PI/180))*0.3;
		transform.position.x+=-Mathf.Sin(rotX*(Mathf.PI/180))*0.3;
		hunger+=2*Time.deltaTime;
	}

	if(Input.GetKey(KeyCode.A)) {
		this.transform.eulerAngles.z=Mathf.LerpAngle(this.transform.eulerAngles.z,15,0.15);
		transform.position.z+=Mathf.Cos((rotX-90)*(Mathf.PI/180))*0.09;
		transform.position.x+=Mathf.Sin((rotX-90)*(Mathf.PI/180))*0.09;
	} else if(Input.GetKey(KeyCode.D)) {
		this.transform.eulerAngles.z=Mathf.LerpAngle(this.transform.eulerAngles.z,-15,0.15);
		transform.position.x+=Mathf.Sin((rotX+90)*(Mathf.PI/180))*0.09;
		transform.position.z+=Mathf.Cos((rotX+90)*(Mathf.PI/180))*0.09;
	}else {
		this.transform.eulerAngles.z=Mathf.LerpAngle(this.transform.eulerAngles.z,0,0.15);
	}



	if(isInRange) {
		//this formula eases between 2 values from the current scale to 2.5
		crossHairScale+=(2.5-crossHairScale)/5;
	} else {
		crossHairScale+=(1-crossHairScale)/5;
	}

	if(Input.GetMouseButtonDown(0)) {
		isFiring=true;
	} else {
		isFiringCounter++;
		if(isFiringCounter>10) {
			isFiring=false;
			isFiringCounter=0;
		}
	}

	if(isFiring) {
		crossHairScale+=(4.5-crossHairScale)/5;
	} else {
		crossHairScale+=(2.5-crossHairScale)/5;
	}
}

function OnTriggerEnter(other : Collider) {
	if(other.tag == "Entity") {
		
		isInRange=true;
	} else if(other.tag == "Enemy") {
		isInRange=true;
		isEvilCrossHair = true;
	}
}

function OnTriggerExit(other : Collider) {
	if(other.tag == "Entity") {
		isInRange=false;
	} else if(other.tag == "Enemy") {
		isInRange=false;
		isEvilCrossHair=false;
	}
}

function OnGUI() {

	if(isEvilCrossHair == true) {
		GUI.color = Color(255,0,0,255);
	} else {
		GUI.color = Color(255,255,255,255);
	}
	GUI.DrawTexture(Rect(Screen.width/2-4*crossHairScale,Screen.height/2-4*crossHairScale,(8)*crossHairScale,(8)*crossHairScale),crossHairTexture);
	GUI.color = Color(255,255,255,hunger/100);
	GUI.DrawTexture(Rect(0,0,Screen.width,Screen.height),vignetteTexture);
}
