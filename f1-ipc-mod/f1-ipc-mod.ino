#include <Arduino.h>
#include <Wire.h>
#include <Adafruit_MPU6050.h>
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClientSecure.h>
#include <ArduinoJson.h>
#include <SoftwareSerial.h>
#include <TinyGPS++.h>

// object for MPU6050 sensor
Adafruit_MPU6050 mpu;
// I2C address of the MPU-6050
const int MPU_ADDR = 0x68;

// RX, TX for NEO-6M GPS module
SoftwareSerial gpsSerial(4, 5);
// object for TinyGPS++ library
TinyGPSPlus gps;

// cloud data transfer details
const char* ssid = "SSID";
const char* password = "PASSWORD";
String deviceId = "CAD8254-41523";
String apiPath = "https://f1-wizard-production.up.railway.app/api/v1/movement";

void setup() {
  // initialize Serial Monitor
  Serial.begin(115200);
  // initialize NEO-6M GPS module
  gpsSerial.begin(115200);
  // initialize I2C communication for MPU6050
  Wire.begin(0, 2);
  while (!Serial) {
    delay(10);
  }

  // initialize the MPU6050 sensor
  if (!mpu.begin(MPU_ADDR)) {
    Serial.println("Failed to find MPU6050 chip");
    while (1) {
      delay(10);
    }
  }

  // initialize network details
  WiFi.begin(ssid, password);
  Serial.println("");
  Serial.print("Wi-Fi Connecting");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("Connected to ");
  Serial.println(ssid);
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());
  Serial.println("");
  Serial.print("GPS Connecting");
  while (gpsSerial.available() <= 0) {
    delay(500);
    Serial.print(".");
  }
  Serial.print("Connected to GPS Satelite");
}

void loop() {
  // read the acceleration values and rotation values from the sensor
  sensors_event_t accel, gyro, temp;
  mpu.getEvent(&accel, &gyro, &temp);

  // calculate the total acceleration vector
  float totalAccel = sqrt(pow(accel.acceleration.x, 2) + pow(accel.acceleration.y, 2) + pow(accel.acceleration.z, 2));

  // convert the acceleration values to m/s²
  float accelMS2 = totalAccel * 9.81;

  // Integrate the acceleration values over time to get the speed in m/s
  float speedMS = accelMS2 * 1; // assuming a 1s sampling interval

  // convert the speed values to km/h
  float speedKMH = speedMS * 3.6;

  // calculate the direction using the arctangent function
  float direction = atan2(gyro.gyro.x, gyro.gyro.y) * 180 / PI;

  // GPS data
  float longitude = 0;
  float latitude = 0;
  if (gps.encode(gpsSerial.read())) {
    latitude = gps.location.lat();
    longitude = gps.location.lng();
  }

  Serial.print("Speed: ");
  Serial.print(speedKMH);
  Serial.print(" km/h, Direction: ");
  Serial.println(direction);

  // send data to cloud using wifi
  if (WiFi.status() == WL_CONNECTED) {
    WiFiClientSecure client;
    client.setInsecure();

    HTTPClient http;
  
    String httpRequestData = "{\n\t\"accelerationX\": " + String(accel.acceleration.x) + ",\n\t\"accelerationY\": " + accel.acceleration.y + ",\n\t\"accelerationZ\": " + accel.acceleration.z + ",\n\t\"speed\": " + speedKMH + ",\n\t\"rotationX\": " + gyro.gyro.x + ",\n\t\"rotationY\": " + gyro.gyro.y + ",\n\t\"rotationZ\": " + gyro.gyro.z + ",\n\t\"direction\": \"" + String(direction) + "\",\n\t\"latitude\": " + latitude + ",\n\t\"longitude\": " + longitude + ",\n\t\"deviceId\": \"" + deviceId + "\"\n}";
    http.addHeader("Content-Type", "application/json");

    if (http.begin(client, apiPath)) {
      int httpResponseCode = http.POST(httpRequestData);
      Serial.println(httpRequestData);
  
      Serial.print("HTTP Response code: ");
      Serial.println(httpResponseCode);
    }
      
    // Free resources
    http.end();
  }

  // 1s time interval
  delay(1000);
}
