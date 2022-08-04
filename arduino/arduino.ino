#include <Servo.h>

Servo servo;  
   

void setup() {
  Serial.begin(9600);
  servo.attach(9);  
}
void loop() {
   
  if(Serial.available() > 0){ //just to make sure its connected to the arm
    String text = Serial.readString();

    if (text == "يمين"){
      servo.write(180);
    }
    else if (text == "يسار"){
      servo.write(0);
    }
    else if(text == "امام"){
      servo.write(90);
    }
  }
}
