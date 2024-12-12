int ledPin = 13; 		// LED que se encuentra en el pin 13
   void setup(){ 
   pinMode(ledPin, OUTPUT);	// El p1n 13 será una salida digital 
} 
void loop(){ 
   digitalWrite(ledPin, HIGH);	// Enciende el LED
   delay(1000); 				// Pausa de 1 segundo 
   digitalWrite(ledPin, LOW); 	// Apaga el LED 
   delay(1000);				// Pausa de 1 segundo 
} 
 