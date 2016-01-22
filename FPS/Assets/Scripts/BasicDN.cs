using UnityEngine;
using System.Collections;

public class BasicDN : MonoBehaviour {
	
	public float TimeFrame = 10f;

	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
		transform.RotateAround(Vector3.zero,Vector3.right,TimeFrame*Time.deltaTime);
		transform.LookAt(Vector3.zero);
	}
}
