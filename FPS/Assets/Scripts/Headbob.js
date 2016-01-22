#pragma strict
var i = 0;
function Start () {

}

function Update () {
	if(Input.GetKey(KeyCode.W)) {
		i++;
		this.transform.position.y+=Mathf.Sin(i)*0.05;
	} else {
		i=0;
	}
}