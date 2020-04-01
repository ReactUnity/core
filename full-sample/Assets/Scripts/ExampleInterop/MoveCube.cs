using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class MoveCube : MonoBehaviour
{
    public float Speed = 5;

    private int Direction = 1;
    private float MinPosition = 0;
    private float MaxPosition = 6;

    void Update()
    {
        transform.Translate(Time.deltaTime * Speed * Direction, 0, 0);

        if (transform.position.x >= MaxPosition) Direction = -1;
        else if (transform.position.x <= MinPosition) Direction = 1;
    }
}
