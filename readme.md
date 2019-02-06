~/Users/pavel/Downloads/QuizVideo/platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk

keytool -genkey -v -keystore quizvideo.keystore -alias quizvideo -keyalg RSA -keysize 2048 -validity 10000 :  
keyStore : PMy]j3-_MwCL8xr?
key: .2dGDw9~H-6zzx`X

jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore quizvideo.keystore platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk quizvideo

zipalign -v 4 platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk quizvideo.apk

cordova build ios --buildFlag='-UseModernBuildSystem=0'